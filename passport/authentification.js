const ensureLoggedIn = (req, res, next) =>
    req.isAuthenticated() ? next() : res.redirect('/');

module.exports = ensureLoggedIn;