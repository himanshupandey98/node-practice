const requireAuth = (req, res, next) => {
    if (req.session.loggedIn) {
        next();

    } else {
        res.json({ status: 401, message: 'User is not LoggedIn !' });
    }
};

module.exports = {
    requireAuth
}