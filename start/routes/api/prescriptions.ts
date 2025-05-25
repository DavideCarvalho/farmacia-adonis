import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const ListPrescriptionsController = () =>
  import('#controllers/prescriptions/list_prescriptions_controller')
const CreatePrescriptionController = () =>
  import('#controllers/prescriptions/create_prescription_controller')
const ShowPrescriptionController = () =>
  import('#controllers/prescriptions/show_prescription_controller')
const ReviewPrescriptionController = () =>
  import('#controllers/prescriptions/review_prescription_controller')

router
  .group(() => {
    router.get('/', [ListPrescriptionsController]).as('list')
    router.post('/', [CreatePrescriptionController]).as('create')
    router.get('/:id', [ShowPrescriptionController]).as('show')
    router.post('/:id/review', [ReviewPrescriptionController]).as('review')
  })
  .prefix('/api/prescriptions')
  .as('api.prescriptions')
// .use(middleware.auth())
