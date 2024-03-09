# Use an official Maven image to build the application
FROM maven:3.8.4-openjdk-11-slim AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the Maven project files into the container
COPY . .

# Build the Maven project
RUN mvn clean package

# Use a lightweight Java runtime image
FROM openjdk:11-jre-slim

# Set the working directory for the runtime stage
WORKDIR /usr/src/app

# Copy the compiled JAR file from the build stage
COPY --from=build /usr/src/app/target/backend-0.0.1-SNAPSHOT.jar backend-0.0.1-SNAPSHOT.jar

EXPOSE 8080

# Specify the default command to run your application
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
