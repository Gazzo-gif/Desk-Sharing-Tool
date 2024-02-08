# Desk-Sharing-Tool

Web application that allows to book worspaces in an office.

## How to run the project

The given commands are assuming you are running the project in the SSH server.

To run the project use `docker-compose up`.

If you want to build it use `docker-compose up --build`.

To be able to use the web application in your local browser use `ssh -L 3000:localhost:3000 -L 8080:localhost:8080 username@188.34.162.76 -p 22`. Change user name for your username. This should be run in your command prompt in the local machine, NOT the SSH server.
