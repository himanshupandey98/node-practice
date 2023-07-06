const connection = require('../../setMysql.js')


const login = (req, res) => {
    const { username, password } = req.body;
    if (username === 'suresh' && password === 'suresh@123') {

        req.session.loggedIn = true;
        req.session.username = username;
        // res.redirect('/dashboard'); 
        res.status(200).json({ status: 200, message: 'User LoggedIn Successfully !' });

        // console.log(req.session);
    } else {
        res.status(401).json({ status: 401, message: 'Invalid username or password' });
    }
};


const logout = (req, res) => {
    const userId = req.session.userId;
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.json({ status: 200, message: "Logout Success !" });
    });
};









module.exports = {
    login,
    logout
}