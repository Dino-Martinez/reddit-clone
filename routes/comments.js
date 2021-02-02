const express = require('express')
const router = express.Router()
const Comment = require('../models/comment') // Import Post/Comment model for Mongoose
const Post = require('../models/post')

router.post('/:postId', (req, res) => {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body)

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then((comment) => {
      // REDIRECT TO THE ROOT
      return Post.findById(req.params.postId)
    })
    .then((post) => {
      post.comments.unshift(comment)
      return post.save()
    })
    .then((post) => {
      return res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('', (req, res) => {
  Comment.find({})
    .lean()
    .then((comments) => {
      return res.send(comments)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

router.get('/delete/all', (req, res) => {
  Comment.deleteMany({})
    .then((result) => {
      return res.send('Success')
    })
    .catch((err) => {
      console.log(err.message)
    })
})
module.exports = router
