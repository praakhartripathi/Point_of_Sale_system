# POS System

A robust, full-stack Point of Sale (POS) system designed for business billing, inventory management, sales tracking, and multi-store operations. It features a modern React frontend and a secure Spring Boot backend.

## 🚀 Features

### Core Functionality
- **Authentication & Authorization**: Secure JWT-based auth with RBAC (Admin, Cashier, Branch Manager, etc.).
- **Multi-Store Support**: Manage parent stores and individual branches with specific working hours.
- **Inventory Control**: Real-time stock tracking, low stock alerts, and product categorization.
- **Billing & Invoicing**: Support for multiple payment modes (UPI, Card, Cash), tax calculations, and digital receipts.

### Management Modules
- **User & Employee Management**: Manage profiles, roles, and shift tracking.
- **Customer Management**: CRM features to track customer history and profiles.
- **Product Management**: CRUD operations, search by SKU/name, and bulk CSV imports.
- **Order Processing**: Comprehensive order history, refunds/returns handling, and status tracking.

### Reporting & Analytics
- **Dashboard**: Real-time overview of sales and inventory.
- **Shift Reports**: Detailed summaries for cashiers including sales, refunds, and payment breakdowns.
- **Sales Reports**: Daily, weekly, and monthly analytics.

### User Interface
- **Responsive Design**: Built with Tailwind CSS for various screen sizes.
- **Dark Mode**: Built-in support for dark theme.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG implementation

### Backend
- **Language**: Java 17+
- **Framework**: Spring Boot 3.5.9
- **Security**: Spring Security (JWT)
- **Database**: MySQL (Production), H2 (Dev)
- **ORM**: Spring Data JPA (Hibernate)
- **Build Tool**: Maven
- **Integrations**: Razorpay (Payments), Java Mail Sender (Email)
- **Utilities**: Lombok

## 📂 Project Structure

```text
POS-system/
├── POS-system-backend/    # Spring Boot API and Database logic
├── POS-system-frontend/   # React User Interface logic
└── README.md              # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Java Development Kit (JDK)
- MySQL installed and running

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure database connection in `src/main/resources/application.properties`.
3. Start the server:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.
