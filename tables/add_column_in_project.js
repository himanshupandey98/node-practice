const connection = require('../setMysql.js');
const createTableQuery = `
  ALTER TABLE projects ADD COLUMN tickets_booked VARCHAR(255) NULL, ADD COLUMN revenue_generated VARCHAR(255) NULL
`;

connection.query(createTableQuery, (error) => {
    if (error) {
        console.error('Error creating projects table:', error);
    } else {
        console.log('Projects table updated');
    }
});