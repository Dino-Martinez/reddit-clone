const express = require('express')
const postRoutes = require('./posts.js')

const router = express.Router()

// Use postRoutes to modularize all post-related routes
router.use('/posts/', postRoutes)

module.exports = router
