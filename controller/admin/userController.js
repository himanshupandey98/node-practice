const connection = require('../../setMysql.js')

const getUsers = (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            res.status(200).json({ status: 200, results })
        }
    })
}




const createUsers = (req, res) => {
    const { username, password } = req.body

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)'
    const values = [username, password]

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            res
                .status(201)
                .json({ status: 200, message: 'User created successfully' })
        }
    })
}


const editUsers = (req, res) => {
    const userId = req.body.id;

    const query = 'SELECT * FROM users WHERE id = ?';

    connection.query(query, [userId], (error, results) => {
        if (error) {
            res.status(500).json({ status:500,error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ status:404,error: 'User not found' });
            } else {
                const user = results[0];
                res.status(200).json({status:200,user:user});
            }
        }
    });
}





const updateUsers = (req, res) => {
    const { id, username, password } = req.body
    const query = 'UPDATE users SET username = ?, password = ? WHERE id = ?'

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




const deleteUsers = (req, res) => {
    const userId = req.body.id;
    const query = 'DELETE FROM users WHERE id = ?';

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
    getUsers,
    createUsers,
    editUsers,
    updateUsers,
    deleteUsers
}
