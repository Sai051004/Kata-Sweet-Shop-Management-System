# 🍬 Sweet Shop Management System

![Demo Video](https://github.com/Sai051004/Kata-Sweet-Shop-Management-System/blob/main/Sweet%20shop.gif)

> A full-stack e-commerce solution for managing a sweet shop inventory, user sales, and administration.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green) ![React](https://img.shields.io/badge/React-18.x-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green) ![Express](https://img.shields.io/badge/Express-4.x-lightgrey) ![License](https://img.shields.io/badge/License-MIT-orange)

## 📖 Project Overview

This project is a modern, responsive web application demonstrating **Test Driven Development (TDD)** and **Clean Architecture**. It features a robust RESTful API backend and a dynamic, glassmorphism-styled React frontend.

### 🌟 Key Features

*   **🔐 Secure Authentication**: JWT-based login/registration with secure password hashing.
*   **👤 Role-Based Access Control**:
    *   **User**: Browse sweets, filter by price/category, add to cart, and checkout.
    *   **Admin**: dedicated dashboard for Inventory Management (CRUD operations), image uploads, and restocking.
*   **🛒 E-commerce Engine**: Real-time stock separation, shopping cart, favorites list, and purchase history.
*   **🔎 Advanced Search**: Server-side filtering for optimized performance.
*   **🎨 Premium UI**: Custom "Candy Glassmorphism" design system using Vanilla CSS.

---

## 📂 Project Structure

The codebase is organized into two distinct applications:

```text
TDD-Sweet-Shop/
├── 📂 client/           # Frontend Application (React + Vite)
│   ├── 📂 src/
│   │   ├── 📂 components/# Reusable UI Components
│   │   ├── 📂 pages/     # Route Views
│   │   ├── 📂 context/   # Global State (Auth)
│   │   └── 📂 services/  # API Interceptors
│   └── 📄 index.css      # Global Design System
│
├── 📂 server/           # Backend Application (Node.js + Express)
│   ├── 📂 config/        # DB Connections
│   ├── 📂 controllers/   # Business Logic
│   ├── 📂 models/        # Mongoose Schemas
│   ├── 📂 routes/        # API Endpoints
│   └── 📂 tests/         # Jest Integration Tests
│
└── 📄 README.md          # This file
```

---

## 🚀 Quick Start Guide

Follow these steps to get the system running locally.

### 1️⃣ Prerequisites
*   **Node.js** (v14 or higher)
*   **MongoDB** (Local instance or Atlas URI)

### 2️⃣ Backend Setup
The backend handles data persistence and business logic.

```bash
cd server
npm install
# Create a .env file (see server/README.md for details)
npm run dev
```
> Server runs on `http://localhost:5000`

### 3️⃣ Frontend Setup
The frontend delivers the user interface.

```bash
cd client
npm install
npm run dev
```
> Application runs on `http://localhost:5173`

---

## 🧪 Testing

The backend architecture is verified using **Jest** and **Supertest**.

*   **Unit/Integration Tests**: Located in `server/tests`.
*   **Running Tests**:
    ```bash
    cd server
    npm test
    ```
*   *Note: Frontend tests are currently disabled to prioritize rapid UI iteration.*

---

## 📚 Documentation

For more detailed information, please refer to the specific READMEs:
*   [**Frontend Documentation**](./client/README.md)
*   [**Backend Documentation**](./server/README.md)

---


