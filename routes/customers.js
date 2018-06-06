const auth = require('../middleware/auth')
const router = require('express').Router()
const customersController = require('../controllers/customers')

router.get('/', auth, customersController.getAll)
router.post('/', auth, customersController.save)
router.get('/:id', auth, customersController.getById)
router.put('/:id', auth, customersController.update)
router.delete('/:id', auth, customersController.delete)

module.exports = router