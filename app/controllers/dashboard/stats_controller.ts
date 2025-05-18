import { HttpContext } from '@adonisjs/core/http'
import Medication from '#models/medication'
import StockItem from '#models/stock_item'
import MedicationRequest from '#models/medication_request'
import { RequestStatus } from '#models/medication_request'

export default class StatsController {
  async handle({ response }: HttpContext) {
    const [totalMedications, lowStockItems, pendingRequests] = await Promise.all([
      Medication.query().count('* as total').first(),
      StockItem.query()
        .whereHas('medication', (query) => {
          query.whereColumn('medications.minStock', '>', 'stock_items.currentQuantity')
        })
        .count('* as total')
        .first(),
      MedicationRequest.query().where('status', RequestStatus.PENDING).count('* as total').first(),
    ])

    return response.json({
      totalMedications: Number(totalMedications?.$extras.total || 0),
      lowStockItems: Number(lowStockItems?.$extras.total || 0),
      pendingRequests: Number(pendingRequests?.$extras.total || 0),
      totalSales: 0, // TODO: Implement sales tracking
    })
  }
}
