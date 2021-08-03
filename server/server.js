const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "mini",
});
// to insert data into database========================================================================
app.post("/create", (req, res) => {
  console.log("Success");
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "INSERT INTO employees (name, age, username,password, country, position, wage) values (?,?,?,?,?,?,?)",
    [name, age, username, password, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// to get data from database========================================================================
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  // console.log(id, wage);
  db.query(
    `UPDATE employees SET wage = (?) WHERE emp_id = (?)`,
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete", (req, res) => {
  const id = req.body.userid;
  console.log(req);
  db.query("DELETE FROM employees WHERE emp_id= ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "select username,password from employees where username=(?) and password=(?)",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        let ret = { message: "login Success", isLogin: true };
        res.json(ret);
      } else {
        let ret = { message: "check credential", isLogin: false };
        res.json(ret);
        // res.json({ message: "check credential", isLogin: false });
      }
    }
  );
});
app.listen(3001, () => {
  console.log("Yay, Your server is running on port 3001");
});
