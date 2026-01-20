# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
RUN ls -la /app/target/

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy the specific jar file.
COPY --from=build /app/target/POS-system-backend-0.0.1-SNAPSHOT.jar /app/app.jar
RUN ls -la /app/
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
