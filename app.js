const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const db = mongoose.connection
const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant-list')
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.get('/', (req, res) => {
  // 拿到全部資料
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error })
    })
})

//詳細頁面功能
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error })
    })
})

//搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keywords.toLowerCase()
  if (keyword.length === 0) {
    return res.redirect("/")
  }

  Restaurant.find()
    .lean()
    .then(restaurant => {
      const filterRestaurant = restaurant.filter(data => data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword)
      )
      res.render("index", { restaurant: filterRestaurant })
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error })
    })
})

//新增餐廳頁面
app.get("/go_new_page", (req, res) => {
  return res.render('new')
})
//新增餐廳功能
app.post("/new_restaurant", (req, res) => {
  const new_restaurant = req.body.name
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error })
    })
})



//編輯頁面
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error })
    })
})
//編輯功能
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const data = req.body
  return Restaurant.findById(id)
    //不知道以下有沒有更好的寫法...
    .then(restaurant => {
      restaurant.name = data.name
      restaurant.name_en = data.name_en
      restaurant.category = data.category
      restaurant.image = data.image
      restaurant.location = data.location
      restaurant.phone = data.phone
      restaurant.google_map = data.google_map
      restaurant.rating = data.rating
      restaurant.description = data.description
      // Object.values(restaurant) = Object.values(data)
      return restaurant.save()
    })
    .then(() => {
      res.redirect(`/restaurants/${id}`)
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error })
    })
})


// 刪除功能
app.post("/restaurants/:restaurant_id/delete", (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error })
    })

})


app.listen(port, () => {
  console.log(`express is listening localhost:${port}`)
})
