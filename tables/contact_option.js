const connection = require('../setMysql.js');
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS contact_option (
    id INT AUTO_INCREMENT PRIMARY KEY,
    option VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;



connection.query(createTableQuery, (error) => {
  if (error) {
    console.error('Error creating contact option table:', error);
  } else {
    console.log('contact option table created');
  }
});