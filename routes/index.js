const express = require('express')
const postRoutes = require('./posts.js')

const router = express.Router()

router.use('/posts/', postRoutes)

module.exports = router
