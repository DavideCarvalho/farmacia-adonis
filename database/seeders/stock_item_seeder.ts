import { BaseSeeder } from '@adonisjs/lucid/seeders'
import StockItem from '#models/stock_item'
import Batch from '#models/batch'
import { v7 } from 'uuid'

export default class extends BaseSeeder {
  async run() {
    // Buscar todos os lotes
    const batches = await Batch.all()

    if (batches.length === 0) {
      console.log('Nenhum lote encontrado. Pulando seeder de itens de estoque.')
      return
    }

    const stockItems = []

    // Para cada lote, criar um item de estoque
    for (const batch of batches) {
      stockItems.push({
        id: v7(),
        batchId: batch.id,
        quantity: batch.quantity,
        location: 'Prateleira A',
        active: true,
      })
    }

    await StockItem.createMany(stockItems)
  }
} 