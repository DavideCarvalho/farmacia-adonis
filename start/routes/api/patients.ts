import router from '@adonisjs/core/services/router'

const ListPatientsController = () => import('#controllers/patients/list_patients_controller')

router
  .group(() => {
    router.get('/', [ListPatientsController]).as('list')
  })
  .prefix('/api/patients')
  .as('api.patients')
// .middleware(middleware.auth())
