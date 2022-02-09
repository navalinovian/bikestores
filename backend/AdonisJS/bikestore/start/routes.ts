/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' };
})

Route.group(()=>{
  Route.resource('/brand', 'BrandsController').apiOnly()
  Route.resource('/category', 'CategoriesController').apiOnly()
  Route.resource('/product', 'ProductsController').apiOnly()
  Route.resource('/store', 'StoresController').apiOnly()

  Route.get('/stock/:product/:store?','StocksController.show')
  Route.post('/stock','StocksController.addStock')


  Route.post('/register','UsersController.register')
  Route.get('/user/index','UsersController.index')
  Route.get('/user/:id','UsersController.show')
  Route.patch('/user/:id','UsersController.update')
  Route.delete('/user/:id','UsersController.destroy')

  Route.post('/login','AuthController.login')
}).prefix('/api');
