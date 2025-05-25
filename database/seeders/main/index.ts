import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserSeeder from '../user_seeder.js'
import DepartmentSeeder from '../department_seeder.js'
import PatientSeeder from '../patient_seeder.js'
import SupplierSeeder from '../supplier_seeder.js'
import MedicationSeeder from '../medication_seeder.js'
import BatchSeeder from '../batch_seeder.js'
import StockItemSeeder from '../stock_item_seeder.js'
import StockChartSeeder from '../stock_chart_seeder.js'
import MedicationRequestSeeder from '../medication_request_seeder.js'
import DispensationSeeder from '../dispensation_seeder.js'
import PrescriptionSeeder from '../prescription_seeder.js'
import NotificationSeeder from '../notification_seeder.js'

export default class extends BaseSeeder {
  async run() {
    await new UserSeeder(this.client).run()
    await new DepartmentSeeder(this.client).run()
    await new PatientSeeder(this.client).run()
    await new SupplierSeeder(this.client).run()
    await new MedicationSeeder(this.client).run()
    await new BatchSeeder(this.client).run()
    await new StockItemSeeder(this.client).run()
    await new StockChartSeeder(this.client).run()
    await new MedicationRequestSeeder(this.client).run()
    await new DispensationSeeder(this.client).run()
    await new PrescriptionSeeder(this.client).run()
    await new NotificationSeeder(this.client).run()
  }
}
