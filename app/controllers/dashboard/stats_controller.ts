import type { HttpContext } from '@adonisjs/core/http'
import Medication from '#models/medication'
import StockItem from '#models/stock_item'
import MedicationRequest from '#models/medication_request'
import { RequestStatus } from '#models/medication_request'
import db from '@adonisjs/lucid/services/db'

export default class StatsController {
  async handle({ response }: HttpContext) {
    const [totalMedications, lowStockItems, pendingRequests, monthlyStockQuantities] =
      await Promise.all([
        Medication.query().count('* as total').first(),
        StockItem.query()
          .whereHas('batch', (query) => {
            query.whereHas('medication', (medQuery) => {
              medQuery.whereColumn('medications.min_stock', '>', 'stock_items.quantity')
            })
          })
          .count('* as total')
          .first(),
        MedicationRequest.query()
          .where('status', RequestStatus.PENDING)
          .count('* as total')
          .first(),
        db
          .from('stock_items')
          .select(db.raw("DATE_TRUNC('month', created_at) as month"))
          .sum('quantity as total_quantity')
          .groupBy('month')
          .orderBy('month', 'desc')
          .limit(12),
      ])

    return response.json({
      totalMedications: Number(totalMedications?.$extras.total || 0),
      lowStockItems: Number(lowStockItems?.$extras.total || 0),
      pendingRequests: Number(pendingRequests?.$extras.total || 0),
      totalSales: 0, // TODO: Implement sales tracking
      monthlyStockQuantities: monthlyStockQuantities.map((item) => ({
        month: item.month,
        totalQuantity: Number(item.total_quantity),
      })),
    })
  }
}
