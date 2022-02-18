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
//為什麼這邊不需要帶forEach之類的迴圈把restaurantList的資料一筆筆新增到資料庫？
//為什麼這樣寫不會導致Database只有一筆Key，json檔裡面的資料全部變成一個Value呢？
})