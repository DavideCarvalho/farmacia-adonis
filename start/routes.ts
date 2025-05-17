import { middleware } from './kernel.js'

const HealthChecksController = () => import('#controllers/health_checks_controller')
const ApiLoginController = () => import('#controllers/login_controller')
const UsersController = () => import('#controllers/users_controller')

// Dashboard Controllers
const StatsController = () => import('#controllers/dashboard/stats_controller')
const StockChartController = () => import('#controllers/dashboard/stock_chart_controller')
const MedicationAlertsController = () =>
  import('#controllers/dashboard/medication_alerts_controller')
const MedicationRequestsController = () =>
  import('#controllers/dashboard/medication_requests_controller')
const TopMedicationsController = () => import('#controllers/dashboard/top_medications_controller')
const RecentActivityController = () => import('#controllers/dashboard/recent_activity_controller')

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

    // Dashboard endpoints
    router.get('/dashboard/stats', [StatsController, 'handle']).as('dashboard.stats')
    router
      .get('/dashboard/stock-chart', [StockChartController, 'handle'])
      .as('dashboard.stockChart')
    router
      .get('/dashboard/medication-alerts', [MedicationAlertsController, 'handle'])
      .as('dashboard.medicationAlerts')
    router
      .get('/dashboard/medication-requests', [MedicationRequestsController, 'handle'])
      .as('dashboard.medicationRequests')
    router
      .get('/dashboard/top-medications', [TopMedicationsController, 'handle'])
      .as('dashboard.topMedications')
    router
      .get('/dashboard/recent-activity', [RecentActivityController, 'handle'])
      .as('dashboard.recentActivity')
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
