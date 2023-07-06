
const connection = require('../setMysql.js');
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createTableQuery, (error) => {
    if (error) {
        console.error('Error creating users table:', error);
    } else {
        console.log('Users table created');
    }
});