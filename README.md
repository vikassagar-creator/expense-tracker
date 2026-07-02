# 💸 Expense Tracker

A modern full-stack Expense Tracker built with **React**, **FastAPI**, and **PostgreSQL** that allows users to securely manage their personal expenses using JWT authentication.

This project demonstrates full-stack development skills including REST API design, authentication, database modeling, frontend state management, and secure user authorization.

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* Password Hashing with bcrypt
* JWT Authentication
* Protected Routes
* Secure User Sessions
* User-specific Expense Management

### 💰 Expense Management

* Create Expenses
* View All Personal Expenses
* Edit Existing Expenses
* Delete Expenses
* Category Selection
* Date Tracking

### 🎨 Frontend

* React (Vite)
* React Router
* Bootstrap
* Fetch API
* Responsive Layout
* Modal-based Editing
* Protected Navigation

### ⚙️ Backend

* FastAPI
* SQLAlchemy ORM
* PostgreSQL
* Pydantic Validation
* JWT Authentication
* RESTful API Design

---

# 🛠 Tech Stack

| Frontend  | Backend    | Database   | Authentication   |
| --------- | ---------- | ---------- | ---------------- |
| React     | FastAPI    | PostgreSQL | JWT              |
| Vite      | SQLAlchemy |            | Passlib (bcrypt) |
| Bootstrap | Pydantic   |            | Python-JOSE      |

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
│   └── requirements.txt
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/vikassagar-creator/expense-tracker.git
cd expense-tracker
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt

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

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔒 Authentication Flow

```text
User Registers
        │
        ▼
Password is Hashed
        │
        ▼
User Logs In
        │
        ▼
FastAPI Verifies Credentials
        │
        ▼
JWT Token Generated
        │
        ▼
Token Stored in Browser
        │
        ▼
Protected Routes Accessible
        │
        ▼
Only User's Expenses are Visible
```

---

# 📡 REST API

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| POST   | `/users/register`     | Register a new user               |
| POST   | `/users/login`        | Login and receive JWT             |
| GET    | `/expenses/`          | Get authenticated user's expenses |
| POST   | `/expenses/`          | Create a new expense              |
| PUT    | `/expenses/{id}`      | Update an expense                 |
| DELETE | `/expenses/{id}`      | Delete an expense                 |
| GET    | `/expenses/analytics` | Expense analytics                 |

---

# 🗄 Database Schema

## Users

| Column          | Type    |
| --------------- | ------- |
| id              | Integer |
| username        | String  |
| email           | String  |
| hashed_password | String  |

---

## Expenses

| Column   | Type        |
| -------- | ----------- |
| id       | Integer     |
| title    | String      |
| amount   | Float       |
| category | String      |
| date     | Date        |
| user_id  | Foreign Key |

Relationship:

```text
One User
      │
      ├──────────────► Many Expenses
```

---

# 📈 Current Progress

* ✅ Full CRUD Operations
* ✅ PostgreSQL Integration
* ✅ SQLAlchemy ORM
* ✅ JWT Authentication
* ✅ Password Hashing
* ✅ Protected API Routes
* ✅ Protected React Routes
* ✅ User Authorization
* ✅ Responsive UI

---

# 🚧 Planned Features

* Analytics Dashboard
* Expense Charts
* Category-wise Reports
* Monthly Statistics
* Search Expenses
* Filter by Category
* Filter by Date
* Pagination
* Budget Planner
* Export Expenses (CSV/PDF)
* Dark Mode
* Cloud Deployment

---

# 📚 What I Learned

Through this project I gained hands-on experience with:

* Building REST APIs using FastAPI
* Designing relational databases with PostgreSQL
* SQLAlchemy ORM
* JWT Authentication
* Password Hashing
* React State Management
* React Router
* Fetch API
* CRUD Operations
* Secure API Design
* Full-Stack Application Development

---

# 📸 Screenshots

> Screenshots and demo GIFs will be added after the UI is finalized.

---

# 🚀 Future Improvements

* Deploy Backend
* Deploy Frontend
* Connect Cloud PostgreSQL
* CI/CD Pipeline
* Docker Support
* Unit Testing

---

# 👨‍💻 Author

**Vikas Sagar**

If you found this project interesting, feel free to ⭐ the repository.
