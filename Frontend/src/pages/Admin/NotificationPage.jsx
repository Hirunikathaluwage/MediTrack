import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(stored);

    const socket = io('http://localhost:5000');

    socket.on('newInquiry', (inquiry) => {
      const newNotification = {
        id: Date.now(),
        message: `New Inquiry: ${inquiry.subject}`,
        priority: inquiry.priority || 'Normal', // 📢 Detect priority
        time: new Date().toLocaleString(),
      };

      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        localStorage.setItem('notifications', JSON.stringify(updated));
        return updated;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 🎨 Priority Colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-600';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'Low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-2">
            🔔 Notifications
          </h1>
          {notifications.length > 0 && (
            <button
              onClick={() => {
                setNotifications([]);
                localStorage.removeItem('notifications');
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Clear All
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-32">
            No notifications yet. 🚀
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notifications.map((note) => (
              <div
                key={note.id}
                className={`p-5 rounded-2xl shadow-md hover:shadow-lg transition ${getPriorityColor(note.priority)} `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{note.message}</span>
                  <span className="text-xs font-semibold uppercase">{note.priority}</span>
                </div>
                <p className="text-gray-500 text-sm">{note.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
