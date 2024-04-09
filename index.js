const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Akshu123@",
    database: "technossus"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get" , (req , res) =>{
    const sqlGet = "SELECT * FROM students_data";
    db.query(sqlGet, (err, result) => {
        res.send(result)
});
});
app.post("/api/post" , (req, res) =>{
    const {studentName, fatherName, motherName, age , address , regDate} = req.body;
    const sqlInsert = "INSERT INTO students_data (`studentName`, `fatherName`, `motherName`, `age`, `address`, `regDate`)  VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [studentName, fatherName, motherName, age, address, regDate], (err, result) => {
        if(err){
            console.log(err);
        }
});
});
app.delete("/api/remove/:id" , (req, res) =>{
    const { id } = req.params;
    const sqlRemove = "DELETE FROM students_data WHERE id = ?";
    db.query(sqlRemove, id , (err, result) => {
        if(err){
            console.log(err);
        }
});
});
 
app.get("/api/get/:id" , (req , res) =>{
    const{id} = req.params;
    const sqlGet = "SELECT * FROM students_data WHERE id = ?";
    db.query(sqlGet, id,(err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result)
});
});
app.put("/api/update/:id" , (req , res) =>{
    const{ id } = req.params;
    const { studentName, fatherName , motherName,age,address,regDate} = req.body;
    const sqlUpdate = "UPDATE students_data SET studentName = ? , fatherName = ? , motherName = ? , age = ? , regDate = ? WHERE id = ?" ;
    db.query(sqlUpdate, [studentName , fatherName , motherName , age , address , regDate , id],(err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result)
});
});

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO students_data (`studentName`, `fatherName`, `motherName`, `age`, `address`, `regDate`)  VALUES ('Alka', 'Dimpal', 'Nisha', 21, 'vill-nangal', '1999-10-10');"
    // db.query(sqlInsert, (err, result) => {
    //     if (err) {
    //         console.error("Error executing query:", err.stack);
    //         res.status(500).send("Error executing query");
    //     } else {
    //         console.log("Query executed successfully");
    //         console.log("Inserted rows:", result.affectedRows);
    //         res.send("Hello World");
    //     }
    // });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
