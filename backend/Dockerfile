# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:resolve

COPY src ./src
RUN mvn clean package -DskipTests

RUN ls -la target

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy ANY jar built by Maven
COPY --from=build /app/target/*.jar app.jar

EXPOSE 5001
ENTRYPOINT ["java", "-jar", "app.jar"]
