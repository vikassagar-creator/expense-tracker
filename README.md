# 💸 Expense Tracker

<p align="center">
  A modern full-stack expense management application built with React, FastAPI, and PostgreSQL.
</p>

<p align="center">
  Securely manage, organize, and analyze personal expenses with JWT authentication, protected APIs, and a responsive dashboard.
</p>

<p align="center">

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-purple?logo=vite)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)
![SQLAlchemy](https://img.shields.io/badge/ORM-SQLAlchemy-red?logo=sqlalchemy)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Deployment](https://img.shields.io/badge/Deployed-Vercel%20%7C%20Render-black)

</p>

---

## 🌐 Live Demo

🚀 **Frontend:**
https://expense-tracker-demonic1.vercel.app

⚙️ **Backend API:**
https://expense-tracker-sdx5.onrender.com

📖 **Swagger API Documentation:**
https://expense-tracker-sdx5.onrender.com/docs

---

# 📌 About The Project

Expense Tracker is a full-stack web application designed to help users manage and understand their personal expenses.

Users can securely create an account, authenticate using JWT, and manage their own expenses through a React frontend connected to a FastAPI REST API.

The application provides:

* Expense CRUD operations
* Search and category filtering
* Expense sorting
* Dashboard analytics
* Category-based spending visualization
* Protected user-specific data
* Responsive expense management interface

The project demonstrates practical full-stack development using React, FastAPI, PostgreSQL, SQLAlchemy, JWT authentication, REST APIs, and cloud deployment.

---

# ✨ Features

## 🔐 Authentication

* ✅ User registration
* ✅ User login
* ✅ Password hashing
* ✅ JWT authentication
* ✅ Protected API routes
* ✅ Protected frontend navigation
* ✅ User-specific expense access
* ✅ Authorization using the authenticated user

---

## 💰 Expense Management

* ✅ Add new expenses
* ✅ View personal expenses
* ✅ Edit existing expenses
* ✅ Delete expenses
* ✅ Expense categories
* ✅ Expense dates
* ✅ Expense amounts
* ✅ User-based expense ownership

---

## 🔎 Expense Search & Filtering

* ✅ Search expenses by title
* ✅ Filter expenses by category
* ✅ Sort expenses
* ✅ Combine search and filtering
* ✅ Dynamic expense table updates

---

## 📊 Dashboard & Analytics

* ✅ Total spending
* ✅ Current-month spending
* ✅ Transaction count
* ✅ Top spending category
* ✅ Category spending breakdown
* ✅ Spending overview chart
* ✅ Expense distribution chart
* ✅ Recent transactions
* ✅ Automatic dashboard updates

---

## 🎨 Frontend

* React + Vite
* React Router
* Component-based architecture
* Fetch API integration
* React Icons
* React Hot Toast
* Responsive layout
* Dashboard interface
* Expense management table
* Add/Edit expense modals
* Search and filtering toolbar
* Dynamic page headers
* Sidebar navigation
* Top navigation bar
* Profile dropdown

---

## ⚙️ Backend

* FastAPI framework
* SQLAlchemy ORM
* PostgreSQL database
* Pydantic validation
* JWT authentication
* Password hashing
* RESTful API architecture
* User authorization
* Expense analytics endpoint
* Swagger/OpenAPI documentation

---

# 🛠 Tech Stack

| Category        | Technology              |
| --------------- | ----------------------- |
| Frontend        | React, Vite, JavaScript |
| Routing         | React Router            |
| Styling         | CSS                     |
| UI Icons        | React Icons             |
| Notifications   | React Hot Toast         |
| Backend         | FastAPI, Python         |
| Database        | PostgreSQL              |
| ORM             | SQLAlchemy              |
| Validation      | Pydantic                |
| Authentication  | JWT                     |
| API             | REST API                |
| Documentation   | Swagger / OpenAPI       |
| Deployment      | Vercel + Render         |
| Version Control | Git + GitHub            |

---

# 🏗️ Application Architecture

```text
                         Expense Tracker
                               |
              ┌────────────────┴────────────────┐
              │                                 │
        React Frontend                    FastAPI Backend
              │                                 │
        React Router                      REST API
              │                                 │
        Protected UI                     JWT Authentication
              │                                 │
        Fetch API                              │
              │                                 │
              └───────────────┬─────────────────┘
                              │
                         SQLAlchemy
                              │
                              ↓
                         PostgreSQL
```

---

# 📂 Project Structure

```text
expense-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── expenses/
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Expenses.jsx
│   │   │   └── ...
│   │   │
│   │   ├── layouts/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopBar.jsx
│   │   │
│   │   ├── config/
│   │   ├── styles/
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
│   │   └── main.py
│   │
│   └── requirements.txt
│
└── README.md
```

---

# 🚀 Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/vikassagar-creator/expense-tracker.git

cd expense-tracker
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment.

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

Create a `.env` file and configure your database and authentication settings.

Example:

```env
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Run the backend:

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

Create the frontend environment file:

```env
VITE_API_URL=http://localhost:8000
```

Run the development server:

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
Password Hashing
        |
        ↓
User Stored in PostgreSQL
        |
        ↓
User Login
        |
        ↓
JWT Token Generated
        |
        ↓
Token Stored in Browser
        |
        ↓
Protected API Requests
        |
        ↓
FastAPI Validates JWT
        |
        ↓
Authenticated User
        |
        ↓
User Can Manage Own Expenses
```

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| POST   | `/users/register` | Register a new user              |
| POST   | `/users/login`    | Authenticate user and return JWT |

## Expenses

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| GET    | `/expenses/`          | Get authenticated user's expenses |
| POST   | `/expenses/`          | Create an expense                 |
| PUT    | `/expenses/{id}`      | Update an expense                 |
| DELETE | `/expenses/{id}`      | Delete an expense                 |
| GET    | `/expenses/analytics` | Get expense analytics             |

---

# 🗄️ Database Design

## Users

| Column          | Type    |
| --------------- | ------- |
| id              | Integer |
| username        | String  |
| email           | String  |
| hashed_password | String  |

## Expenses

| Column   | Type        |
| -------- | ----------- |
| id       | Integer     |
| title    | String      |
| amount   | Float       |
| category | String      |
| date     | Date        |
| user_id  | Foreign Key |

### Relationship

```text
User
 │
 ├── Expense
 │
 ├── Expense
 │
 └── Expense
```

Each expense belongs to an authenticated user through `user_id`.

---

# 📊 Analytics

The backend provides an analytics endpoint that calculates expense information which is then displayed by the React dashboard.

```text
Expenses
    |
    ↓
FastAPI Analytics Endpoint
    |
    ├── Total Spending
    ├── Transaction Count
    └── Category Breakdown
             |
             ↓
       React Dashboard
             |
      ┌──────┴──────┐
      ↓             ↓
  Bar Chart      Donut Chart
```

---

# ☁️ Deployment Architecture

```text
                React Frontend
                       |
                       ↓
                    Vercel
                       |
                       ↓
                FastAPI Backend
                       |
                       ↓
                    Render
                       |
                       ↓
               PostgreSQL Database
```

---

# 📈 Current Project Status

### Core Application

* [x] React frontend
* [x] FastAPI backend
* [x] PostgreSQL integration
* [x] SQLAlchemy ORM
* [x] REST API
* [x] User authentication
* [x] JWT authentication
* [x] Password hashing
* [x] Protected API routes
* [x] User authorization

### Expense Management

* [x] Create expenses
* [x] Read expenses
* [x] Update expenses
* [x] Delete expenses
* [x] Expense categories
* [x] Expense dates
* [x] Search
* [x] Category filtering
* [x] Sorting

### Dashboard

* [x] Spending summary
* [x] Monthly spending
* [x] Transaction count
* [x] Top category
* [x] Category analytics
* [x] Spending chart
* [x] Expense distribution chart
* [x] Recent transactions

### UI

* [x] Responsive dashboard
* [x] Sidebar navigation
* [x] Dynamic Topbar
* [x] Profile dropdown
* [x] Add expense modal
* [x] Edit expense modal
* [x] Toast notifications
* [x] Search/filter toolbar
* [x] Responsive expense table

### Deployment

* [x] Frontend deployed
* [x] Backend deployed
* [x] PostgreSQL database
* [x] Swagger documentation

---

# 🚧 Future Improvements

The next development phase can focus on extending the application beyond the current expense-management core.

* [ ] Budget management
* [ ] Advanced analytics
* [ ] Monthly and yearly reports
* [ ] CSV/PDF export
* [ ] Profile management
* [ ] Application settings
* [ ] Notification system
* [ ] Improved mobile navigation
* [ ] Pagination for large expense datasets
* [ ] Automated testing
* [ ] Docker support

---

# 📚 What I Learned

Building this project provided practical experience with:

* Full-stack web application development
* React component architecture
* React Router and protected navigation
* FastAPI REST API development
* PostgreSQL database design
* SQLAlchemy ORM
* Pydantic validation
* JWT authentication
* Password security
* User authorization
* CRUD API implementation
* API integration
* Data visualization
* Frontend state management
* Responsive UI development
* Git and GitHub workflows
* Cloud deployment with Vercel and Render

---

# 📸 Screenshots

### Dashboard

*Add dashboard screenshot here.*

### Expense Management

*Add expense management screenshot here.*

### Authentication

*Add login/register screenshot here.*

---

# 👨‍💻 Author

## Vikas Sagar

Computer Science & Engineering

GitHub:
https://github.com/vikassagar-creator

---

⭐ If you found this project useful, consider starring the repository!
