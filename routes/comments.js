const express = require('express')
const router = express.Router()
const Comment = require('../models/comment') // Import Post/Comment model for Mongoose
const Post = require('../models/post')
const User = require('../models/user')

router.post('/:postId', (req, res) => {
  if (!req.user) {
    return res.sendStatus(401)
  }
  const comment = new Comment(req.body)
  comment.author = req.user._id

  comment
    .save()
    .then((comment) => {
      return User.findById(comment.author)
    })
    .then((user) => {
      user.comments.unshift(comment)
      return user.save()
    })
    .then((user) => {
      return Post.findById(req.params.postId)
    })
    .then((post) => {
      post.comments.unshift(comment)
      return post.save()
    })
    .then((post) => {
      return res.redirect(`/posts/${post._id}`)
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
