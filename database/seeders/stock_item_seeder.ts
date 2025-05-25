import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { StockItemFactory } from '../factories/stock_item_factory.js'
import Batch from '#models/batch'

export default class extends BaseSeeder {
  async run() {
    const batches = await Batch.all()

    if (batches.length === 0) {
      console.log('No batches found. Skipping stock items creation.')
      return
    }

    const stockItems = await Promise.all(
      batches.map(async (batch) => {
        return StockItemFactory.merge({
          batchId: batch.id,
        }).create()
      })
    )

    console.log(`Created ${stockItems.length} stock items`)
  }
}
