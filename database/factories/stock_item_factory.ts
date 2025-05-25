import factory from '@adonisjs/lucid/factories'
import StockItem from '#models/stock_item'

const locations = [
  'Prateleira A1',
  'Prateleira A2',
  'Prateleira B1',
  'Prateleira B2',
  'Geladeira 1',
  'Geladeira 2',
  'Armário 1',
  'Armário 2',
  'Caixa 1',
  'Caixa 2',
]

export const StockItemFactory = factory
  .define(StockItem, async ({ faker }) => {
    return {
      quantity: faker.number.int({ min: 0, max: 1000 }),
      location: faker.helpers.arrayElement(locations),
      active: true,
    }
  })
  .build()
