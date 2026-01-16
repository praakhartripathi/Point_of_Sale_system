# POS System Backend

A robust Point of Sale (POS) system backend built with Spring Boot, designed to handle business billing, inventory management, sales tracking, and multi-store operations.

## 🚀 Features

*   **Authentication & Authorization**: Secure JWT-based authentication with role-based access control (RBAC).
    *   Roles: `ROLE_USER`, `ROLE_ADMIN`, `ROLE_CASHIER`, `ROLE_BRANCH_MANAGER`, `ROLE_STORE_MANAGER`, `ROLE_SUPERADMIN`.
*   **User Management**: Sign up, sign in, password management (forgot/update), and profile handling.
*   **Store Management**: Create and manage stores, including support for parent stores and branches.
*   **Branch Management**: Manage individual store branches, including working hours and contact info.
*   **Employee Management**: Manage employees for stores and branches.
*   **Customer Management**: Create, update, search, and manage customer profiles.
*   **Product Management**:
    *   Create, update, delete products.
    *   Categorize products.
    *   Search products by name, description, or brand.
    *   Filter products by store.
*   **Inventory Control**: 
    *   Track stock levels per branch and product.
    *   Search inventory by product name.
*   **Order Processing**: 
    *   Create and manage orders.
    *   Filter orders by branch, customer, cashier, status, and date.
    *   Track top-selling orders.
*   **Shift Management**:
    *   Start and end cashier shifts.
    *   Generate shift reports with sales, refunds, and top-selling products.

## 🛠️ Tech Stack

*   **Java 17+**
*   **Spring Boot 3.5.9**
*   **Spring Security** (JWT Authentication)
*   **Spring Data JPA** (Hibernate)
*   **Database**: MySQL (Production), H2 (Development/Testing)
*   **Build Tool**: Maven
*   **Other Libraries**:
    *   Lombok (Boilerplate reduction)
    *   Razorpay (Payment integration - dependency included)
    *   Java Mail Sender (Email notifications)

## 📂 Project Structure

```
com.POS_system_backend
├── configuration   # Security & JWT config
├── controller      # REST API Endpoints (Auth, Product, Store, User, Category, Branch, Inventory, Order, Employee, Customer, ShiftReport)
├── dto             # Data Transfer Objects
├── entity          # JPA Entities (User, Product, Store, Order, Branch, Inventory, Customer, etc.)
├── mapper          # Entity <-> DTO Mappers
├── repository      # Data Access Layer
├── service         # Business Logic Interfaces
└── service.impl    # Business Logic Implementations
```

## 🔌 API Endpoints

### Authentication
*   `POST /api/auth/signup` - Register a new user.
*   `POST /api/auth/signin` - Login and receive JWT.
*   `POST /api/auth/forgot-password` - Initiate password reset.
*   `POST /api/auth/update-password` - Change password.

### Products
*   `POST /api/products` - Create a new product.
*   `PUT /api/products/{productId}` - Update an existing product.
*   `DELETE /api/products/{productId}` - Delete a product.
*   `GET /api/products/store/{storeId}` - Get all products for a specific store.
*   `GET /api/products/store/{storeId}/search?keyword={term}` - Search products in a store.

### Categories
*   `POST /api/categories` - Create a new product category.
*   `PUT /api/categories/{categoryId}` - Update a category.
*   `DELETE /api/categories/{categoryId}` - Delete a category.
*   `GET /api/categories/store/{storeId}` - Get all categories for a store.

### Branches
*   `POST /api/branches` - Create a new branch.
*   `PUT /api/branches/{branchId}` - Update a branch.
*   `DELETE /api/branches/{branchId}` - Delete a branch.
*   `GET /api/branches/store/{storeId}` - Get all branches for a store.
*   `GET /api/branches/{branchId}` - Get branch details by ID.

### Employees
*   `POST /api/employees/store` - Create a store employee.
*   `POST /api/employees/branch` - Create a branch employee.
*   `PUT /api/employees/{employeeId}` - Update an employee.
*   `DELETE /api/employees/{employeeId}` - Delete an employee.
*   `GET /api/employees/store/{storeId}` - Get all employees for a store.
*   `GET /api/employees/branch/{branchId}` - Get all employees for a branch.

### Customers
*   `POST /api/customers` - Create a new customer.
*   `PUT /api/customers/{customerId}` - Update a customer.
*   `DELETE /api/customers/{customerId}` - Delete a customer.
*   `GET /api/customers/{customerId}` - Get customer by ID.
*   `GET /api/customers` - Get all customers.
*   `GET /api/customers/search?keyword={term}` - Search customers.

### Inventory
*   `POST /api/inventory` - Add inventory for a product in a branch.
*   `PUT /api/inventory/{inventoryId}` - Update inventory quantity.
*   `DELETE /api/inventory/{inventoryId}` - Remove inventory record.
*   `GET /api/inventory/branch/{branchId}` - Get all inventory for a branch.
*   `GET /api/inventory/branch/{branchId}/search?productName={name}` - Search inventory by product name.
*   `GET /api/inventory/branch/{branchId}/product/{productId}` - Get specific inventory item.

### Orders
*   `POST /api/orders` - Create a new order.
*   `GET /api/orders/{orderId}` - Get order by ID.
*   `DELETE /api/orders/{orderId}` - Delete an order.
*   `GET /api/orders/branch/{branchId}` - Get orders by branch (supports filtering by customer, cashier, status).
*   `GET /api/orders/branch/{branchId}/today` - Get today's orders for a branch.
*   `GET /api/orders/branch/{branchId}/top5` - Get top 5 orders by value for a branch.
*   `GET /api/orders/cashier/{cashierId}` - Get orders processed by a cashier.
*   `GET /api/orders/customer/{customerId}` - Get orders for a specific customer.

### Shift Reports
*   `POST /api/shift-reports/start` - Start a new shift for a cashier at a branch.
*   `POST /api/shift-reports/{id}/end` - End a specific shift.
*   `GET /api/shift-reports/{id}` - Get a shift report by its ID.
*   `GET /api/shift-reports` - Get all shift reports.
*   `GET /api/shift-reports/branch/{branchId}` - Get all shift reports for a specific branch.
*   `GET /api/shift-reports/cashier/{cashierId}` - Get all shift reports for a specific cashier.
*   `GET /api/shift-reports/current-progress/{cashierId}` - Get the current progress of an active shift for a cashier.
*   `GET /api/shift-reports/cashier/{cashierId}/date` - Get shift reports for a cashier on a specific date.

### Stores
*   (Endpoints available in `StoreController`)

## ⚙️ Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd POS-system-backend
    ```

2.  **Configure Database**
    *   The application is configured to use environment variables for database connection.
    *   Set the following environment variables:
        *   `MYSQLHOST`: Database host
        *   `MYSQLPORT`: Database port
        *   `MYSQL_DATABASE`: Database name
        *   `MYSQLUSER`: Database username
        *   `MYSQLPASSWORD`: Database password
    *   Alternatively, update `src/main/resources/application.properties` with your credentials directly for local development.

3.  **Build the project**
    ```bash
    ./mvnw clean install
    ```

4.  **Run the application**
    ```bash
    ./mvnw spring-boot:run
    ```
    The server will start on `http://localhost:8080` (or configured port).

## 🧪 Testing

You can test the APIs using **cURL** or **Postman**.

**Example: Create Product**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -d '{
    "name": "Smartphone X",
    "sku": "SMX-001",
    "description": "Latest model",
    "mrp": 999.99,
    "sellingPrice": 899.99,
    "brand": "TechBrand",
    "categoryId": 1,
    "storeId": 1
  }'
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
