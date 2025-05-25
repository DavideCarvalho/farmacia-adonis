import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { BatchFactory } from '../factories/batch_factory.js'
import Medication from '#models/medication'
import Supplier from '#models/supplier'

export default class extends BaseSeeder {
  async run() {
    const medications = await Medication.all()
    const suppliers = await Supplier.all()

    if (medications.length === 0 || suppliers.length === 0) {
      console.log('No medications or suppliers found. Skipping batch creation.')
      return
    }

    const batches = await Promise.all(
      medications.map(async (medication) => {
        const supplier = suppliers[Math.floor(Math.random() * suppliers.length)]
        return BatchFactory.merge({
          medicationId: medication.id,
          supplierId: supplier.id,
        }).create()
      })
    )

    console.log(`Created ${batches.length} batches`)
  }
}
