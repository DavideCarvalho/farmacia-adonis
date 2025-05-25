import factory from '@adonisjs/lucid/factories'
import Batch from '#models/batch'
import { DateTime } from 'luxon'

export const BatchFactory = factory
  .define(Batch, async ({ faker }) => {
    const manufacturingDate = DateTime.now().minus({
      months: faker.number.int({ min: 1, max: 12 }),
    })
    const expirationDate = manufacturingDate.plus({ years: 2 })

    return {
      number: faker.number.int({ min: 10000, max: 99999 }).toString(),
      manufacturingDate,
      expirationDate,
      quantity: faker.number.int({ min: 100, max: 1000 }),
      unitPrice: Number(faker.finance.amount({ min: 1, max: 100, dec: 2 })),
    }
  })
  .build()
