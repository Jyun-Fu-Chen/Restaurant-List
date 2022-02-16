const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

const exphbs = require('express-handlebars')


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
  console.log(restaurantFiltered)
  res.render('show', {restaurants: restaurantFiltered[0]})

})

app.listen(port,()=>{
  console.log(`express is listening localhost:${port}`)
})
