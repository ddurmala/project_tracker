const router = require('express').Router();
const view_controller = require('../controllers/view_controller')

// homepage route

router.get('/', view_controller.showHomepage);

//register route
router.get('/register', view_controller.showRegisterPage);

//dashboard route
router.get('/dashboard', view_controller.showDashboard)

module.exports = router;