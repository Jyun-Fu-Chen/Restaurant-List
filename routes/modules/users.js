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
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都要填！" })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼長度不一致' })
    return res.render('register', {
      errors,
      name,
      email,
    })
  }
  User.findOne({ email })
    .then(user => {

      if (user) {
        errors.push({ message: '此用戶已經存在！' })
        res.render('register', {
          errors,
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
  failureRedirect: '/users/login'
}))


router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出！')
  res.redirect('/users/login')
})


module.exports = router
