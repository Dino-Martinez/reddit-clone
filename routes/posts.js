const express = require('express')
const router = express.Router()
const Post = require('../models/post') // Import Post model for Mongoose

// Route to display the create post form
router.get('/create', (req, res) => {
  return res.render('create-post')
})

// Route to create a post based on a filled out form, and redirect to index page
router.post('/create', (req, res) => {
  // INSTANTIATE INSTANCE OF POST MODEL
  const postJson = req.body
  const subredditsString = postJson.subreddits
  const subredditsArray = subredditsString.split(' ')
  postJson.subreddits = subredditsArray
  const post = new Post(postJson)

  // SAVE INSTANCE OF POST MODEL TO DB
  post.save((err, post) => {
    // REDIRECT TO THE ROOT
    return res.redirect('/')
  })
})

// Route to query for a single post and render the display page
router.get('/:postId', (req, res) => {
  Post.findById(req.params.postId)
    .lean()
    .populate('comments')
    .then((post) => {
      return res.render('view-post', { post })
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
