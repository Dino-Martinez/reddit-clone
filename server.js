const express = require('express')
const router = require('./routes/index.js')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const connection = require('./data/reddit-db')
const Post = require('./models/post')

// App Setup
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

// Middleware
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(router)

app.get('', (req, res) => {
  Post.find({})
    .lean()
    .then((posts) => {
      res.render('posts-index', { posts })
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// Start Server
app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!')
})
