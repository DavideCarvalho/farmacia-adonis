import factory from '@adonisjs/lucid/factories'
import MedicationRequestItem from '#models/medication_request_item'

export const MedicationRequestItemFactory = factory
  .define(MedicationRequestItem, async ({ faker }) => {
    return {
      quantity: faker.number.int({ min: 1, max: 100 }),
    }
  })
  .build()
