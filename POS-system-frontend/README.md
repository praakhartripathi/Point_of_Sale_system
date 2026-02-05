# POS Pro - Point of Sale System

A comprehensive, modern Point of Sale (POS) frontend application built with React and Tailwind CSS. This system is designed to streamline retail operations, offering role-based access control, inventory management, and a dedicated cashier terminal.

## Features

###  Authentication & Security
- **Role-Based Access Control (RBAC)**: Secure dashboards tailored for Super Admins, Admins, Store Managers, Branch Managers, Cashiers, and Users.
- **OAuth2 Integration**: Support for Google Sign-In authentication.
- **Trial System**: Self-service trial account creation and management.

### 🛒 Point of Sale (POS) Terminal
- **Cashier Dashboard**: A keyboard-friendly interface optimized for speed.
- **Cart Operations**: Add items, adjust quantities, and remove products.
- **Discount Management**: Apply fixed or percentage-based discounts.
- **Product Lookup**: Search by name, SKU, or category.
- **Shift Management**: Track shift summaries and sales data.

### 📦 Inventory & Product Management
- **CRUD Operations**: Add, edit, delete, and view products.
- **Stock Control**: Monitor stock levels and manage SKUs.
- **Categories**: Organize inventory by product categories.

### 👥 User & Customer Management
- **Employee Management**: Onboard staff and assign roles.
- **Customer Profiles**: Manage customer details and loyalty tiers (Bronze, Silver, Gold, Platinum).

### 📊 Business Tools
- **Analytics**: Visual insights into sales and performance.
- **Demo Requests**: Integrated flow for prospective clients to request demos.

## Tech Stack

- **Frontend Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd POS-system-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```