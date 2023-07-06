
const connection = require('../../setMysql.js')
const path = require('path');




const getProjects = (req, res) => {
    connection.query('SELECT * FROM Projects', (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            const filePath = path.resolve('storage/1686892459797-samuel-scrimshaw-sseiVD2XsOk-unsplash.jpg');
            const modified = results.map(project => {

                return { ...project, project_image: path.resolve(`storage/project/${project.project_image}`) };
            });

            res.json({ status: 200, projects: modified });
        }
    })
}




const createProjects = (req, res) => {

    const { project_name, project_category, project_description } = req.body



    const query = 'INSERT INTO Projects (project_name, project_image,project_category,project_description) VALUES (?, ?,?,?)'
    const values = [project_name, req.file.filename, project_category, project_description]

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            res
                .status(201)
                .json({ status: 200, message: 'Project created successfully' })
        }
    })
}


const editProjects = (req, res) => {
    const projectId = req.body.id;

    const query = 'SELECT * FROM projects WHERE id = ?';

    connection.query(query, [projectId], (error, results) => {
        if (error) {
            res.status(500).json({ status:500,error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ status:404,error: 'Project  not found' });
            } else {
                // const user = results[0];
                const modified = results.map(project => {

                return { ...project, project_image: path.resolve(`storage/project/${project.project_image}`) };
            });
                res.status(200).json({status:200,user:modified[0]});
            }
        }
    });
}


const updateProjects = (req, res) => {
    const { project_name, project_category, project_description, id } = req.body

    const query = 'UPDATE Projects SET project_name = ?, project_image = ? , project_category = ?,project_description = ? WHERE id = ?'

    connection.query(query, [project_name, req.file.filename, project_category, project_description, id], (error, results) => {
        if (error) {
            res.status(500).json({ status: 500, error: 'Internal Server Error' })
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ status: 404, error: 'Record not found' })
            } else {
                res
                    .status(201)
                    .json({ status: 201, message: 'Project updated successfully' })
            }
        }
    })
}




const deleteProjects = (req, res) => {
    const projectId = req.body.id;
    const query = 'DELETE FROM Projects WHERE id = ?';

    connection.query(query, [projectId], (error, results) => {
        if (error) {

            res.status(500).json({ status: 500, error: 'Internal Server Error' });
        } else {

            if (results.affectedRows === 0) {
                res.status(404).json({ status: 404, error: 'Record not found' });
            } else {
                res.status(200).json({ status: 200, message: 'Project deleted successfully' });
            }
        }
    });
}







module.exports = {
    getProjects,
    createProjects,
    editProjects,
    updateProjects,
    deleteProjects
}
