const connection = require('../setMysql.js');
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    project_image MEDIUMTEXT NOT NULL,
    project_category VARCHAR(255) NOT NULL,
    project_description LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createTableQuery, (error) => {
    if (error) {
        console.error('Error creating projects table:', error);
    } else {
        console.log('Projects table created');
    }
});