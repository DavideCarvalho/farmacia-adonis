import { BaseSeeder } from '@adonisjs/lucid/seeders'
import StockItem from '#models/stock_item'
import Batch from '#models/batch'
import { v7 } from 'uuid'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Buscar todos os lotes
    const batches = await Batch.all()

    if (batches.length === 0) {
      console.log('Nenhum lote encontrado. Pulando seeder de histórico de estoque.')
      return
    }

    const stockItems = []

    // Para cada lote, criar itens de estoque para os últimos 6 meses
    for (const batch of batches) {
      // Criar um item de estoque para cada mês dos últimos 6 meses
      for (let i = 0; i < 6; i++) {
        const date = DateTime.now().minus({ months: i })
        
        // Quantidade aleatória entre 100 e 1000
        const quantity = Math.floor(Math.random() * 900) + 100

        stockItems.push({
          id: v7(),
          batchId: batch.id,
          quantity,
          location: 'Prateleira A',
          active: true,
          createdAt: date.toSQL(),
          updatedAt: date.toSQL(),
        })
      }
    }

    await StockItem.createMany(stockItems)
  }
} 