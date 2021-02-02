const express = require('express')
const router = express.Router()
const Post = require('../models/post')

router.get('/create', (req, res) => {
  res.render('create-post')
})

router.post('/create', (req, res) => {
  // INSTANTIATE INSTANCE OF POST MODEL
  const post = new Post(req.body)

  // SAVE INSTANCE OF POST MODEL TO DB
  post.save((err, post) => {
    // REDIRECT TO THE ROOT
    res.redirect('/')
  })
})

router.get('/:postId', (req, res) => {
  console.log('Searching for post...')
  Post.findById(req.params.postId)
    .lean()
    .then((post) => {
      res.render('view-post', { post })
    })
    .catch((err) => {
      console.log(err.message)
    })
})

module.exports = router
