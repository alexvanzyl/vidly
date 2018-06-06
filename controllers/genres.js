const { Genre, validate } = require('../models/genre')

exports.getAll = async (req, res) => {
  const genres = await Genre.find()
  res.send(genres)
}

exports.save = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({ name: req.body.name })
  genre = await genre.save()
  
  res.send(genre)
}

exports.getById = async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('Genre with the given ID was not found!')

  res.send(genre)
}

exports.update = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  })

  if (!genre) return res.status(404).send('Genre with the given ID was not found!')

  res.send(genre);
}

exports.delete = async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if (!genre) return res.status(404).send('Genre with the given ID was not found!')

  res.send(genre);
}