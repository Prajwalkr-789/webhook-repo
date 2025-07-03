import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,      // for “Total Events”
  GitCommit,         // for “Pushes”
  GitPullRequest,    // for “Pull Requests”
  Users              // for “Contributors”
} from "lucide-react";
import "./FeedWithStats.css";

export default function FeedWithStats() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events");
        const data = await res.json();
        setEvents(data.reverse());
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval);
  }, []);

  // metrics
  const totalEvents = events.length;
  const pushes = events.filter((e) => e.type === "push").length;
  const pullRequests = events.filter((e) => e.type === "pull_request").length;
  const contributors = new Set(events.map((e) => e.author)).size;

  const formatDate = (iso) => new Date(iso).toLocaleString();

  const renderMessage = (e) => {
    switch (e.type) {
      case "push":
        return `${e.author} pushed to ${e.to_branch}`;
      case "pull_request":
        return `${e.author} opened a pull request from ${e.from_branch} to ${e.to_branch}`;
      case "merge":
        return `${e.author} merged ${e.from_branch} into ${e.to_branch}`;
      default:
        return "";
    }
  };

  function formatTimeAgo(timestamp) {
  const diff = Math.floor((Date.now() - new Date(timestamp)) / 60000);
  return diff < 1 ? 'Just now' : `${diff}m ago`;
}

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="subtitle">Stay updated with your team's latest work and metrics</p>

      

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        {events.map((e, idx) => (
    <div key={idx} className="activity-item">
      <div className="avatar">{e.author.slice(0, 2).toUpperCase()}</div>
      <div className="content">
        <p className="message">
          <strong>{e.author}</strong> pushed to <a href="#">push</a>
          <span className="branch">main</span>
        </p>
        <div className="meta">
          <span>{formatTimeAgo(e.timestamp)}</span> · <span>{formatDate(e.timestamp)}</span>
        </div>
      </div>
  </div>
))}

      </div>
    </div>
);
}
