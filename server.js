const express = require('express')
const router = require('./routes/index.js')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const connection = require('./data/reddit-db')
const Post = require('./models/post')
require('dotenv').config()
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

// App Setup
const app = express()

// Middleware
// Use css/other static files
app.use(express.static('public'))

// Use web tokens for authentication
app.use(cookieParser())

// Use body parser for rich json experience
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Use express validator for sanitizing string inputs
app.use(expressValidator())

// Use handlebars for templating
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Middleware for checking user authentication
const checkAuth = (req, res, next) => {
  if (
    typeof req.cookies.nToken === 'undefined' ||
    req.cookies.nToken === null
  ) {
    req.user = null
  } else {
    var token = req.cookies.nToken
    var decodedToken = jwt.decode(token, { complete: true }) || {}
    req.user = decodedToken.payload
  }

  next()
}

app.use(checkAuth)

// Use router for modularization of code
app.use(router)

// Home route
app.get('/', (req, res) => {
  const currentUser = req.user
  Post.find({})
    .lean()
    .populate('author')
    .then((posts) => {
      res.render('all-posts', { posts, currentUser })
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// Start Server
app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!')
})

module.exports = app
