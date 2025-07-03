import {
  ArrowUpRight,
  GitCommit,
  GitPullRequest,
  GitMerge,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events");
        // const res = await fetch("https://webhook-repo-ffd2.onrender.com/events");
        const data = await res.json();
        console.log(data);
        setEvents(data.reverse());
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval);
  }, []);

  const renderMessage = (event) => {
    console.log(event)
    const date = new Date(event.timestamp);
    switch (event.type) {
      case "push":
        return (
          <>
            <div className="flex  gap-2 flex-col">
              <div className="flex  items-center gap-4">
                <span className="font-semibold">{event.author}</span>
                <span className="block mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-xs text-blue-600 bg-blue-100 rounded">
                  <GitCommit size={12} /> push
                </span>
              </div>
              <span className="ml-1 px-2 py-0.5 bg-gray-100 w-fit text-gray-800 text-sm rounded">
                pushed to {event.to_branch}
              </span>
              <div className="flex gap-4 flex-col text-gray-500">
                <div className="mt-2 pl-2 border-l-2 border-blue-100">
                  {formatMessage(event)}
                </div>
                <div >
                  <span className="text-gray-800 text-xs px-2 py-0.5 rounded">
                  {date.toLocaleDateString('en-US', {
                    day: '2-digit', month: 'long', year: 'numeric'})}
                </span>{" "}
               
                <span className="text-gray-800 text-xs px-2 py-0.5 rounded">
                 at {" "} {date.toLocaleTimeString('en-US', {
                    hour: '2-digit' , minute: '2-digit', hour12: true})}
                </span>
                </div>
                
              </div>
            </div>
          </>
        );
      case "pull_request":
        return (
          <>
           <div className="flex  gap-2 flex-col">
              <div className="flex  items-center gap-4">
                <span className="font-semibold">{event.author}</span>
                <span className="block mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-xs text-green-600 bg-green-100 rounded">
                  <GitPullRequest size={12} /> pull request
                </span>
              </div>
              <span className="ml-1 px-2 py-0.5 bg-gray-100 w-fit text-gray-800 text-sm rounded">
                 opened a pull {event.from_branch} → {event.to_branch} 
              </span>
              <div className="flex gap-4 flex-col text-gray-500">
                <div className="mt-2 pl-2 border-l-2 border-blue-100">
                  {formatMessage(event)}
                </div>
                <div >
                  <span className="text-gray-800 text-xs px-2 py-0.5 rounded">
                  {date.toLocaleDateString('en-US', {
                    day: '2-digit', month: 'long', year: 'numeric'})}
                </span>{" "}
               
                <span className="text-gray-800 text-xs px-2 py-0.5 rounded">
                 at {" "} {date.toLocaleTimeString('en-US', {
                    hour: '2-digit' , minute: '2-digit', hour12: true})}
                </span>
                </div>
                
              </div>
            </div>
            
          </>
        );
      case "merge":
        return (
          <>
          <div className="flex  gap-2 flex-col">
              <div className="flex  items-center gap-4">
                <span className="font-semibold">{event.author}</span>
                <span className="block mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-xs text-purple-700 bg-purple-100 rounded">
                  <GitMerge size={12} /> merge
                </span>
              </div>
              <span className="ml-1 px-2 py-0.5 bg-gray-100 w-fit text-gray-800 text-sm rounded">
                merged from  {event.from_branch} → {event.to_branch}
              </span>
              <div className="flex gap-4 flex-col text-gray-500">
                <div className="mt-2 pl-2 border-l-2 border-blue-100">
                  {formatMessage(event)}
                </div>
                <div >
                  <span className="text-gray-800 text-xs px-2 py-0.5 rounded">
                  {date.toLocaleDateString('en-US', {
                    day: '2-digit', month: 'long', year: 'numeric'})}
                </span>
               
                <span className="text-gray-800 text-xs px-2 py-0.5 rounded">
                 at {" "} {date.toLocaleTimeString('en-US', {
                    hour: '2-digit' , minute: '2-digit', hour12: true})}
                </span>
                </div>
                
              </div>
            </div>

          </>
        );
      default:
        return null;
    }
  };

  const formatMessage = (e) => {
    switch (e.type) {
      case "push":
        return (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <GitCommit size={12} className="text-blue-500" />
            <span>
              "{e.author}" pushed to "{e.to_branch}"
            </span>
          </div>
        );
      case "pull_request":
        return (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <GitPullRequest size={12} className="text-green-600" />
            <span>
              "{e.author}" submitted PR from "{e.from_branch}" → "{e.to_branch}"
            </span>
          </div>
        );
      case "merge":
        return (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <GitMerge size={12} className="text-purple-600" />
            <span>
              "{e.author}" merged "{e.from_branch}" → "{e.to_branch}"
            </span>
          </div>
        );
      default:
        return "";
    }
  };

  const totalEvents = events.length;
  const pushes = events.filter((e) => e.type === "push").length;
  const pullRequests = events.filter((e) => e.type === "pull_request").length;
  const contributors = new Set(events.map((e) => e.author)).size;

  if (!events.length) {
    return <div className="App">No data found</div>;
  }

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-semibold mb-4">GitHub Activity Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-w-6xl mx-auto">
        <StatCard
          icon={<ArrowUpRight size={18} />}
          label="Total Events"
          value={totalEvents}
          subtitle="All activity"
        />
        <StatCard
          icon={<GitCommit size={18} />}
          label="Pushes"
          value={pushes}
          subtitle="Code commits"
        />
        <StatCard
          icon={<GitPullRequest size={18} />}
          label="Pull Requests"
          value={pullRequests}
          subtitle="Code reviews"
        />
        <StatCard
          icon={<Users size={18} />}
          label="Contributors"
          value={contributors}
          subtitle="Active developers"
        />
      </div>

      <div className="mb-6 p-10 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow">
        <h2 className="text-xl font-light  mb-4">GitHub Activity Log</h2>
        <ul className="space-y-3">
          {events.map((e, idx) => (
            <li
              key={idx}
              className="flex gap-4 items-start p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 text-black font-bold uppercase">
                {e.author.slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="text-sm">{renderMessage(e)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, subtitle }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <div className="flex items-center font-medium mb-2 text-gray-700">
      <div className="mr-2 text-gray-500">{icon}</div>
      <span>{label}</span>
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-sm text-gray-500">{subtitle}</div>
  </div>
);

export default Events;
