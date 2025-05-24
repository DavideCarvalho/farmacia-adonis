import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.post('/users', [UsersController, 'createUser']).as('users.createUser')
  })
  .prefix('/api/users')
  .as('api.users')
  // .middleware(middleware.auth())
