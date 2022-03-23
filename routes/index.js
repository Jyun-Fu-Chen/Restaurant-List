const express = require('express')
const router = express.Router()


const home = require('./modules/home')
const restaurant = require('./modules/restaurants')
const user = require('./modules/users')
const {authenticator} = require('../middleware/auth')
const auth = require('./modules/auth')

router.use('/restaurants', authenticator,restaurant)
router.use('/users', user)
router.use('/auth',auth)
router.use('/', authenticator, home)


module.exports = router