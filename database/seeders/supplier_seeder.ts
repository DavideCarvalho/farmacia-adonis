import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { SupplierFactory } from '../factories/supplier_factory.js'

export default class extends BaseSeeder {
  async run() {
    const suppliers = await SupplierFactory.createMany(10)
    console.log(`Created ${suppliers.length} suppliers`)
  }
}
