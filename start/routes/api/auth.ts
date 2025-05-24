import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ApiLoginController = () => import('#controllers/login_controller')

router
  .group(() => {
    router.post('/login', [ApiLoginController, 'login']).as('login')
    router.post('/logout', [ApiLoginController, 'logout']).as('logout')
  })
  .prefix('/api/auth')
  .as('api.auth')
  .middleware(middleware.guest())
