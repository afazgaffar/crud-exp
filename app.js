const express = require("express");
const mysql = require("mysql2");
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
//create database

const connection = mysql.createConnection({
  host: "mysql.94dev.com",
  user: "afaz",
  password: "8Squ9W@&qqS2",
  database: "afaz_stud",
});


app.get("/students", (req, res) => {
  // fetch data from DB
  connection.query("SELECT * FROM students", (err, results, fields) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    } else {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
      res.json({
        message: "students fetched",
        data: results,
      });
    }
  });
});
app.get("/student/:id", (req, res) => {
  const studentId = req.params.id;
  connection.query(
    `SELECT * FROM students WHERE id = ${studentId}`,
    (err, results, fields) => {
      
      console.log(results);

      //data = get studentId from DB
      if  (results===0)  {
        console.log(err)
        res.status(404).json({
          message: err.notfound,
        });
      } // get from DB
      else {
        console.log(results); // results contains rows returned by server
        console.log(fields);// fields contains extra meta data about results, if available
        res.json({
          message: `student id: ${studentId} `,
          data: results,
        });
      }
    }
  );
});

// GET - /students => get all students
// GET - /student/:id => (get path params from request)
// POST - /student => (body parser - json)

// POST  bodies
app.post('/student', (req, res)=> {

  
  
  let sql = `INSERT INTO students (name, id, age, address)
     VALUES ('zain', 009 , 63 , 'jaffna' ) `; 
  connection.query(sql);
  console.log(req.body);
  res.send('welcome, ' + req.body.name);


});
  




// PUT - /student => update a student data
// DELETE - /student/:id



app.listen(3000);
