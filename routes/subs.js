const express = require('express')
const router = express.Router()
const Post = require('../models/post') // Import Post model for Mongoose

// SUBREDDIT
router.get('/:subreddit', function (req, res) {
  const currentUser = req.user
  Post.find({ subreddits: req.params.subreddit })
    .lean()
    .populate('author')
    .then((posts) => {
      res.render('all-posts', { posts, currentUser })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
