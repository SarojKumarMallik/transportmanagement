# 🌍 WanderSphere — Travel & Tourism MERN Platform

A modern, full-stack Travel & Tourism platform built with the **MERN** stack (**MongoDB, Express.js, React.js, Node.js**), featuring a client-facing booking portal, RESTful API backend, and an operations **Admin Panel**.

---

## 🏗️ Project Architecture

```
Travel/
├── backend/                  # Node.js & Express REST API Server
│   ├── src/
│   │   ├── config/           # MongoDB Connection configuration
│   │   ├── controllers/      # Auth, Tours, Bookings, Admin controllers
│   │   ├── middleware/       # JWT Auth & Admin Role verification
│   │   ├── models/           # Mongoose schemas (User, TourPackage, Destination, Booking, Review)
│   │   ├── routes/           # Express API route handlers
│   │   ├── seed/             # Database seeder with sample data
│   │   └── server.js         # Server entrypoint
│   └── package.json
│
├── frontend/                 # Client Travel Booking Web App (React + Vite)
│   ├── src/
│   │   ├── components/       # Navbar, Hero, TourCard, BookingModal, AuthModal, Footer
│   │   ├── context/          # AuthContext & Session management
│   │   ├── pages/            # Home, Tours, TourDetail, Destinations, MyBookings
│   │   ├── services/         # Axios API client
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── admin/                    # Admin Dashboard Portal (React + Vite)
│   ├── src/
│   │   ├── components/       # AdminSidebar, AdminHeader
│   │   ├── context/          # AdminAuthContext (Role-protected)
│   │   ├── pages/            # Dashboard, ToursManagement, BookingsManagement, UsersManagement
│   │   ├── services/         # Axios API client
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
└── package.json              # Root script runner
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup & Run

```bash
cd backend
npm install
npm run seed      # (Optional) Populates DB with sample tours, users & bookings
npm run dev       # Starts server at http://localhost:5000
```

### 2. Frontend Client Portal

```bash
cd frontend
npm install
npm run dev       # Starts client portal at http://localhost:5173
```

### 3. Admin Dashboard Panel

```bash
cd admin
npm install
npm run dev       # Starts admin panel at http://localhost:5174
```

---

## 🔑 Demo Account Credentials

| Portal | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Admin Portal** | `admin@travel.com` | `password123` | `admin` |
| **Client Portal** | `sophia@example.com` | `password123` | `user` |
| **Client Portal** | `alex@example.com` | `password123` | `user` |

*(You can also register a new account anytime on the client portal).*

---

## ✨ Key Features

### 🌟 Client Portal (`http://localhost:5173`)
- **Dynamic Search & Filters:** Filter tours by destination, price range, duration, and style.
- **Tour Detail View:** Itineraries, inclusions/exclusions, gallery, price calculator.
- **Booking Flow:** Instant reservation with date selection and traveler count.
- **User Dashboard:** View booking history, statuses (Confirmed, Pending, Cancelled), and cancellation.
- **JWT Authentication:** Modal login/register with token persistence.

### 🛡️ Admin Panel (`http://localhost:5174`)
- **Operations Dashboard:** Real-time revenue metrics, booking count, recent orders.
- **Tour Management:** Create, edit, and delete tour packages with itineraries & media.
- **Booking Management:** Review all customer orders and update status in real-time.
- **User & Access Control:** Manage registered accounts, change roles, and deactivate accounts.

---

## 📡 API Endpoints Reference

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user or admin
- `GET /api/auth/me` — Get current authenticated user

### Tour Packages (`/api/tours`)
- `GET /api/tours` — List tours with search, category, and price filtering
- `GET /api/tours/featured/list` — Featured packages & categories
- `GET /api/tours/:id` — Single tour package details
- `POST /api/tours` — Create tour (*Admin only*)
- `PUT /api/tours/:id` — Update tour (*Admin only*)
- `DELETE /api/tours/:id` — Delete tour (*Admin only*)

### Bookings (`/api/bookings`)
- `POST /api/bookings` — Create a new tour booking
- `GET /api/bookings/my` — Get authenticated user's bookings
- `PUT /api/bookings/:id/cancel` — Cancel booking
- `GET /api/bookings` — Get all bookings (*Admin only*)
- `PUT /api/bookings/:id/status` — Update booking status (*Admin only*)

### Admin Analytics (`/api/admin`)
- `GET /api/admin/dashboard-stats` — Operations & revenue metrics
- `GET /api/admin/users` — List all registered users
- `PUT /api/admin/users/:id` — Toggle user active state or role
