const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const db = mongoose.connection
const restaurantList = require('../../restaurant.json').results
mongoose.connect('mongodb://localhost/restaurant-list')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
Restaurant.create(restaurantList);
console.log('done!')
//問題：這邊不需要帶forEach之類的迴圈進去把資料一筆筆新增到資料庫嗎？
})