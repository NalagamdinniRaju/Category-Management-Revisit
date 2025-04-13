
# 🛍️ Revisit Category Management Dashboard

A full-stack admin dashboard for managing clothing categories on Revisit — an e-commerce platform.

## 🚀 Features

- 🔐 JWT-based Admin Authentication
- 📦 Add, View, Edit, Delete Categories
- 🖼️ Upload Category Images
- ⚙️ REST API with Express & MongoDB
- ⚡ Responsive UI built with React + CSS
- 🔔 Toast Notifications for feedback
- 📁 File Uploads using Multer
- 📚 Clean Code Structure with Sidebar UI

## 🌐 [Visit Live Site](https://category-management-nrs.vercel.app/)  

## 🎥 Demo Video

🔗 Click the image below to watch the full walkthrough video:

[![Watch the video](https://res.cloudinary.com/dwiq4s5ut/image/upload/v1744569810/Screenshot_877_eg23tt.png)](https://drive.google.com/file/d/1Dn8AiFHs-FplVXak93JpdGIDYHMVYRUb/view?usp=sharing)

---


## 📂 Project Structure

```
revisit-category-management/
├── frontend/ (React Frontend)
└── server/ (Express Backend)
```

---

## 🛠 Tech Stack

- Frontend: React.js, TailwindCSS, Axios, React Icons, React Toastify  
- Backend: Node.js, Express.js, JWT, bcryptjs, SQLite or MongoDB  
- Tools: Postman, Vite, nodemon

---

## 🧑‍💻 Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/NalagamdinniRaju/Category-Management-Revisit.git
cd category-management-revisit
```

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🛠 Backend Setup

```bash
cd server
npm install
npm run dev   # or node server.js
```

---

## 🧪 API Endpoints Overview

- `POST /api/auth/signup` – Admin Registration  
- `POST /api/auth/login` – Admin Login  
- `GET /api/categories` – Fetch All Categories  
- `POST /api/categories` – Add New Category  
- `PUT /api/categories/:id` – Update Category  
_(Protected via JWT middleware)_

---

## 🖌️ UI Highlights

- Sidebar navigation with category links  
- Add/Edit category forms with real-time validation  
- Responsive grid layout for category listing  
- Clean, modern design using CSS  
- Toast notifications for success/error feedback  


