import type { HttpContext } from '@adonisjs/core/http'
import MedicationRequest from '#models/medication_request'
import { RequestStatus } from '#models/medication_request'

export default class MedicationRequestsController {
  async handle({ response }: HttpContext) {
    const requests = await MedicationRequest.query()
      .preload('requestedBy')
      .preload('approvedBy')
      .preload('department')
      .preload('items', (query) => {
        query.preload('medication')
      })
      .where('status', RequestStatus.PENDING)
      .orderBy('createdAt', 'desc')
      .limit(5)

    return response.json({
      requests: requests.map((request) => ({
        id: request.id,
        medication: request.items[0]?.medication.name || 'Múltiplos medicamentos',
        quantity: request.items.reduce((sum, item) => sum + item.quantity, 0),
        status: request.status,
        priority: request.priority,
        requestedBy: request.requestedBy.fullName,
        department: request.department.name,
        createdAt: request.createdAt,
        approvedBy: request.approvedBy?.fullName,
        rejectionReason: request.rejectionReason,
        items: request.items.map((item) => ({
          medication: item.medication.name,
          quantity: item.quantity,
          notes: item.notes,
        })),
      })),
    })
  }
}
