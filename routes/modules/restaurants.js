const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//搜尋功能
router.get('/search', (req, res) => {
  const keyword = req.query.keywords.toLowerCase()
  if (keyword.length === 0) {
    return res.redirect("/")
  }
  return Restaurant.find()
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
router.get("/new", (req, res) => {
  return res.render('new')
})
//新增餐廳功能
router.post("/", (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error })
    })
})

//詳細頁面功能
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error })
    })
})


//編輯頁面
router.get('/:restaurant_id/edit', (req, res) => {
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
router.put('/:restaurant_id', (req, res) => {
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
router.delete("/:restaurant_id", (req, res) => {
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

module.exports = router