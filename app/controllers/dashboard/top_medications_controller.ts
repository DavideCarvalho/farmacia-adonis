import type { HttpContext } from '@adonisjs/core/http'
import MedicationRequestItem from '#models/medication_request_item'
import StockItem from '#models/stock_item'
import db from '@adonisjs/lucid/services/db'

export default class TopMedicationsController {
  async handle({ response }: HttpContext) {
    const topMedications = await db
      .from('medication_request_items')
      .join('medications', 'medications.id', 'medication_request_items.medication_id')
      .select(
        'medications.id',
        'medications.name',
        db.raw('SUM(medication_request_items.quantity) as total_requests')
      )
      .groupBy('medications.id', 'medications.name')
      .orderBy('total_requests', 'desc')
      .limit(5)

    const medicationsWithStock = await Promise.all(
      topMedications.map(async (med) => {
        const stockItem = await StockItem.query()
          .join('batches', 'batches.id', 'stock_items.batch_id')
          .where('batches.medication_id', med.id)
          .sum('stock_items.quantity as total_stock')
          .first()

        const lastRequest = await MedicationRequestItem.query()
          .where('medicationId', med.id)
          .orderBy('createdAt', 'desc')
          .first()

        return {
          id: med.id,
          name: med.name,
          totalRequests: Number(med.total_requests),
          stockLevel: Number(stockItem?.$extras.total_stock || 0),
          lastRequested: lastRequest?.createdAt || null,
        }
      })
    )

    return response.json({ medications: medicationsWithStock })
  }
}
