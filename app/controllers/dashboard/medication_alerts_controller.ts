import type { HttpContext } from '@adonisjs/core/http'
import StockItem from '#models/stock_item'
import Batch from '#models/batch'

export default class MedicationAlertsController {
  async handle({ response }: HttpContext) {
    const [lowStockItems, expiringBatches] = await Promise.all([
      StockItem.query()
        .preload('batch', (query) => {
          query.preload('medication')
        })
        .whereHas('batch', (query) => {
          query.whereHas('medication', (medQuery) => {
            medQuery.whereColumn('medications.min_stock', '>', 'stock_items.quantity')
          })
        })
        .limit(5),
      Batch.query()
        .preload('medication')
        .where('expirationDate', '<=', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) // 30 days
        .where('expirationDate', '>', new Date())
        .limit(5),
    ])

    const alerts = [
      ...lowStockItems.map((item) => ({
        id: item.id,
        medication: item.batch.medication.name,
        type: 'low_stock',
        message: `Estoque baixo - apenas ${item.quantity} unidades restantes`,
        createdAt: item.createdAt,
      })),
      ...expiringBatches.map((batch) => ({
        id: batch.id,
        medication: batch.medication.name,
        type: 'expiring',
        message: `Lote próximo do vencimento - ${Math.ceil((batch.expirationDate.toMillis() - Date.now()) / (24 * 60 * 60 * 1000))} dias restantes`,
        createdAt: batch.createdAt,
      })),
    ].sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())

    return response.json({ alerts })
  }
}
