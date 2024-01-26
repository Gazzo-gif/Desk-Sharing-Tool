FROM mariadb:latest

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default MySQL port (this line is not necessary, as ports are exposed by default in the base image)
EXPOSE 3306

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=mypass
ENV MYSQL_DATABASE=mydatabase
