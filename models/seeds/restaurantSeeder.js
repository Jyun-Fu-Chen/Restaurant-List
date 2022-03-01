const db = require("../../config/mongoose")
const Restaurant = require('../restaurant')
const RestaurantList = require('../../restaurant.json').results

db.once('open', () => {
Restaurant.create(RestaurantList);
console.log('done!')
})