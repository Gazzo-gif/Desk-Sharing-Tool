# Desk-Sharing-Tool

Web application that allows to book workspaces in an office.

## How to run the project

This steps are refering to running the application in our server, you will have to create your own server for this, so the URLs will change.

If the application is not running yet in the server:

The given commands are assuming you are running the project in the SSH server.

To run the project use: `docker-compose up`.

If you need to build it use: `docker-compose up --build`.

You will be able to access the website in `http://188.34.162.76:3000`,

The databse will be in `http://188.34.162.76:3306` and the backend with the REST API will be in `http://188.34.162.76:8080`.


## Run locally

### Database

Create and run the container for the database: `docker run -d --name database -e MYSQL_ROOT_PASSWORD=mypass -p 3306:3306 mariadb:latest`

After that you can also do the following:

1. Get inside the container: `docker exec -it database bash`
2. Run MariaDB: `mariadb -pmypass`

Also make sure you have a database called "mydatabase". You can accomplish then when you are in step 2 and execute `CREATE DATABASE IF NOT EXISTS mydatabase;`.

### Backend

Make sure you are in the backend directory. Then we can do a cleaning and install of all dependencies: `./mvnw clean install` or `./mvnw clean package`.

If you didnt have any error you can now run using this command: `java -jar target/backend-0.0.1-SNAPSHOT.jar `

### Frontend

Go to the frontend directory, make sure you have all the necessary packages: `npm i` or `npm install`.

And now run the frontend: `npm start`

To run the tests, you can run: `npm run test`

## Starting the app

Once you have the website running, if it is the first time, the databse will be empty, so you have to add all the information for rooms, desks and people. The commands for the rooms and desks are in the folder 'commands', they are SQL commands, which you can run when you are inside the container, running MariaDB and connected to the corresponding database.

However, for the employees and admis we need to use another tool, the main reason is the encryption of the password. Our group used Postman for this, an application for testing APIs. To use Postman, once you have it dowsloaded, you will have to put the corresponding URLto the website, in our case i would be `http://188.34.162.76:8080/users/register`. Then you need to specify which type of method is the request, in this case POST, and the put the JSON body, e.g.:

{
  "email": "employee@example.com",
  "password": "123", 
  "name": "Employee",
  "surname": "Example", 
  "visibility": true,
  "admin": false
}

You can change the fields to the information you want to add. This will take care of everything for creating new users, both for admins and for employees (just change the field "admin" to true or false depending on the person's charge). Also know that you can't repeat the email for two different users.

![image](https://github.com/Gazzo-gif/Desk-Sharing-Tool/assets/105936212/0fe34153-6670-4cb9-96b8-7504548b7402)
