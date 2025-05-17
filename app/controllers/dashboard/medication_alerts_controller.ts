import { HttpContext } from '@adonisjs/core/http'
import StockItem from '#models/stock_item'
import Medication from '#models/medication'
import Batch from '#models/batch'

export default class MedicationAlertsController {
  async handle({ response }: HttpContext) {
    const [lowStockItems, expiringBatches] = await Promise.all([
      StockItem.query()
        .preload('medication')
        .whereHas('medication', (query) => {
          query.whereColumn('medications.minStock', '>', 'stock_items.currentQuantity')
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
        medication: item.medication.name,
        type: 'low_stock',
        message: `Estoque baixo - apenas ${item.currentQuantity} unidades restantes`,
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