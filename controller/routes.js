const express = require('express');
const router = express.Router();

const Movies= require('../models/Movie')

router.get('/api/movies', (req, res) => {
  Movies.find({})
  .then((data) => {
    return res.json(data)
  })
  .catch((err) => {
    return res.json('Error occured')
  })
})


router.post('/newMovie', (req, res) => {
  Movies.create(req.body)
  .then(() => {
    return res.json('Movie Added')
  })
  .catch((err) => {
    return res.json('An error Occurred')
  })
})


module.exports = router;