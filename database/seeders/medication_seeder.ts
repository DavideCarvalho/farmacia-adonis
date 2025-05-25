import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { MedicationFactory } from '../factories/medication_factory.js'

export default class extends BaseSeeder {
  async run() {
    const medications = await MedicationFactory.createMany(10)
    console.log(`Created ${medications.length} medications`)
  }
}
