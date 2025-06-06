import router from '@adonisjs/core/services/router'

const HealthChecksController = () => import('#controllers/health_checks_controller')

router.get('/health', [HealthChecksController]).as('api.health')
