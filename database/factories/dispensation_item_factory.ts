import factory from '@adonisjs/lucid/factories'
import DispensationItem from '#models/dispensation_item'

export const DispensationItemFactory = factory
  .define(DispensationItem, async ({ faker }) => {
    return {
      quantity: faker.number.int({ min: 1, max: 100 }),
    }
  })
  .build()
