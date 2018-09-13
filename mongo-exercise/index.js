const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/mongo-exercises') 
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = mongoose.Schema({
  name: String,
  tags: Array,
  author: String,
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model('courses', courseSchema);

app.get('/api/courses', (req, res) => {
  Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 })
    .then(data => res.json(data))
    .catch(err => res.send(err));
});

app.listen(5000);
