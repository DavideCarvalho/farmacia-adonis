import { middleware } from './kernel.js'

const HealthChecksController = () => import('#controllers/health_checks_controller')

const ApiLoginController = () => import('#controllers/login_controller')
const UsersController = () => import('#controllers/users_controller')

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/login', [ApiLoginController, 'login']).as('login')
    router.post('/logout', [ApiLoginController, 'logout']).as('logout')
    router.post('/users', [UsersController, 'createUser']).as('users.createUser')
  })
  .prefix('/api')
  .as('api')

router.on('/').renderInertia('home')

router.on('/login').renderInertia('login').use(middleware.guest())
router
  .on('/esqueci-minha-senha')
  .renderInertia('esqueci-minha-senha')
  .use(middleware.guest())
  .as('forgotPassword')

router.group(() => {
  router.on('/dashboard').renderInertia('dashboard/index').title('Dashboard')
})

router.get('/health', [HealthChecksController])
