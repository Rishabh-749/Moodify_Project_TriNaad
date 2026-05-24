# 🎵 TriNaad

<div align="center">

### AI-Powered Emotion Based Music Recommendation Platform

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/AI-Google%20MediaPipe-black?style=for-the-badge" />
</p>

A production-ready AI music platform that detects user emotions in real-time using Google MediaPipe face analysis and dynamically recommends songs based on detected mood.

</div>

---

# ✨ Features

* Real-Time Face Emotion Detection
* Mood-Based Song Recommendations
* Google MediaPipe Integration
* JWT Authentication System
* Redis-Based Secure Logout
* Admin Song Upload Panel
* ImageKit Media Storage
* Responsive Modern UI

---

# 🧠 Supported Emotions

* 😊 Happy
* 😢 Sad
* 😲 Surprised

Songs are dynamically recommended based on detected facial emotion.

---

# 🔐 Admin Upload Access

Admin users can upload songs directly from the navbar profile section.

### Demo Admin Credentials

```env
EMAIL: mahadev@gmail.com
PASSWORD: SadaShiv@1234
```

```env
EMAIL: rishabh@gmail.com
PASSWORD: Rishi@1234
```

---

# ⚡ Tech Stack

| Frontend     | Backend           | Database      | AI/Services      |
| ------------ | ----------------- | ------------- | ---------------- |
| React + Vite | Node.js + Express | MongoDB Atlas | Google MediaPipe |
| Context API  | JWT Auth          | Redis Cloud   | ImageKit         |

---

# 🏗️ Project Structure

```bash
TriNaad/
│
├── Frontend/
│   ├── src/
│   ├── assets/
│   ├── features/
│   └── app.routes.jsx
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── services/
│   └── server.js
│
└── README.md
```

---

# 🚀 Setup

## Clone Repository

```bash
git clone https://github.com/Rishabh-749/TriNaad.git
cd TriNaad
```

---

# Backend Setup

```bash
cd Backend
npm install
```

## Create `.env` inside Backend Folder

```env
MONGO_URL=your_mongodb_cluster_url
PORT=5000
JWT_SECRET=your_jwt_secret
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

## Start Backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Application runs on:

```bash
http://localhost:5173
```

---

# 🔥 System Architecture

| Module                | Purpose                         |
| --------------------- | ------------------------------- |
| MediaPipe Engine      | Real-time face emotion analysis |
| Recommendation System | Mood-based song suggestions     |
| Redis Cache           | Logout token invalidation       |
| JWT Authentication    | Secure user access              |
| ImageKit CDN          | Song/media storage              |
| Admin Upload System   | Song management panel           |

---

# 📦 Redis Usage

Redis is used for secure logout handling through JWT token blacklisting and session invalidation.

---

# 📈 Engineering Focus

This project demonstrates:

* AI-integrated frontend systems
* Real-time emotion analysis
* Full-stack MERN architecture
* Redis authentication workflows
* Cloud media management
* Scalable React application structure

---

# 🌐 Deployment

| Service       | Platform      |
| ------------- | ------------- |
| Frontend      | Vercel        |
| Backend       | Render        |
| Database      | MongoDB Atlas |
| Cache         | Redis Cloud   |
| Media Storage | ImageKit      |

---

# 👨‍💻 Author

## Rishabh Jagtap

Full Stack Developer focused on scalable and AI-powered web applications.

🌐 GitHub: [https://github.com/Rishabh-749](https://github.com/Rishabh-749)

---

<div align="center">

### ⭐ Star the repository if you found it valuable
