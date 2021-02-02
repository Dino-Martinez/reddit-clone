const express = require('express')
const router = require('./routes/index.js')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const connection = require('./data/reddit-db')
const Post = require('./models/post')

// App Setup
const app = express()

// Middleware
// Use css/other static files
app.use(express.static('public'))

// Use body parser for rich json experience
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Use express validator for sanitizing string inputs
app.use(expressValidator())

// Use handlebars for templating
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Use router for modularization of code
app.use(router)

// Home route
app.get('', (req, res) => {
  Post.find({})
    .lean()
    .then((posts) => {
      res.render('all-posts', { posts })
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
