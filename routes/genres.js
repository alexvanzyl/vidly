const auth = require('../middleware/auth')
const router = require('express').Router()
const genresController = require('../controllers/genres')

router.get('/', genresController.getAll)
router.post('/', auth, genresController.save)
router.get('/:id', genresController.getById)
router.put('/:id', auth, genresController.update)
router.delete('/:id', auth, genresController.delete)

module.exports = router