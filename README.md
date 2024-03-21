# Desk-Sharing-Tool

Web application that allows to book workspaces in an office.

## How to run the project

If the application is not running yet in the server:

The given commands are assuming you are running the project in the SSH server.

To run the project use: `docker-compose up`.

If you need to build it use: `docker-compose up --build`.

You will be able to access the website in `http://188.34.162.76:3000`,

The databse will be in `http://188.34.162.76:3306` and the backend with the REST API will be in `http://188.34.162.76:8080`.


## Run locally

### Database

We are using docker to have a database running. So first of all make sure you have docker installed, once you have docker you can run these commands:

1. To get mariadb image: `docker pull mariadb`
2. To create and run the container for the database: `docker run -d --name database -e MYSQL_ROOT_PASSWORD=mypass -p 3306:3306 mariadb`

Some other commands:

3. If you want to get inside the container: `docker exec -it database bash`
4. To get inside the database: `mariadb -pmypass`

Also make sure you have a database called "mydatabase".

### Backend

We are going to run the backend with maven, so first make sure you have maven installed.

Now make sure you are in the backend directory. Then we can do a cleaning and install of all dependencies: `mvn clean install` or `mvn clean package` (maybe you have to use `./mvn` or `./mvnw`.

If you didnt have any error you can now run using this command: `java -jar target/backend-0.0.1-SNAPSHOT.jar `

### Frontend

For the frontend we use npm, so make sure you have it. Go to the frontend directory and again, make sure you have all the necessary packages: `npm i` or `npm install`.

And now run the frontend: `npm start`

To run the tests, you can run: `npm run test`
