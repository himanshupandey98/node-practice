const connection = require('../../setMysql.js')

const getContacts = (req, res) => {
    connection.query('SELECT * FROM contacts', (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            res.status(200).json({ status: 200, results })
        }
    })
}




const createContacts = (req, res) => {
    const { contact_option, contact_name, contact_email, contact_number, contact_description } = req.body

    const query = 'INSERT INTO contacts (contact_option, contact_name,contact_email,contact_number,contact_description) VALUES (?, ?,?, ? ,?)'
    const values = [contact_option, contact_name, contact_email, contact_number, contact_description]

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            res
                .status(201)
                .json({ status: 200, message: 'contacts created successfully' })
        }
    })
}


const editContacts = (req, res) => {
    const userId = req.body.id;

    const query = 'SELECT * FROM contacts WHERE id = ?';

    connection.query(query, [userId], (error, results) => {
        if (error) {
            res.status(500).json({ status: 500, error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ status: 404, error: 'User not found' });
            } else {
                const user = results[0];
                res.status(200).json({ status: 200, user: user });
            }
        }
    });
}





const updateContacts = (req, res) => {
    const { id, username, password } = req.body
    const query = 'UPDATE contacts SET username = ?, password = ? WHERE id = ?'

    connection.query(query, [username, password, id], (error, results) => {
        if (error) {
            res.status(500).json({ status: 500, error: 'Internal Server Error' })
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ status: 404, error: 'Record not found' })
            } else {
                res
                    .status(201)
                    .json({ status: 201, message: 'User updated successfully' })
            }
        }
    })
}




const deleteContacts = (req, res) => {
    const userId = req.body.id;
    const query = 'DELETE FROM contacts WHERE id = ?';

    connection.query(query, [userId], (error, results) => {
        if (error) {

            res.status(500).json({ status: 500, error: 'Internal Server Error' });
        } else {

            if (results.affectedRows === 0) {
                res.status(404).json({ status: 404, error: 'Record not found' });
            } else {
                res.status(200).json({ status: 200, message: 'User deleted successfully' });
            }
        }
    });
}







module.exports = {
    getContacts,
    createContacts,
    editContacts,
    updateContacts,
    deleteContacts
}
