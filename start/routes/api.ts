import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const { auth } = middleware

router.get('/patients', [auth], '#controllers/patients/list_patients_controller') 