# Use the official MariaDB image
FROM mariadb:latest

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=mypass
ENV MYSQL_DATABASE=mydatabase

# Copy initialization script to be executed during container startup
COPY init.sql /docker-entrypoint-initdb.d/
