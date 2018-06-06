const { Movie, validate } = require('../models/movie')
const { Genre } = require('../models/genre')

exports.getAll = async (req, res) => {
  const movies = await Movie.find().sort('name')
  res.send(movies)
}

exports.save = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send('Invalid genre.')

  let movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save()
  
  res.send(movie)
}

exports.getById = async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if (!movie) return res.status(404).send('The movie with the given ID was not found.')

  res.send(movie)
}

exports.update = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send('Invalid genre.')

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.')
  
  res.send(movie)
}

exports.delete = async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id)
  if (!movie) return res.status(404).send('The movie with the given ID was not found.')

  res.send(movie)
}