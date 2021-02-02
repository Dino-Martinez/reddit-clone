const express = require('express')
const postRoutes = require('./posts.js')
const subredditRoutes = require('./subs.js')

const router = express.Router()

// Use postRoutes to modularize all post-related routes
router.use('/posts/', postRoutes)
router.use('/n/', subredditRoutes)

module.exports = router
