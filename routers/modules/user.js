const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if ( !name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填'})
  }
  if ( password !== confirmPassword ) {
    errors.push({ message: '密碼與確認密碼不相符！'})
  }
  if (errors.length) {
    return res.render('register', { ...req.body, errors})
  }
  User.findOne({ email })
    .then(user => {
      if(user) {
        errors.push({ message: '這個Email已經註冊過了'})
        return res.render('register', { ...req.body, errors })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then( async (hash) => await User.create({ name, email, password: hash}))
        .then(() => res.redirect('/'))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  res.redirect('/user/login')
})

module.exports = router
