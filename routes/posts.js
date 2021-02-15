const express = require('express')
const router = express.Router()
const Post = require('../models/post') // Import Post model for Mongoose
const User = require('../models/user')

// Route to display the create post form
router.get('/create', (req, res) => {
  const currentUser = req.user
  return res.render('create-post', { currentUser })
})

// Route to create a post based on a filled out form, and redirect to index page
router.post('/create', (req, res) => {
  if (!req.user) {
    return res.sendStatus(401)
  }

  // INSTANTIATE INSTANCE OF POST MODEL
  const postJson = req.body
  const subredditsString = postJson.subreddits
  const subredditsArray = subredditsString.split(' ')
  postJson.subreddits = subredditsArray

  const post = new Post(postJson)
  post.author = req.user._id

  // SAVE INSTANCE OF POST MODEL TO DB
  post
    .save()
    .then((post) => {
      return User.findById(req.user._id)
    })
    .then((user) => {
      user.posts.unshift(post)
      user.save()
      res.redirect(`/posts/${post._id}`)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// Route to query for a single post and render the display page
router.get('/:postId', (req, res) => {
  const currentUser = req.user
  Post.findById(req.params.postId)
    .lean()
    .populate('comments')
    .then((post) => {
      return res.render('view-post', { post, currentUser })
    })
    .catch((err) => {
      console.log(err.message)
    })
})

router.get('/delete/:postId', (req, res) => {
  Post.findByIdAndDelete(req.params.postId).then((err) => {
    if (err !== null) {
      console.log(err.message)
    }
    return res.redirect('/')
  })
})

module.exports = router
