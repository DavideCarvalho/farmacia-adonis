import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.on('/').renderInertia('home').use(middleware.guest()).as('home')
    router.on('/login').renderInertia('home').use(middleware.guest()).as('login')

    router
      .on('/esqueci-minha-senha')
      .renderInertia('esqueci-minha-senha')
      .use(middleware.guest())
      .as('forgotPassword')

    router.on('/dashboard').renderInertia('dashboard/index').title('Dashboard').as('dashboard')
  })
  .as('web')
