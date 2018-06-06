const auth = require('../middleware/auth')
const router = require('express').Router();
const usersController = require('../controllers/users')

router.post('/', usersController.save)
router.get('/me', auth, usersController.getMe)

module.exports = router