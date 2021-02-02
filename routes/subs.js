const express = require('express')
const router = express.Router()
const Post = require('../models/post') // Import Post model for Mongoose

// SUBREDDIT
router.get('/:subreddit', function (req, res) {
  Post.find({ subreddits: req.params.subreddit })
    .lean()
    .then((posts) => {
      res.render('all-posts', { posts })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
