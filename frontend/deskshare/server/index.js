const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost", //127.0.0.1
  user: "root",
  password: "mypass",
  database: "mydatabase",
});

const app = express();

app.use(cors());
app.get("/home", () => {
  db.query(
    "INSERT INTO rooms (type, position) VALUES ('date', 'date')",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});
app.listen(8080, () => {
  console.log("Server listining on port:8080");
});
