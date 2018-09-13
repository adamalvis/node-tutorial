const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');

router.get('/', (req, res) => {
  Genre.find()
    .then(genres => res.send(genres))
    .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
  Genre.findOne({ _id: req.params.id })
    .then(genre => res.send(genre))
    .catch(err => res.send(err));
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(formatError(error));

  const genre = new Genre({
    name: req.body.name,
  });

  genre.save()
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

router.put('/:id', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(formatError(error));

  Genre.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, (err, doc) => {
    if (err) return res.send(err);
    res.send(doc);
  });
});

router.delete('/:id', (req, res) => {
  Genre.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.send(err);
    res.send({ msg: 'Genre deleted' });
  });
});

function formatError(error) {
  return { errors: error.details.map(detail => detail.message) };
}

module.exports = router;
