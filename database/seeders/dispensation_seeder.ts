import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DispensationFactory } from '../factories/dispensation_factory.js'
import { DispensationItemFactory } from '../factories/dispensation_item_factory.js'
import Department from '#models/department'
import User from '#models/user'
import Medication from '#models/medication'
import StockItem from '#models/stock_item'
import MedicationRequest from '#models/medication_request'
import Batch from '#models/batch'

export default class extends BaseSeeder {
  async run() {
    const departments = await Department.all()
    const users = await User.all()
    const medications = await Medication.all()
    const stockItems = await StockItem.all()
    const medicationRequests = await MedicationRequest.all()
    const batches = await Batch.all()

    if (
      departments.length === 0 ||
      users.length === 0 ||
      medications.length === 0 ||
      stockItems.length === 0 ||
      medicationRequests.length === 0 ||
      batches.length === 0
    ) {
      console.log(
        'No departments, users, medications, stock items, medication requests or batches found. Skipping dispensations creation.'
      )
      return
    }

    const dispensations = await Promise.all(
      departments.map(async (department) => {
        const dispensedBy = users[Math.floor(Math.random() * users.length)]
        const receivedBy = users[Math.floor(Math.random() * users.length)]
        const medicationRequest = medicationRequests[Math.floor(Math.random() * medicationRequests.length)]

        const dispensation = await DispensationFactory.merge({
          departmentId: department.id,
          dispensedById: dispensedBy.id,
          receivedById: receivedBy.id,
          requestId: medicationRequest.id,
        }).create()

        // Criar 2-4 itens para cada dispensation
        const numItems = Math.floor(Math.random() * 3) + 2
        const items = await Promise.all(
          Array(numItems)
            .fill(null)
            .map(async () => {
              const medication = medications[Math.floor(Math.random() * medications.length)]
              const stockItem = stockItems[Math.floor(Math.random() * stockItems.length)]
              const batch = batches[Math.floor(Math.random() * batches.length)]
              return DispensationItemFactory.merge({
                dispensationId: dispensation.id,
                medicationId: medication.id,
                stockItemId: stockItem.id,
                batchId: batch.id,
              }).create()
            })
        )

        return { dispensation, items }
      })
    )

    console.log(`Created ${dispensations.length} dispensations with items`)
  }
}
