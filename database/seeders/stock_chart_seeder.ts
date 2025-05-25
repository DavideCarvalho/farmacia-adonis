import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { StockMovementFactory } from '../factories/stock_movement_factory.js'
import StockItem from '#models/stock_item'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const stockItems = await StockItem.all()
    const users = await User.all()

    if (stockItems.length === 0 || users.length === 0) {
      console.log('No stock items or users found. Skipping stock movements creation.')
      return
    }

    const movements = await Promise.all(
      stockItems.map(async (stockItem) => {
        const user = users[Math.floor(Math.random() * users.length)]
        return StockMovementFactory.merge({
          stockItemId: stockItem.id,
          userId: user.id,
        }).create()
      })
    )

    console.log(`Created ${movements.length} stock movements`)
  }
}
