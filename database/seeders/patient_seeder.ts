import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { PatientFactory } from '../factories/patient_factory.js'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const user = await User.first()
    if (!user) {
      console.log('No users found. Skipping patient creation.')
      return
    }

    const patients = await Promise.all(
      Array(10)
        .fill(null)
        .map(() => PatientFactory.merge({ userId: user.id }).create())
    )

    console.log(`Created ${patients.length} patients`)
  }
}
