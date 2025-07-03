from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import os
import sys
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


def parse_push_event(data):
    return {
        "type": "push",
        "author": data["pusher"]["name"],
        "to_branch": data["ref"].split("/")[-1],
        "request_id": data["head_commit"]["id"],
        "timestamp": datetime.now()
    }

def parse_pr_event(data):
    pr = data["pull_request"]
    return {
        "type": "pull_request",
        "author": pr["user"]["login"],
        "from_branch": pr["head"]["ref"],
        "to_branch": pr["base"]["ref"],
        "request_id": str(pr["id"]),
        "timestamp": datetime.now()
    }

def parse_merge_event(data):
    pr = data["pull_request"]
    if pr.get("merged"):
        return {
            "type": "merge",
            "author": pr["merged_by"]["login"],
            "from_branch": pr["head"]["ref"],
            "to_branch": pr["base"]["ref"],
            "request_id": str(pr["id"]),
            "timestamp": datetime.now()
        }
    return None

@app.route('/' , methods=['GET'])
def index():
    return jsonify({"message": "Jai shree ram"}), 200

@app.route('/webhook', methods=['POST'])
def webhook():
    print("Received the webhook request")
    if not request.is_json:
        return jsonify({"error": "Expected application/json"}), 415

    data = request.get_json()
    event_type = request.headers.get('X-GitHub-Event')

    if event_type == "push":
        event = parse_push_event(data)
    elif event_type == "pull_request":
        if data["action"] == "closed" and data["pull_request"].get("merged"):
            event = parse_merge_event(data)
        else:
            event = parse_pr_event(data)
    else:
        return jsonify({"message": "Event type not handled"}), 400

    # Store in MongoDB
    events_col.insert_one(event)
    return jsonify({"message": "Event stored"}), 200

@app.route('/events', methods=['GET'])
def get_events():
    events = list(events_col.find().sort("timestamp", -1).limit(10))
    for e in events:
        e["_id"] = str(e["_id"])
        e["timestamp"] = e["timestamp"].strftime("%d %B %Y - %I:%M %p UTC")
    return jsonify(events)

def connect_to_mongo():
    try:
        mongo_uri = os.getenv("MONGO_URI")
        if not mongo_uri:
            raise Exception("❌ MONGO_URI not set in .env")

        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        client.server_info() 
        db = client["webhookGithub"]  
        print("✅ MongoDB connection established")
        return db["events"]

    except ConnectionError as e:
        print("❌ MongoDB connection failed:", e)
        sys.exit(1)
    except Exception as ex:
        print("❌ Error:", ex)
        sys.exit(1)

if __name__ == "__main__":
    events_col = connect_to_mongo()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
