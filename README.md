🛠️ GitHub Webhook Event Tracker
A full-stack application to track and visualize GitHub events like push, pull requests, and merge events using Flask, MongoDB, and React.

📌 Features
✅ Backend (Flask)
Accepts GitHub webhook POST events (push, pull_request, merge)

Parses event data and stores it in MongoDB

Exposes REST API to fetch latest events

🎯 Frontend (React)
Displays a beautiful dashboard of:

Total events

Push events

Pull requests

Contributors

Live updates every 15 seconds

Interactive and clean UI using lucide-react icons

🔧 Tech Stack
Backend: Flask, PyMongo, CORS, dotenv

Database: MongoDB

Frontend: React, Tailwind CSS, Lucide Icons

Others: GitHub Webhooks, Docker (optional)

🚀 Getting Started
1️⃣ Backend Setup (Flask)
🐍 Prerequisites
Python 3.x

MongoDB instance (local or cloud)

GitHub repository (to configure webhook)

📦 Install dependencies
bash
Copy
Edit
pip install Flask flask-cors pymongo python-dotenv
🗂️ Create a .env file
env
Copy
Edit
MONGO_URI=mongodb://localhost:27017
▶️ Run the server
bash
Copy
Edit
python app.py
Server will run on http://localhost:5000.

2️⃣ Frontend Setup (React)
📁 Navigate to the React directory and install:
bash
Copy
Edit
npm install
(Include lucide-react, tailwindcss, etc. as dependencies)

▶️ Run the app
bash
Copy
Edit
npm run dev
Frontend runs on http://localhost:5173 (or similar, based on your config).

🔄 GitHub Webhook Setup
Go to your GitHub repo → Settings → Webhooks

Add webhook:

Payload URL: http://<your-ip>:5000/webhook

Content type: application/json

Events: Select push, pull_request

Save!

📁 API Endpoints
Method	Endpoint	Description
GET	/	Health check (Jai shree ram)
POST	/webhook	Accept GitHub webhook payload
GET	/events	Get recent 10 GitHub events