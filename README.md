# Team Availability Tracker

A **full-stack MERN application** that helps teams monitor and manage member availability through a modern, responsive dashboard. Users can instantly update their availability status, with changes securely stored in MongoDB and synchronized across the application.

## 🚀 Tech Stack

- **Frontend:** React 18, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Styling:** Plain CSS with CSS Variables

## ✨ Features

- View all team members and their current availability.
- Toggle availability status with a single click.
- Optimistic UI updates for an instant user experience.
- Automatic synchronization with MongoDB after every update.
- Add new team members dynamically.
- Remove existing team members.
- Individual error handling—failed updates affect only the corresponding row.
- Responsive dashboard with a clean dark-themed interface.
- RESTful API supporting complete CRUD operations.

## ⚙️ How It Works

- The React frontend fetches the list of team members from the Express backend.
- Team data is stored and managed using MongoDB with Mongoose.
- Clicking the availability toggle immediately updates the UI using optimistic rendering.
- A `PATCH` request is sent to the backend to update the selected member's availability.
- The Express server validates the request and updates the corresponding MongoDB document.
- The updated data is returned to the frontend to keep the UI synchronized with the database.
- If the request fails, only the affected toggle is rolled back while the rest of the dashboard remains unchanged.

<img width="1152" height="926" alt="Screenshot 2026-07-24 221555" src="https://github.com/user-attachments/assets/58dc9646-810c-45eb-b35e-09274adefc32" />

