const connection = require('../../setMysql.js')


const getReviews = (req, res) => {
    connection.query('SELECT * FROM reviews', (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            res.status(200).json({ status: 200, results })
        }
    })
}




const createReviews = (req, res) => {

    const { star_rating, comment, client_name, client_description } = req.body

    const query = 'INSERT INTO reviews (star_rating, comment,client_name,client_description) VALUES (?, ?,?, ?)'
    const values = [star_rating, comment, client_name, client_description]

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ error: 'An error occurred' })
        } else {
            res
                .status(201)
                .json({ status: 200, message: 'Reviews created successfully' })
        }
    })
}



const editReviews = (req, res) => {
    const reviewsId = req.body.id;

    const query = 'SELECT * FROM reviews WHERE id = ?';

    connection.query(query, [reviewsId], (error, results) => {
        if (error) {
            res.status(500).json({ status:500,error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ status:404,error: 'Reviews not found' });
            } else {
                const review = results[0];
                res.status(200).json({status:200,review:review});
            }
        }
    });
}

const updateReviews = (req, res) => {

    const { id, star_rating, comment, client_name, client_description } = req.body;
    const query = 'UPDATE reviews SET star_rating = ?, comment = ?, client_name = ?, client_description = ? WHERE id = ?';

    connection.query(query, [star_rating, comment, client_name, client_description, id], (error, results) => {
        if (error) {
            res.status(500).json({ status: 500, error: 'Internal Server Error' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ status: 404, error: 'Record not found' });
            } else {
                res.status(201).json({ status: 201, message: 'Reviews updated successfully' });
            }
        }
    });
}




const deleteReviews = (req, res) => {
    const reviewsId = req.body.id;
    const query = 'DELETE FROM reviews WHERE id = ?';

    connection.query(query, [reviewsId], (error, results) => {
        if (error) {

            res.status(500).json({ status: 500, error: 'Internal Server Error' });
        } else {

            if (results.affectedRows === 0) {
                res.status(404).json({ status: 404, error: 'Record not found' });
            } else {
                res.status(200).json({ status: 200, message: 'Reviews deleted successfully' });
            }
        }
    });
}







module.exports = {
    getReviews,
    createReviews,
    editReviews,
    updateReviews,
    deleteReviews
}
