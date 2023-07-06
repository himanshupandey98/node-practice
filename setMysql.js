const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',       // Replace with your MySQL host
    user: 'root',            // Replace with your MySQL username
    password: '',    // Replace with your MySQL password
    database: 'TB',    // Replace with your MySQL database name
});
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = connection