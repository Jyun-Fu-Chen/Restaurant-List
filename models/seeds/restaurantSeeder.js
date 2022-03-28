const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require("../../config/mongoose")
const Restaurant = require('../restaurant')
const User = require('../user')
const RestaurantList = require('../../restaurant.json').results
const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  //create兩種不一樣的帳戶
  let count = 0
  for (let i = 0; i < SEED_USER.length; i++) {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        email: SEED_USER[i].email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        if (user.email === 'user1@example.com') {
          return Promise.all(Array.from(
            { length: 3 },
            (v, i) => Restaurant.create({
              id: RestaurantList[i].id,
              name: RestaurantList[i].name,
              name_en: RestaurantList[i].name_en,
              category: RestaurantList[i].category,
              image: RestaurantList[i].image,
              location: RestaurantList[i].location,
              phone: RestaurantList[i].phone,
              google_map: RestaurantList[i].google_map,
              rating: RestaurantList[i].rating,
              description: RestaurantList[i].description,
              userId
            })
          ))
        } else {
          return Promise.all(Array.from(
            { length: 3 },
            (v, i) => Restaurant.create({
              id: RestaurantList[i + 3].id,
              name: RestaurantList[i + 3].name,
              name_en: RestaurantList[i + 3].name_en,
              category: RestaurantList[i + 3].category,
              image: RestaurantList[i + 3].image,
              location: RestaurantList[i + 3].location,
              phone: RestaurantList[i + 3].phone,
              google_map: RestaurantList[i + 3].google_map,
              rating: RestaurantList[i + 3].rating,
              description: RestaurantList[i + 3].description,
              userId
            })
          ))
        }
      })
      .then(() => {
        if (count === SEED_USER.length) {
          process.exit()
        }
      })
  }
})
