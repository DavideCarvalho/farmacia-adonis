import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { NotificationFactory } from '../factories/notification_factory.js'
import User from '#models/user'
import Prescription from '#models/prescription'

export default class extends BaseSeeder {
  async run() {
    const pharmacists = await User.query().where('role', 'PHARMACIST')
    const prescriptions = await Prescription.all()

    if (pharmacists.length === 0 || prescriptions.length === 0) {
      console.log('No pharmacists or prescriptions found. Skipping notifications creation.')
      return
    }

    const notifications = await Promise.all(
      prescriptions.map(async (prescription) => {
        const pharmacist = pharmacists[Math.floor(Math.random() * pharmacists.length)]
        return NotificationFactory.merge({
          userId: pharmacist.id,
          prescriptionId: prescription.id,
        }).create()
      })
    )

    console.log(`Created ${notifications.length} notifications`)
  }
} 