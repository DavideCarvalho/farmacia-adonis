import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DepartmentFactory } from '../factories/department_factory.js'

export default class extends BaseSeeder {
  async run() {
    const departments = await DepartmentFactory.createMany(5)
    console.log(`Created ${departments.length} departments`)
  }
}
