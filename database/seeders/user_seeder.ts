import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '../factories/user_factory.js'
import { UserRole } from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const adminUsers = await UserFactory.merge({ role: UserRole.ADMIN }).createMany(2)
    const doctorUsers = await UserFactory.merge({ role: UserRole.DOCTOR }).createMany(5)
    const patientUsers = await UserFactory.merge({ role: UserRole.PATIENT }).createMany(10)
    const pharmacistUsers = await UserFactory.merge({ role: UserRole.PHARMACIST }).createMany(3)

    console.log(`Created ${adminUsers.length} admin users`)
    console.log(`Created ${doctorUsers.length} doctor users`)
    console.log(`Created ${patientUsers.length} patient users`)
    console.log(`Created ${pharmacistUsers.length} pharmacist users`)
  }
}
