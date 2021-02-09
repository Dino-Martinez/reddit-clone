const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/sign-up', (req, res) => {
  return res.render('sign-up')
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

router.get('/logout', (req, res) => {
  res.clearCookie('nToken')
  res.redirect('/')
})

module.exports = router
