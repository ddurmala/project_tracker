const { User } = require('../models');

module.exports = {
    showHomepage(req, res) {
        res.render('homepage', {
            title: 'Project Tracker'
        });
    },

    showRegisterPage(req, res) {
        res.render('register', {
            title: 'PT Register',
            register: true
        })
    },

    showLoginPage(req, res) {
        res.render('login', {
            title: 'PT Log In',
            login: true
        })
    },

    async showDashboard(req, res) {
        const user = await User.findByPk(req.session.user_id, {
            attributes: ['email']
        });

        res.render('dashboard', {
            title: 'PT Dashboard',
            user: user.get({ plain: true })
        })
    }
}
