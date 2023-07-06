const connection = require('../setMysql.js');
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_option VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    contact_description LONGTEXT NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createTableQuery, (error) => {
    if (error) {
        console.error('Error creating contacts table:', error);
    } else {
        console.log('Contact table created');
    }
});