-- Initial Data for POS System

-- 1. Create Super Admin User (Password: password)
INSERT INTO users (full_name, email, password, phone, role, status, created_at, updated_at)
VALUES ('Super Admin', 'superadmin@pos.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVdukPxk.So0Ba4r.e8h.e.e', '0000000000', 'ROLE_SUPERADMIN', 'ACTIVE', NOW(), NOW());

-- 2. Create a Sample Store
INSERT INTO stores (brand, description, store_type, status, email, phone, address, city, country, created_at, updated_at)
VALUES ('Tech World', 'Electronics and Gadgets', 'RETAIL', 'ACTIVE', 'contact@techworld.com', '1234567890', '123 Tech Street', 'Silicon Valley', 'USA', NOW(), NOW());

-- 3. Create Store Admin User (Password: password)
INSERT INTO users (full_name, email, password, phone, role, status, store_id, created_at, updated_at)
VALUES ('Store Admin', 'admin@techworld.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVdukPxk.So0Ba4r.e8h.e.e', '9876543210', 'ROLE_STORE_MANAGER', 'ACTIVE', 1, NOW(), NOW());

-- Update Store with Admin ID
UPDATE stores SET admin_id = 2 WHERE id = 1;

-- 4. Create a Sample Branch
INSERT INTO branches (name, address, phone, email, open_time, close_time, store_id, created_at, updated_at)
VALUES ('Downtown Branch', '456 Downtown Ave', '1122334455', 'downtown@techworld.com', '09:00:00', '21:00:00', 1, NOW(), NOW());

-- 5. Create Branch Manager User (Password: password)
INSERT INTO users (full_name, email, password, phone, role, status, store_id, branch_id, created_at, updated_at)
VALUES ('Branch Manager', 'manager@techworld.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVdukPxk.So0Ba4r.e8h.e.e', '5566778899', 'ROLE_BRANCH_MANAGER', 'ACTIVE', 1, 1, NOW(), NOW());

-- Update Branch with Manager ID
UPDATE branches SET manager_id = 3 WHERE id = 1;

-- 6. Create Cashier User (Password: password)
INSERT INTO users (full_name, email, password, phone, role, status, store_id, branch_id, created_at, updated_at)
VALUES ('John Cashier', 'cashier@techworld.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRkgVdukPxk.So0Ba4r.e8h.e.e', '9988776655', 'ROLE_CASHIER', 'ACTIVE', 1, 1, NOW(), NOW());

-- 7. Create Categories
INSERT INTO categories (name, description, store_id, created_at, updated_at)
VALUES ('Smartphones', 'Mobile Phones', 1, NOW(), NOW());

INSERT INTO categories (name, description, store_id, created_at, updated_at)
VALUES ('Laptops', 'Notebooks and PCs', 1, NOW(), NOW());

-- 8. Create Products
INSERT INTO products (name, sku, description, mrp, selling_price, cost_price, brand, category_id, store_id, is_active, created_at, updated_at)
VALUES ('iPhone 15', 'IP15-128', 'Latest Apple iPhone', 999.99, 899.99, 800.00, 'Apple', 1, 1, TRUE, NOW(), NOW());

INSERT INTO products (name, sku, description, mrp, selling_price, cost_price, brand, category_id, store_id, is_active, created_at, updated_at)
VALUES ('Samsung S24', 'S24-256', 'Samsung Galaxy S24', 899.99, 799.99, 700.00, 'Samsung', 1, 1, TRUE, NOW(), NOW());

INSERT INTO products (name, sku, description, mrp, selling_price, cost_price, brand, category_id, store_id, is_active, created_at, updated_at)
VALUES ('MacBook Air', 'MBA-M2', 'Apple MacBook Air M2', 1199.99, 1099.99, 950.00, 'Apple', 2, 1, TRUE, NOW(), NOW());

-- 9. Inventory
INSERT INTO inventory (product_id, branch_id, quantity, low_stock_threshold, last_restocked_at, updated_at)
VALUES (1, 1, 50, 5, NOW(), NOW());

INSERT INTO inventory (product_id, branch_id, quantity, low_stock_threshold, last_restocked_at, updated_at)
VALUES (2, 1, 30, 5, NOW(), NOW());

INSERT INTO inventory (product_id, branch_id, quantity, low_stock_threshold, last_restocked_at, updated_at)
VALUES (3, 1, 15, 2, NOW(), NOW());

-- 10. Sample Customer
INSERT INTO customers (full_name, email, phone, address, loyalty_points, store_id, created_at, updated_at)
VALUES ('Alice Customer', 'alice@example.com', '1231231234', '789 Customer Lane', 100, 1, NOW(), NOW());

-- 11. Sample Demo Request
INSERT INTO demo_requests (full_name, email, company_name, phone, status, created_at, updated_at)
VALUES ('Interested User', 'demo@newcompany.com', 'New Retail Co', '1112223333', 'PENDING', NOW(), NOW());
