const express =  require('express');
const router = express.Router();
const item_controller = require('./controllers/item_controller');
const restaurant_controller = require('./controllers/restaurant_controller');
const user_controller = require('./controllers/user_controller')
const middlewares = require('./middlewares/middlewares');

//Restaurant Endpoints
router.post('/restaurants', middlewares.checkToken, middlewares.validateName, middlewares.validateAddress ,restaurant_controller.create)
router.get('/restaurants/:id', middlewares.checkToken, restaurant_controller.getOne)
router.get('/restaurants', middlewares.checkToken, restaurant_controller.getAll)
router.put('/restaurants', middlewares.checkToken, middlewares.validateId, middlewares.validateName, middlewares.validateAddress, restaurant_controller.update)
router.delete('/restaurants/:id', middlewares.checkToken, restaurant_controller.destroy)

//Items Endpoints
router.post('/items', middlewares.checkToken, middlewares.validateName, middlewares.validateDescription, middlewares.validatePrice ,item_controller.create)
router.get('/items/:id', middlewares.checkToken, item_controller.getOne)
router.get('/restaurant/:id/items', middlewares.checkToken, item_controller.getAll_by_restaurant)
router.put('/items', middlewares.checkToken, middlewares.validateId, middlewares.validateName, middlewares.validateDescription, middlewares.validatePrice, item_controller.update)
router.delete('/items/:id', middlewares.checkToken, item_controller.destroy)

//User Endpoints
router.post('/user/register', middlewares.validateEmail, middlewares.validatePassword, user_controller.create)
router.get('/user/:id', middlewares.checkToken, user_controller.getOne)
router.get('/users', middlewares.checkToken, user_controller.getAll)
router.put('/users', middlewares.checkToken, middlewares.validateId, middlewares.validateEmail, middlewares.validatePassword, user_controller.update)
router.delete('/user/:id', middlewares.checkToken, user_controller.destroy)
router.post('/user/auth/login', middlewares.validateEmail, middlewares.validatePassword, user_controller.login)

module.exports = router 