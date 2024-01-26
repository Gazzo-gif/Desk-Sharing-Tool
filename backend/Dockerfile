# Use an official Maven image to build the application
FROM maven:3.8.4-openjdk-11-slim AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the Maven project files into the container
COPY . .

# Build the Maven project
RUN mvn clean install

# Use a lightweight Java runtime image
FROM openjdk:11-jre-slim

# Set the working directory for the runtime stage
WORKDIR /usr/src/app

# Copy the compiled JAR file from the build stage
# Adjust the path if your JAR file is in a different location
COPY --from=build /usr/src/app/target/backend-1.0-SNAPSHOT.jar backend.jar

# Specify the default command to run your application
CMD ["java", "-jar", "backend.jar"]
