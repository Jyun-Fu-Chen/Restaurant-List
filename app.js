const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const db = mongoose.connection
const restaurantList = require('./restaurant.json')

const exphbs = require('express-handlebars')
const req = require('express/lib/request')


mongoose.connect('mongodb://localhost/restaurant-list')
db.on('error', ()=>{
  console.log('mongodb error!')
})
db.once('open',()=>{
  console.log('mongodb connected!')
})

app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.get('/',(req, res)=>{
  const restaurant = restaurantList.results
  res.render('index',{restaurants: restaurant})
})
app.get('/restaurants/:restaurant_id',(req,res)=>{
  console.log(req.params.restaurant_id)
  const restaurantFiltered = restaurantList.results.filter((restaurant)=>restaurant.id === Number(req.params.restaurant_id))
  res.render('show', {restaurants: restaurantFiltered[0]})
})
app.get('/search',(req,res)=>{
  const keyword = req.query.keyword.toLowerCase()
  const restaurant = restaurantList.results.filter(function (item){
    if (item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)){
    return item
  }
})
  res.render('index', { restaurants: restaurant })
})


app.listen(port,()=>{
  console.log(`express is listening localhost:${port}`)
})
