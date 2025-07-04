# 🛠️ GitHub Webhook Event Tracker

A full-stack application to track and visualize GitHub events like push, pull requests, and merge events using **Flask**, **MongoDB**, and **React**.

---

## 📌 Features

### ✅ Backend (Flask)
- Accepts **GitHub webhook** `POST` events (`push`, `pull_request`, `merge`)
- Parses incoming event data and stores it in **MongoDB**
- Exposes REST API to retrieve recent GitHub events

### 🎯 Frontend (React)
- Realtime dashboard with:
  - ✅ Total Events
  - ⬆️ Push Events
  - 🔀 Pull Requests
  - 👤 Contributors
- Live updates every **15 seconds**
- Clean, modern UI using **lucide-react** icons

---

## 🔧 Tech Stack

| Layer     | Technology                                 |
|-----------|---------------------------------------------|
| Backend   | Flask, PyMongo, Flask-CORS, python-dotenv   |
| Database  | MongoDB                                     |
| Frontend  | React, Tailwind CSS, lucide-react           |
| Dev Tools | GitHub Webhooks         |

---

## 🚀 Getting Started

### 1️⃣ Backend Setup (Flask)

#### 🐍 Prerequisites
- Python 3.x
- MongoDB (local or cloud instance)
- GitHub repo to connect via webhook

#### 📦 Install Dependencies
```bash
pip install Flask flask-cors pymongo python-dotenv
```
🗂️ Create a .env file
MONGO_URI=mongodb://localhost:27017

▶️ Run the server
python app.py
Server will run on http://localhost:5000.

2️⃣ Frontend Setup (React)
📁 Navigate to the React directory and install:
```bash
npm install
(Include lucide-react, tailwindcss as dependencies)
```
▶️ Run the app
npm run start
Frontend runs on http://localhost:3000 

🔄 GitHub Webhook Setup
Go to your GitHub repo → Settings → Webhooks

Add webhook:

Payload URL: http://<your-ip>:5000/webhook(backend url)

Content type: application/json

Events: Select push, pull_request

Save!

🌐 Hosted Demo
🔗 Live Frontend(https://webhook-repo-rtbi.vercel.app/)
 The first request may take a little longer to load as the server is hosted on Render, which may spin up the backend on demand. Thanks for your patience!😊
 
## 📁 API Endpoints

| Method | Endpoint     | Description                        |
|--------|--------------|------------------------------------|
| POST   | `/webhook`   | Accept GitHub webhook payload      |
| GET    | `/events`    | Get recent 10 GitHub events        |
