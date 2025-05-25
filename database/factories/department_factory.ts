import factory from '@adonisjs/lucid/factories'
import Department from '#models/department'

const departments = [
  'Farmácia Central',
  'Clínica Médica',
  'Pediatria',
  'Cirurgia',
  'Emergência',
  'UTI',
  'Oncologia',
  'Cardiologia',
  'Neurologia',
  'Ortopedia',
]

export const DepartmentFactory = factory
  .define(Department, async ({ faker }) => {
    return {
      name: faker.helpers.arrayElement(departments),
      description: faker.lorem.sentence(),
    }
  })
  .build()
