# 💸 Expense Tracker

<p align="center">
  A modern full-stack expense management application built with React, FastAPI, and PostgreSQL.
</p>

<p align="center">
  Securely manage personal expenses with JWT authentication, protected routes, and a RESTful backend.
</p>

<p align="center">

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-purple?logo=vite)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Deployment](https://img.shields.io/badge/Deployed-Vercel%20%7C%20Render-black)

</p>

---

# 🌐 Live Demo

🚀 **Frontend:**  
https://expense-tracker-nine-psi-72.vercel.app/dashboard

⚙️ **Backend API:**  
https://expense-tracker-sdx5.onrender.com

📖 **Swagger API Documentation:**  
https://expense-tracker-sdx5.onrender.com/docs

---

# 📌 About The Project

Expense Tracker is a full-stack web application that helps users manage their personal expenses securely.

Users can create accounts, log in, and manage their own expenses while ensuring data privacy through JWT authentication and user-based authorization.

This project demonstrates real-world full-stack development including:

- Frontend development with React
- Backend API development with FastAPI
- Database management with PostgreSQL
- Secure authentication systems
- REST API architecture
- Cloud deployment

---

# ✨ Features

## 🔐 Authentication

- ✅ User Registration
- ✅ User Login
- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Secure user sessions
- ✅ User-specific data access


## 💰 Expense Management

- ✅ Add new expenses
- ✅ View personal expenses
- ✅ Edit existing expenses
- ✅ Delete expenses
- ✅ Expense categories
- ✅ Date tracking
- ✅ User-based expense filtering


## 🎨 Frontend

- React + Vite
- React Router
- Bootstrap UI
- Fetch API integration
- Responsive design
- Protected navigation
- Modal-based editing
- Component-based architecture


## ⚙️ Backend

- FastAPI framework
- SQLAlchemy ORM
- PostgreSQL database
- Pydantic validation
- JWT authentication
- RESTful API design
- Swagger documentation

---

# 🛠 Tech Stack

| Category | Technology |
|---|---|
| Frontend | React, Vite, Bootstrap |
| Backend | FastAPI, Python |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Authentication | JWT, Passlib, bcrypt |
| API | REST API |
| Deployment | Vercel + Render |

---

# 📂 Project Structure

```text
expense-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   ├── auth.py
│   │   ├── jwt_handler.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
└── README.md
```

---

# 🚀 Installation & Setup

## Clone Repository

```bash
git clone https://github.com/vikassagar-creator/expense-tracker.git

cd expense-tracker
```

---

# ⚙️ Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔒 Authentication Flow

```text
User Registration
        |
        ↓
Password Hashed Using bcrypt
        |
        ↓
User Login
        |
        ↓
JWT Token Generated
        |
        ↓
Token Stored In Browser
        |
        ↓
Protected Routes Accessed
        |
        ↓
User Can Manage Own Expenses
```

---

# 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Register new user |
| POST | `/users/login` | Login user |
| GET | `/expenses/` | Get user expenses |
| POST | `/expenses/` | Create expense |
| PUT | `/expenses/{id}` | Update expense |
| DELETE | `/expenses/{id}` | Delete expense |
| GET | `/expenses/analytics` | Expense analytics |

---

# 🗄 Database Design

## Users

| Column | Type |
|---|---|
| id | Integer |
| username | String |
| email | String |
| hashed_password | String |


## Expenses

| Column | Type |
|---|---|
| id | Integer |
| title | String |
| amount | Float |
| category | String |
| date | Date |
| user_id | Foreign Key |

Relationship:

```text
User
 |
 ├── Expense
 |
 ├── Expense
 |
 └── Expense
```

---

# ☁️ Deployment Architecture

```text
              React Frontend
                    |
                    |
                 Vercel
                    |
                    |
                    ↓
              FastAPI Backend
                    |
                    |
                 Render
                    |
                    |
                    ↓
             PostgreSQL Database
```

---

# 📈 Current Progress

✅ Full CRUD Operations  
✅ PostgreSQL Integration  
✅ SQLAlchemy ORM  
✅ JWT Authentication  
✅ Password Hashing  
✅ Protected API Routes  
✅ Protected React Routes  
✅ User Authorization  
✅ Responsive UI  
✅ Cloud Deployment  

---

# 🚧 Future Improvements

- 📊 Analytics dashboard
- 📈 Expense charts
- 🔎 Search expenses
- 🏷 Category filters
- 📅 Monthly reports
- 💰 Budget planner
- 📄 Export CSV/PDF
- 🌙 Dark mode
- 🐳 Docker support
- 🧪 Unit testing

---

# 📚 What I Learned

Building this project helped me gain practical experience in:

- Full-stack application development
- FastAPI REST API creation
- PostgreSQL database design
- SQLAlchemy ORM
- JWT authentication
- Password security
- React architecture
- API integration
- Cloud deployment

---

# 📸 Screenshots

_Add screenshots of the application dashboard, login page, and expense management pages here._

---

# 👨‍💻 Author

## Vikas Sagar

GitHub:  
https://github.com/vikassagar-creator

---

⭐ If you found this project useful, consider starring the repository!
