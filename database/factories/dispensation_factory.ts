import factory from '@adonisjs/lucid/factories'
import Dispensation from '#models/dispensation'

export const DispensationFactory = factory
  .define(Dispensation, async ({ faker }) => {
    return {
      requestId: faker.helpers.maybe(() => faker.string.uuid(), { probability: 0.3 }),
      dispensedById: faker.string.uuid(),
    }
  })
  .build()
