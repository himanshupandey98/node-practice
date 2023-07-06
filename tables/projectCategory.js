
const connection = require('../setMysql.js');
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS projectCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    description MEDIUMTEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createTableQuery, (error) => {
    if (error) {
        console.error('Error creating project categories table:', error);
    } else {
        console.log('Project categories table created');
    }
});