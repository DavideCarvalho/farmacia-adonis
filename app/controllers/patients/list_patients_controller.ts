import type { HttpContext } from '@adonisjs/core/http'
import Patient from '#models/patient'
import PatientDto from '#dtos/patient'

export default class ListPatientsController {
  async handle({ request }: HttpContext) {
    const search = request.input('search', '')

    let data: Patient[] = []
    if (!search) {
      data = await Patient.query().limit(5)
    } else {
      data = await Patient.query()
        .where('full_name', 'ilike', `%${search}%`)
        .orWhere('cpf', 'ilike', `%${search}%`)
        .orWhere('email', 'ilike', `%${search}%`)
        .orderBy('full_name', 'asc')
        .limit(5)
    }

    return PatientDto.fromArray(data)
  }
}
