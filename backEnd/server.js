const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',  
  user: 'root',        
  password: '',  
  database: 'healthcare_system',     
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Defining  routes
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM login_details'; 
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
