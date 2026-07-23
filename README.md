# 🚀 Mini ERP CRM

A full-stack Mini ERP (Enterprise Resource Planning) & CRM system built using **React, TypeScript, Node.js, Express.js, and PostgreSQL**. This application helps businesses manage products, customers, inventory, and sales through a secure dashboard.

---

## 📌 Features

### 🔐 Authentication
- JWT-based Login Authentication
- Protected Routes
- Secure API Access
- Logout Functionality

### 📊 Dashboard
- Total Products
- Total Customers
- Total Sales
- Low Stock Products
- Responsive Dashboard Cards

### 📦 Product Management
- Add Product
- Update Product
- Delete Product
- Search Products
- Pagination

### 👥 Customer Management
- Add Customer
- Edit Customer
- Delete Customer
- Customer Listing

### 📦 Inventory Management
- View Current Inventory
- Low Stock Status
- Warehouse Information

### 🧾 Sales Challan
- Create Sales Challan
- Select Customer
- Add Multiple Products
- Automatic Stock Deduction
- Search & Filter Sales
- Challan History

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Axios
- React Hot Toast
- CSS

### Backend
- Node.js
- Express.js
- TypeScript
- JWT Authentication

### Database
- PostgreSQL

### Tools
- Git
- GitHub
- Postman

---

## 📂 Project Structure

```
MiniERPCRM
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── config
│   └── server.ts
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── styles
│   └── App.tsx
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Revathi240/mini-erp-crm.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=mini_erp_crm

JWT_SECRET=your_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

## 📸 Screenshots

You can add screenshots here after deployment.

- Login Page
- Dashboard
- Products
- Customers
- Inventory
- Sales

---

## 🚀 Future Improvements

- Role-Based Access Control
- Reports & Analytics
- Export to PDF/Excel
- Email Notifications
- Responsive Mobile Design

---

## 👩‍💻 Author

**Revathi Vajroju**

- GitHub: https://github.com/Revathi240

---

## 📄 License

This project is developed for learning and placement purposes.
