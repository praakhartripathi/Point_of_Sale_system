# POS System Backend

This is the backend service for the POS System, built with Java and Spring Boot.

## Technologies

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Spring Security (JWT Authentication)
- MySQL Driver
- Swagger UI (OpenAPI)

## Configuration

The application is configured via environment variables (see `docker-compose.yml` or `.env`):

- `SPRING_DATASOURCE_URL`: JDBC URL for MySQL.
- `SPRING_DATASOURCE_USERNAME`: Database username.
- `SPRING_DATASOURCE_PASSWORD`: Database password.
- `GOOGLE_CLIENT_ID`: Google OAuth2 Client ID.
- `GOOGLE_CLIENT_SECRET`: Google OAuth2 Client Secret.

## Running Locally (Without Docker)

Prerequisites:

- Java JDK 17
- Maven
- Running MySQL instance

Run the application using Maven:

```bash
mvn spring-boot:run
```

## API Documentation

Once the application is running, you can access the Swagger UI documentation at:

```bash
http://localhost:5001/swagger-ui/index.html
```

## Trial Account Endpoints

- **Sign Up**: `POST /api/trial/signup`
- **Sign In**: `POST /api/trial/signin`
- **Get Profile**: `GET /api/trial/profile` (Requires Bearer Token)
- **Change Password**: `PUT /api/trial/change-password` (Requires Bearer Token)

### Change Password Request Body

```json
{
  "currentPassword": "your_current_password",
  "newPassword": "new_strong_password",
  "confirmNewPassword": "new_strong_password"
}
```
