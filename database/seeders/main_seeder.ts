import { BaseSeeder } from '@adonisjs/lucid/seeders'
import DepartmentSeeder from './department_seeder.js'
import SupplierSeeder from './supplier_seeder.js'
import MedicationSeeder from './medication_seeder.js'
import UserSeeder from './user_seeder.js'

export default class extends BaseSeeder {
  async run() {
    // Primeiro criamos os departamentos
    await new DepartmentSeeder(this.client).run()

    // Depois os fornecedores
    await new SupplierSeeder(this.client).run()

    // Em seguida os medicamentos
    await new MedicationSeeder(this.client).run()

    // Por último os usuários, pois eles podem depender dos departamentos
    await new UserSeeder(this.client).run()
  }
}
