const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')


//登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//註冊頁面
router.get('/register', (req, res) => {

  res.render('register',)
})

//註冊請求
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    console.log('密碼不一致，請重新輸入！')
    return res.render('register', {
      name,
      email,
    })
  }
  User.findOne({ email })
    .then(user => {

      if (user) {
        console.log('User already exists')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/register'
}))


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})


module.exports = router
