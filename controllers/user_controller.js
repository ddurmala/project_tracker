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
        const formData = req.body;
        //get the user
        const user = await User.findOne({
            where: {
                email: formData.email
            }
        });
        //if the user was not found, redirect them to register
        if (!user) {
            return res.redirect('/register');
        }

        //check the password that was provide thru the form to ensure its the same as the stored pw in the db
        const valid_pass = await user.validatePassword(formData.password);

        if (!valid_pass) {
            return res.redirect('/login')
        }

        //the user is validated and now we need to create a session for them and send a cookie
        req.session.user_id = user.id;

        res.redirect('/dashboard');
    },



    logoutUser(req, res) {
        req.session.destroy();

        res.redirect('/')
    }
}