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
      return Promise.all([Post.findById(req.params.postId)])
    })
    .then(([post, user]) => {
      post.comments.unshift(comment)
      return Promise.all([post.save()])
    })
    .then((post) => {
      res.redirect(`/posts/${req.params.postId}`)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/:postId/:commentId/replies', (req, res) => {
  var currentUser = req.user
  let post
  Post.findById(req.params.postId)
    .lean()
    .then((p) => {
      post = p
      return Comment.findById(req.params.commentId).lean()
    })
    .then((comment) => {
      res.render('create-reply', { post, comment, currentUser })
    })
    .catch((err) => {
      console.log(err.message)
    })
})

router.post('/:postId/:commentId/replies', (req, res) => {
  const reply = new Comment(req.body)
  reply.author = req.user._id

  Post.findById(req.params.postId).then((post) => {
    Promise.all([reply.save(), Comment.findById(req.params.commentId)])
      .then(([reply, comment]) => {
        comment.comments.unshift(reply._id)

        return Promise.all([comment.save()])
      })
      .then(() => {
        res.redirect(`/posts/${req.params.postId}`)
      })
      .catch(console.error)
    return post.save()
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
