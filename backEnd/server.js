require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 5000;
// app.listen(port, () => console.log(`Server running on port ${port}`));

app.use(express.json()); //parse Json bodies
app.use(cors()); // for enabling the CORS for cross-origin requests


const instance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});



//mySQLconnection configuration
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    // port: process.env.PORT,
});

//conecting to the database
db.connect((err, conn) => {
    if (err) {
        console.error('Error conecting to the database:', err);
        return conn;
    }
    console.log('Connected to database');
});

// Define the API route to fatch patient
app.get('/patient', (req, res) => {
    const sql = 'SELECT * FROM patient';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Define the API route to add a new user

app.post('/patient', (req, res) => {
    const { names, email, phone } = req.body;

    const sql = 'INSERT INTO patient (names, email, phone) VALUES (?, ?, ?)';
    const values = [names, email, phone];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'User added successfully!', id: result.insertId });
    });
});

// // Define the API route to update a user
// app.put('/patient/:id', (req, res) =>{
//     // return"welcom please";
//     const{id} = req.params;
//     const{names, email, phone,} = req.body;

//     const sql = 'UPDATE patient SET names = ?, email = ?, phone = ? WHERE id = ?';
//     const values = [names, email, phone, id];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.json({ message: 'User updated successfully!' });
//     });
// });



// Define the API route to delete a user

// app.delete('/patient/:id', (req, res) => {
//     const { id } = req.params;

//     const sql = 'DELETE FROM patient WHERE id=?';

//     db.query(sql, id, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         res.json({ message: 'User deleted successfully!' });
//     });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
