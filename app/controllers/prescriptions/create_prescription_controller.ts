import type { HttpContext } from '@adonisjs/core/http'
import Prescription from '#models/prescription'
import Notification from '#models/notification'
import PrescriptionDto from '#dtos/prescription'

export default class CreatePrescriptionController {
  async handle({ request, response, auth }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized({ message: 'User not authenticated' })
    }

    const data = request.only(['patientId', 'diagnosis', 'medications'])
    const doctorId = auth.user.id

    const prescription = await Prescription.create({
      ...data,
      doctorId,
      status: 'pending',
    })

    // Notificar todos os farmacêuticos
    const pharmacists = await auth.user.related('pharmacists').query()

    for (const pharmacist of pharmacists) {
      await Notification.create({
        pharmacistId: pharmacist.id,
        prescriptionId: prescription.id,
        type: 'prescription_review',
        status: 'unread',
      })
    }

    return new PrescriptionDto(prescription)
  }
}
