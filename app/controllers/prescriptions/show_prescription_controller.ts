import type { HttpContext } from '@adonisjs/core/http'
import Prescription from '#models/prescription'
import PrescriptionDto from '#dtos/prescription'

export default class ShowPrescriptionController {
  async handle({ params }: HttpContext) {
    const prescription = await Prescription.findOrFail(params.id)
    await prescription.load('patient')
    await prescription.load('doctor')

    return new PrescriptionDto(prescription)
  }
}
