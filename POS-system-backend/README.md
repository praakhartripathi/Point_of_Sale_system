# POS System Backend

This is the backend service for the POS System, built with Java and Spring Boot.

## Technologies

- Java
- Spring Boot
- Spring Data JPA
- MySQL Driver

## Configuration

The application is configured via environment variables (see `docker-compose.yml` or `.env`):

- `SPRING_DATASOURCE_URL`: JDBC URL for MySQL.
- `SPRING_DATASOURCE_USERNAME`: Database username.
- `SPRING_DATASOURCE_PASSWORD`: Database password.

## Running Locally (Without Docker)

Prerequisites:
- Java JDK
- Maven
- Running MySQL instance

Run the application using Maven:

```bash
mvn spring-boot:run
```