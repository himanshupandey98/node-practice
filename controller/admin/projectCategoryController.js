const connection = require('../../setMysql.js')


const getProjectCategories = (req, res) => {
    connection.query('SELECT * FROM projectCategories', (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            res.status(200).json({ status: 200, results })
        }
    })
}




const createProjectCategories = (req, res) => {
    
    const { category, description } = req.body

    const query = 'INSERT INTO projectCategories (category, description) VALUES (?, ?)'
    const values = [category, description]

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            res
                .status(201)
                .json({ status: 200, message: 'Project Category created successfully' })
        }
    })
}

const editProjectCategories = (req, res) => {
    const projectCategoryId = req.body.id;

    const query = 'SELECT * FROM projectCategories WHERE id = ?';

    connection.query(query, [projectCategoryId], (error, results) => {
        if (error) {
            res.status(500).json({ status:500,error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ status:404,error: 'Project category not found' });
            } else {
                const user = results[0];
                res.status(200).json({status:200,user:user});
            }
        }
    });
}



const updateProjectCategories = (req, res) => {
    
    const { id, category, description } = req.body
    const query = 'UPDATE projectCategories SET category = ?, description = ? WHERE id = ?'

    connection.query(query, [category, description, id], (error, results) => {
        if (error) {
            res.status(500).json({ status: 500, error: 'Internal Server Error' })
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ status: 404, error: 'Record not found' })
            } else {
                res
                    .status(201)
                    .json({ status: 201, message: 'Project Category updated successfully' })
            }
        }
    })
}




const deleteProjectCategories = (req, res) => {
    const projectCategoryId = req.body.id;
    const query = 'DELETE FROM projectCategories WHERE id = ?';

    connection.query(query, [projectCategoryId], (error, results) => {
        if (error) {

            res.status(500).json({ status: 500, error: 'Internal Server Error' });
        } else {

            if (results.affectedRows === 0) {
                res.status(404).json({ status: 404, error: 'Record not found' });
            } else {
                res.status(200).json({ status: 200, message: 'Project Category deleted successfully' });
            }
        }
    });
}







module.exports = {
    getProjectCategories,
    createProjectCategories,
    editProjectCategories,
    updateProjectCategories,
    deleteProjectCategories
}
