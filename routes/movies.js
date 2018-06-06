const auth = require('../middleware/auth')
const router = require('express').Router()
const moviesController = require('../controllers/movies')

router.get('/', moviesController.getAll);
router.post('/', auth, moviesController.save)
router.get('/:id', moviesController.getById)
router.put('/:id', auth, moviesController.update)
router.delete('/:id', auth, moviesController.delete);

module.exports = router