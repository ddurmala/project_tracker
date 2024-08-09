const router = require('express').Router();
const view_controller = require('../controllers/view_controller');
const { redirectGuest, redirectUser } = require('./helpers')

// homepage route

router.get('/', redirectUser, view_controller.showHomepage);

//register route
router.get('/register', redirectUser, view_controller.showRegisterPage);

//login route
router.get('/login', redirectUser, view_controller.showLoginPage);

//dashboard route
router.get('/dashboard', redirectGuest, view_controller.showDashboard)

module.exports = router;