import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { PrescriptionFactory } from '../factories/prescription_factory.js'
import User from '#models/user'
import Patient from '#models/patient'

export default class extends BaseSeeder {
  async run() {
    const doctors = await User.query().where('role', 'PHARMACIST')
    const patients = await Patient.all()

    if (doctors.length === 0 || patients.length === 0) {
      console.log('No doctors or patients found. Skipping prescriptions creation.')
      return
    }

    const prescriptions = await Promise.all(
      patients.map(async (patient) => {
        const doctor = doctors[Math.floor(Math.random() * doctors.length)]
        return PrescriptionFactory.merge({
          patientId: patient.id,
          doctorId: doctor.id,
        }).create()
      })
    )

    console.log(`Created ${prescriptions.length} prescriptions`)
  }
}
