const express = require('express')
const postRoutes = require('./posts')
const subredditRoutes = require('./subs')
const commentRoutes = require('./comments')
const userRoutes = require('./users')

const router = express.Router()

// Use postRoutes to modularize all post-related routes
router.use('/posts/', postRoutes)
router.use('/n/', subredditRoutes)
router.use('/comments/', commentRoutes)
router.use('/users/', userRoutes)

module.exports = router
