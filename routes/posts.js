const express = require('express')
const router = express.Router()
const Post = require('../models/post')

router.get('/new', (req, res) => {
  res.render('posts-new')
})

router.post('/new', (req, res) => {
  // INSTANTIATE INSTANCE OF POST MODEL
  const post = new Post(req.body)

  // SAVE INSTANCE OF POST MODEL TO DB
  post.save((err, post) => {
    // REDIRECT TO THE ROOT
    return res.render('home')
  })
})

module.exports = router
