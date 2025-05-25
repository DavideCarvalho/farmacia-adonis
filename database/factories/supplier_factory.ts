import factory from '@adonisjs/lucid/factories'
import Supplier from '#models/supplier'

const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

export const SupplierFactory = factory
  .define(Supplier, async ({ faker }) => {
    return {
      name: faker.company.name(),
      cnpj: faker.number.int({ min: 10000000000000, max: 99999999999999 }).toString(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.helpers.arrayElement(states),
      zipCode: faker.string.numeric(8),
      active: true,
    }
  })
  .build()
