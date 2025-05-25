import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { MedicationRequestFactory } from '../factories/medication_request_factory.js'
import { MedicationRequestItemFactory } from '../factories/medication_request_item_factory.js'
import Department from '#models/department'
import User from '#models/user'
import Medication from '#models/medication'

export default class extends BaseSeeder {
  async run() {
    const departments = await Department.all()
    const users = await User.all()
    const medications = await Medication.all()

    if (departments.length === 0 || users.length === 0 || medications.length === 0) {
      console.log(
        'No departments, users or medications found. Skipping medication requests creation.'
      )
      return
    }

    const requests = await Promise.all(
      departments.map(async (department) => {
        const requestedBy = users[Math.floor(Math.random() * users.length)]
        const approvedBy = users[Math.floor(Math.random() * users.length)]

        const request = await MedicationRequestFactory.merge({
          departmentId: department.id,
          requestedById: requestedBy.id,
          approvedById: approvedBy.id,
        }).create()

        // Criar 2-4 itens para cada solicitação
        const numItems = Math.floor(Math.random() * 3) + 2
        const items = await Promise.all(
          Array(numItems)
            .fill(null)
            .map(async () => {
              const medication = medications[Math.floor(Math.random() * medications.length)]
              return MedicationRequestItemFactory.merge({
                medicationRequestId: request.id,
                medicationId: medication.id,
              }).create()
            })
        )

        return { request, items }
      })
    )

    console.log(`Created ${requests.length} medication requests with items`)
  }
}
