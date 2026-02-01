# POS System

A full-stack Point of Sale system composed of a Spring Boot backend, a modern frontend, and a MySQL database.

## Architecture

The project is containerized using Docker Compose and consists of the following services:

- **Database (`pos-db`)**: MySQL 8.0 running on port `3306` (exposed on host as `3307`).
- **Backend (`pos-backend`)**: Spring Boot application running on port `5000`.
- **Frontend (`pos-frontend`)**: Web interface running on port `5173` (exposed on host as `3000`).

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Navigate to the project root.
2. Start the services:

   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Database**: `localhost:3307`
     - User: `pos_user`
     - Password: `password`
     - Database: `pos_db`

## Development Setup

To work on the source code, clone the repository and set up the individual services.

### 1. Clone the Repository

```bash
git clone https://github.com/praakhartripathi/Point_of_Sale_system.git
cd Point_of_Sale_system
```

### 2. Backend Development

The backend is a Spring Boot application located in `POS-system-backend/`.

- **Prerequisites**: Java 17, Maven, MySQL.
- **Configuration**: Update database credentials in `src/main/resources/application.properties` or via environment variables.
- **Run**:
  ```bash
  cd POS-system-backend
  mvn spring-boot:run
  ```

### 3. Frontend Development

The frontend is a React + Vite application located in `POS-system-frontend/`.

- **Prerequisites**: Node.js.
- **Run**:
  ```bash
  cd POS-system-frontend
  npm install
  npm run dev
  ```