import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Dashboard Controllers
const StatsController = () => import('#controllers/dashboard/stats_controller')
const StockChartController = () => import('#controllers/dashboard/stock_chart_controller')
const MedicationAlertsController = () =>
  import('#controllers/dashboard/medication_alerts_controller')
const MedicationRequestsController = () =>
  import('#controllers/dashboard/medication_requests_controller')
const TopMedicationsController = () => import('#controllers/dashboard/top_medications_controller')
const RecentActivityController = () => import('#controllers/dashboard/recent_activity_controller')

router
  .group(() => {
    router.get('/stats', [StatsController]).as('stats')
    router.get('/stock-chart', [StockChartController]).as('stockChart')
    router.get('/medication-alerts', [MedicationAlertsController]).as('medicationAlerts')
    router.get('/medication-requests', [MedicationRequestsController]).as('medicationRequests')
    router.get('/top-medications', [TopMedicationsController]).as('topMedications')
    router.get('/recent-activity', [RecentActivityController]).as('recentActivity')
  })
  .prefix('/api/dashboard')
  .as('api.dashboard')
  // .middleware(middleware.auth())
