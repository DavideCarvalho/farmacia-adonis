import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Department from '#models/department'
import { v7 } from 'uuid'

export default class extends BaseSeeder {
  async run() {
    const departments = [
      {
        id: v7(),
        name: 'UTI',
        description: 'Unidade de Terapia Intensiva',
      },
      {
        id: v7(),
        name: 'Emergência',
        description: 'Pronto Atendimento',
      },
      {
        id: v7(),
        name: 'Clínica Médica',
        description: 'Setor de Clínica Médica',
      },
      {
        id: v7(),
        name: 'Pediatria',
        description: 'Setor de Pediatria',
      },
      {
        id: v7(),
        name: 'Cirurgia',
        description: 'Setor de Cirurgia',
      },
      {
        id: v7(),
        name: 'Farmácia Central',
        description: 'Farmácia Central do Hospital',
      },
    ]

    await Department.createMany(departments)
  }
}
