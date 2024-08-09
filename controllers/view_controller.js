const { User } = require('../models');

module.exports = {
    showHomepage(req, res) {
        res.render('homepage', {
            title: 'PT Homepage'
        });
    },

    showRegisterPage(req, res) {
        res.render('register', {
            title: 'PT Register'
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
