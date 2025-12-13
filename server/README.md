# 🧁 Sweet Shop Backend API

The backend REST API for the Sweet Shop Management System. Built with **Node.js**, **Express**, and **MongoDB**.

## 🛠 Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose ODM)
*   **Auth**: JSON Web Token (JWT) + Bcrypt
*   **Documentation**: Swagger (OpenAPI 3.0)
*   **Testing**: Jest + Supertest

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port number for the server | `5000` |
| `MONGO_URI` | MongoDB Connection String | `mongodb://localhost:27017/sweetshop` |
| `JWT_SECRET` | Secret key for signing tokens | `your_super_secret_key` |
| `NODE_ENV` | Environment mode | `development` or `test` |

---

## 🔌 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user account | Public |
| `POST` | `/login` | Authenticate and receive JWT | Public |
| `POST` | `/create-admin` | Create a new Admin account | Admin Token |

### 🍬 Sweets (`/api/sweets`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Retrieve all available sweets | User/Admin |
| `GET` | `/search` | Search by `name`, `category`, `price` | User/Admin |
| `POST` | `/` | Create a new sweet (with Image) | Admin |
| `PUT` | `/:id` | Update sweet details | Admin |
| `DELETE` | `/:id` | Remove a sweet from inventory | Admin |
| `POST` | `/:id/purchase` | Decrease stock by 1 | User/Admin |
| `POST` | `/:id/restock` | Restock inventory | Admin |

### 👤 User Actions (`/api/users`)

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/cart` | View shopping cart | User |
| `POST` | `/cart` | Add item into cart | User |
| `DELETE` | `/cart/:id` | Remove item from cart | User |
| `GET` | `/favorites` | View favorite sweets | User |
| `POST` | `/favorites/:id` | Toggle favorite status | User |
| `POST` | `/checkout` | Process purchase & save history| User |
| `GET` | `/history` | View past orders | User |

---

## 🧪 Testing

We use **Jest** for integration testing. The test suite connects to a separate test database to ensure data isolation.

**Run All Tests:**
```bash
npm test
```

**What is tested?**
*   **Auth Flows**: Registration success/failure, duplicate user checks, login validation.
*   **Sweet Management**: CRUD operations, access control (Admin vs User), and search logic.

---

## 📖 Swagger Documentation

Once the server is running, visit:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

This provides an interactive UI to test all endpoints directly.
