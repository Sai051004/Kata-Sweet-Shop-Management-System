# 🎨 Sweet Shop Frontend

The client-side application for the Sweet Shop, built with **React** and **Vite**. It features a custom "Candy Glassmorphism" design system and a seamless shopping experience.

## 💻 Tech Stack

*   **Core**: React 18, Vite
*   **Routing**: React Router DOM v6
*   **State**: Context API (Auth & Cart management)
*   **Network**: Axios
*   **Styling**: Vanilla CSS (Variables, Flexbox/Grid, Animations)
*   **Notifications**: React Hot Toast

---

## 🎨 Design System: "Candy Glassmorphism"

We avoided generic CSS frameworks to create a unique, premium feel.

-   **Color Palette**:
    -   🍬 `Primary`: HSL(320, 80%, 60%) (Vibrant Pink)
    -   🌌 `Background`: Deep Gradient (Indigo to Purple)
    -   💎 `Glass`: Semi-transparent whites with backdrop blur
-   **Typography**: Clean sans-serif font (Inter/System) for readability.
-   **Animations**: Hover lifts, button scales, and smooth page transitions.

---

## 🧱 Component Architecture

```text
src/
├── components/
│   ├── Navbar.jsx       # Responsive Navigation (changes based on User Role)
│   ├── SweetCard.jsx    # Product display with "Add to Cart" & Admin Actions
│   └── Footer.jsx       # Simple footer
│
├── pages/
│   ├── Login.jsx        # Glass-morphic Login Form
│   ├── Register.jsx     # Registration Form (User/Admin toggle)
│   ├── Dashboard.jsx    # User Storefront (Grid View + Filtering)
│   ├── AdminPanel.jsx   # Admin Inventory Manager (Table View)
│   ├── Cart.jsx         # Shopping Cart Summary & Checkout
│   ├── Favorites.jsx    # Saved Items
│   └── History.jsx      # Order Receipts
│
└── context/
    └── AuthContext.jsx  # Handles JWT storage, Login/Logout logic
```

---

## 🚦 Application Features

### 1. Authentication
*   **Login/Register**: Secure forms with validation and error toasts.
*   **Persistency**: Stays logged in via LocalStorage.

### 2. User Experience (Dashboard)
*   **Smart Search**: Type to filter sweets instantly by name.
*   **Price Filter**: Dropdown to find sweets under specific prices (e.g., "Below Rs 100").
*   **Stock Indicators**:
    *   Items with `0` quantity show a red "Out of Stock" badge.
    *   Purchase button is disabled for out-of-stock items.

### 3. Shopping Cart
*   **Real-time Updates**: Add multiple items, adjust quantities.
*   **Checkout**: Validates stock one last time with the backend before confirming purchase.

### 4. Admin Panel
*   **Secure Access**: Only accessible to `role: admin`.
*   **Image Upload**: Upload product images directly from your computer.
*   **Inventory Control**: Update prices, names, and restock quantities.

---

## 🚀 How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **View App**:
    Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note**: Ensure the Backend Server is running on Port 5000 for API calls to work.
