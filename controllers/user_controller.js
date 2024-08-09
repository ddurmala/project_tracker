const { User } = require('../models');


module.exports = {
    async registerUser(req, res) {
        try {
            const user = await User.create(req.body);

            //store who this user is so later on when they make a request we can pull specific data related to the specific user
            req.session.user_id = user.id;

            res.redirect('/dashboard');

        } catch (error) {
            console.log(error);
            res.redirect('/register');
        }

    },

    async loginUser(req, res) {

    }
}