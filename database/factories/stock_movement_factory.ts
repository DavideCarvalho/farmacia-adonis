import factory from '@adonisjs/lucid/factories'
import StockMovement from '#models/stock_movement'

const types = ['ENTRY', 'EXIT', 'ADJUSTMENT'] as const

export const StockMovementFactory = factory
  .define(StockMovement, async ({ faker }) => {
    const type = faker.helpers.arrayElement(types)
    const quantity = faker.number.int({ min: 1, max: 100 })

    return {
      type,
      quantity: type === 'ENTRY' ? quantity : -quantity,
      reason: faker.lorem.sentence(),
    }
  })
  .build()
