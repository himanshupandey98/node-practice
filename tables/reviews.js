const connection = require('../setMysql.js');
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    star_rating VARCHAR(255) NOT NULL,
    comment MEDIUMTEXT NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createTableQuery, (error) => {
    if (error) {
        console.error('Error creating users table:', error);
    } else {
        console.log('Reviews table created');
    }
});