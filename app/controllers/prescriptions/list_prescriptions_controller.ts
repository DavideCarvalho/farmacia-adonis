import type { HttpContext } from '@adonisjs/core/http'
import Prescription from '#models/prescription'
import PrescriptionDto from '#dtos/prescription'

export default class ListPrescriptionsController {
  async handle({ response, auth }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized({ message: 'User not authenticated' })
    }

    const prescriptions = await Prescription.query()
      .where('doctor_id', auth.user.id)
      .preload('patient')
      .orderBy('created_at', 'desc')

    return PrescriptionDto.fromArray(prescriptions)
  }
}
