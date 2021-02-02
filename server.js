const express = require('express')

// App Setup
const app = express()
app.use(express.static('public'))

// Middleware
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('', (req, res) => {
  res.render('home')
})

// Start Server
app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!')
})
