# 💸 Smart Expense Tracker

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge\&logo=mongodb)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge\&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge\&logo=tailwind-css)

A beautiful, full-stack web application built with the **MERN** stack (MongoDB, Express, React, Node.js) to help users manage their personal finances, track daily expenses, and visualize their spending habits.

---

## ✨ Features

* **🔐 Secure Authentication:** User signup and login using encrypted passwords (bcrypt) and JSON Web Tokens (JWT).
* **📊 Interactive Analytics:** Beautiful pie charts breaking down expenses by category using Recharts.
* **💰 Smart Budget Alerts:** Automatic warnings when your total expenses exceed your monthly budget limit.
* **📱 Responsive UI:** A clean, modern, SaaS-style dashboard styled with Tailwind CSS.
* **⚡ Full CRUD Operations:** Easily Add, Read, Update, and Delete your income and expense records.

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* Tailwind CSS
* Recharts (Data visualization)
* Axios (HTTP requests)
* React Hot Toast (Notifications)

### Backend:

* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Token (JWT) for Authentication
* bcryptjs for password hashing

---

## 🚀 Getting Started Locally

Follow these steps to set up the project on your local machine.

### 1. Prerequisites

Make sure you have:

* Node.js installed
* MongoDB installed and running

---

### 2. Clone the Repository

```bash
git clone https://github.com/YourUsername/smart-expense-tracker.git
cd smart-expense-tracker
```

---

### 3. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

### 4. Setup Frontend

```bash
cd client
npm install
```

Start the frontend:

```bash
npm start
```

---

## 🌐 Environment Variables

### Backend (`/server/.env`)

* `PORT` → Server port (e.g., 5000)
* `MONGO_URI` → MongoDB connection string
* `JWT_SECRET` → Secret key for JWT authentication

---

## 📂 Folder Structure

```
smart-expense-tracker/
│
├── client/         # React frontend
├── server/         # Node.js backend
│
├── README.md
└── package.json
```

---

## 📊 Future Enhancements

* 📅 Monthly & yearly analytics
* 🧾 Export reports (PDF/CSV)
* 🌙 Dark mode
* 📲 Mobile app version
* 🔔 Email notifications

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙌 Acknowledgements

* Open-source community
* MERN stack ecosystem

---

## 💡 Author

**Your Name**
GitHub: https://github.com/sujalsingh-git

---

⭐ If you like this project, don’t forget to give it a star!
