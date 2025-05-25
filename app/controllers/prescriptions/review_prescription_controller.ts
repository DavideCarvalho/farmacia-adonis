import type { HttpContext } from '@adonisjs/core/http'
import Prescription from '#models/prescription'
import Notification from '#models/notification'
import PrescriptionDto from '#dtos/prescription'

export default class ReviewPrescriptionController {
  async handle({ request, response, auth, params }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized({ message: 'User not authenticated' })
    }

    const prescription = await Prescription.findOrFail(params.id)
    const { status, notes } = request.only(['status', 'notes'])

    prescription.status = status
    prescription.pharmacistNotes = notes
    await prescription.save()

    // Marcar notificação como lida
    await Notification.query()
      .where('prescription_id', prescription.id)
      .where('pharmacist_id', auth.user.id)
      .update({ status: 'read' })

    return new PrescriptionDto(prescription)
  }
}
