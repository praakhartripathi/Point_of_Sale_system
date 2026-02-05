-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(255),
    profile_image VARCHAR(255),
    role ENUM('ROLE_USER', 'ROLE_ADMIN', 'ROLE_CASHIER', 'ROLE_BRANCH_MANAGER', 'ROLE_STORE_MANAGER', 'ROLE_SUPERADMIN') NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE', 'BANNED', 'PENDING_VERIFICATION') DEFAULT 'ACTIVE',
    store_id BIGINT,
    branch_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    last_login_at DATETIME,
    stripe_customer_id VARCHAR(255)
);

-- Stores Table
CREATE TABLE IF NOT EXISTS stores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    admin_id BIGINT,
    parent_store_id BIGINT,
    description TEXT,
    store_type ENUM('RETAIL', 'RESTAURANT', 'SERVICE', 'WHOLESALE'),
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED'),
    email VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(20),
    country VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (admin_id) REFERENCES users(id),
    FOREIGN KEY (parent_store_id) REFERENCES stores(id)
);

-- Branches Table
CREATE TABLE IF NOT EXISTS branches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    open_time TIME,
    close_time TIME,
    store_id BIGINT,
    manager_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (manager_id) REFERENCES users(id)
);

-- Branch Working Days (ElementCollection)
CREATE TABLE IF NOT EXISTS branch_working_days (
    branch_id BIGINT NOT NULL,
    working_days VARCHAR(20),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    store_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    description TEXT,
    mrp DOUBLE,
    selling_price DOUBLE,
    cost_price DOUBLE,
    brand VARCHAR(255),
    category_id BIGINT,
    store_id BIGINT,
    image_url VARCHAR(255),
    barcode VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

-- Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    branch_id BIGINT NOT NULL,
    quantity INT DEFAULT 0,
    low_stock_threshold INT DEFAULT 10,
    last_restocked_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    address TEXT,
    loyalty_points INT DEFAULT 0,
    store_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE,
    customer_id BIGINT,
    branch_id BIGINT,
    cashier_id BIGINT,
    total_amount DOUBLE,
    tax_amount DOUBLE,
    discount_amount DOUBLE,
    payment_method ENUM('CASH', 'CARD', 'UPI', 'ONLINE'),
    status ENUM('PENDING', 'COMPLETED', 'CANCELLED', 'REFUNDED'),
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (cashier_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT,
    product_name VARCHAR(255),
    quantity INT,
    unit_price DOUBLE,
    subtotal DOUBLE,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Demo Requests Table
CREATE TABLE IF NOT EXISTS demo_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    company_name VARCHAR(255),
    phone VARCHAR(255),
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    notes TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    plan_type ENUM('STARTER', 'BUSINESS', 'ENTERPRISE'),
    stripe_subscription_id VARCHAR(255),
    status ENUM('ACTIVE', 'CANCELED', 'PAST_DUE'),
    start_date DATETIME,
    end_date DATETIME,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount DOUBLE,
    currency VARCHAR(10),
    stripe_payment_intent_id VARCHAR(255),
    status VARCHAR(50),
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Shift Reports Table
CREATE TABLE IF NOT EXISTS shift_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cashier_id BIGINT,
    branch_id BIGINT,
    start_time DATETIME,
    end_time DATETIME,
    total_sales DOUBLE DEFAULT 0.0,
    total_refunds DOUBLE DEFAULT 0.0,
    cash_in_drawer DOUBLE DEFAULT 0.0,
    notes TEXT,
    FOREIGN KEY (cashier_id) REFERENCES users(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- Refunds Table
CREATE TABLE IF NOT EXISTS refunds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    amount DOUBLE,
    reason TEXT,
    cashier_id BIGINT,
    created_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (cashier_id) REFERENCES users(id)
);

-- Add Foreign Key Constraints for User (Circular dependencies)
ALTER TABLE users ADD CONSTRAINT fk_user_store FOREIGN KEY (store_id) REFERENCES stores(id);
ALTER TABLE users ADD CONSTRAINT fk_user_branch FOREIGN KEY (branch_id) REFERENCES branches(id);

-- Trial Accounts Table
CREATE TABLE IF NOT EXISTS trial_accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(255),
    owner_name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile VARCHAR(255),
    password VARCHAR(255),
    plan VARCHAR(50) DEFAULT 'TRIAL',
    start_date DATETIME,
    end_date DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME
);
