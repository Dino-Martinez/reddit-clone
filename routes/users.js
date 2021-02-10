const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/sign-up', (req, res) => {
  const currentUser = req.user
  return res.render('sign-up', { currentUser })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/sign-up', (req, res) => {
  // Create User
  const user = new User(req.body)

  user
    .save()
    .then((user) => {
      var token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: '60 days',
      })
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err.message)
    })
})

router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  // Find this user name
  User.findOne({ username }, 'username password')
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: 'Wrong username or password' })
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: 'Wrong username or password' })
        }

        // Create a token
        const token = jwt.sign(
          { _id: user._id, username: user.username },
          process.env.SECRET,
          {
            expiresIn: '60 days',
          }
        )
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
        res.redirect('/')
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/logout', (req, res) => {
  res.clearCookie('nToken')
  res.redirect('/')
})

router.get('/drop-all', (req, res) => {
  User.deleteMany({ username: 'username' }).then(() => {
    res.redirect('/')
  })
})

router.get('/all', (req, res) => {
  User.find({})
    .lean()
    .then((users) => {
      res.send(users)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

module.exports = router
