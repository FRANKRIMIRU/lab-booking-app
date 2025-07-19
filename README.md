# 🧪 Lab Test Booking App

A full-stack MERN (MongoDB, Express, React, Node.js) web application for users to book lab tests, and for admins to manage users and test records. It includes authentication, protected routes, and a dynamic dashboard.

---

## ✨ Features

- User registration & login with JWT
- Password hashing with bcrypt
- Admin dashboard: view, edit, and delete users
- Users can update their profiles
- MongoDB Atlas integration
- Environment variables with `.env`
- Fully responsive frontend using React

---

## 🛠️ Tech Stack

**Frontend**
- React
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- Mongoose

**Database**
- MongoDB (Atlas)

**Others**
- JWT for authentication
- Bcrypt for hashing
- dotenv for config

---

## 📁 Project Structure

labbooking/
│
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
│
├── server/ # Express backend
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── .env # Environment variables (not pushed)
│ └── server.js
│
├── .gitignore
├── package.json
└── README.md
