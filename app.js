const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const db = mongoose.connection
const restaurantList = require('./restaurant.json')

const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

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
  // 拿到全部資料
  Restaurant.find()
  .lean()
  .then(restaurant => res.render('index', { restaurant }))
  .catch(error => console.log(error))
})

//詳細頁面功能
app.get('/restaurants/:restaurant_id',(req,res)=>{
const id = req.params.restaurant_id
  return Restaurant.findById(id)
  .lean()
    .then(restaurant => res.render('show', {restaurant}))
    .catch(error => console.log(error))
  // const restaurantFiltered = restaurantList.results.filter((restaurant)=>restaurant.id === Number(req.params.restaurant_id))
  // res.render('show', {restaurants: restaurantFiltered[0]})
})

//搜尋功能
app.get('/search',(req,res)=>{
  const keyword = req.query.keyword.toLowerCase()
  const restaurant = restaurantList.results.filter(function (item){
    if (item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)){
    return item
  }
})
  res.render('index', { restaurants: restaurant })
})
//編輯功能

//新增餐廳功能

// 刪除功能


app.listen(port,()=>{
  console.log(`express is listening localhost:${port}`)
})
