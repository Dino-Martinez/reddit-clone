/* Mongoose Connection */
const mongoose = require('mongoose')
assert = require('assert')

// Establish connection
const url = 'mongodb://localhost/reddit-db'
mongoose.Promise = global.Promise
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  function (err, db) {
    // Check that connection was established and log
    assert.equal(null, err)
    console.log('Connected successfully to database')

    //db.close()
  }
)
// Send error message any time one occurs
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection Error:')
)

// Debug mode for rich console output
mongoose.set('debug', true)

module.exports = mongoose.connection
