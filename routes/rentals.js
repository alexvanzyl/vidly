const auth = require('../middleware/auth')
const router = require('express').Router()
const rentalsController = require('../controllers/rentals')

router.get('/', auth, rentalsController.getAll)
router.post('/', auth, rentalsController.save)
router.get('/:id', auth, rentalsController.getById)

module.exports = router