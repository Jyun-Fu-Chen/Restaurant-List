const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const session = require('express-session')

const Restaurant = require('./models/restaurant')
const routes = require('./routes')
require('./config/mongoose')

app.use(session({
  secret: 'MyRestaurantSecret',
  resave: false,
  saveUninitialized: true
}))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)



app.listen(port, () => {
  console.log(`express is listening localhost:${port}`)
})
