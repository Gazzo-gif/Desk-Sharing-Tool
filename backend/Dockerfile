# Use an official Maven image as a base image
FROM maven:3.8-openjdk-11

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the project files to the container
COPY . .

# Build the application
RUN mvn clean install

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run your application
CMD ["java", "-jar", "target/your-backend-app.jar"]
