import { faker } from '@faker-js/faker/locale/pt_BR'
import Factory from '@adonisjs/lucid/factories'
import Patient from '#models/patient'
import { DateTime } from 'luxon'

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

export const PatientFactory = Factory.define(Patient, () => {
  return {
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'national' }),
    cpf: faker.string.numeric(11),
    birthDate: DateTime.fromJSDate(faker.date.birthdate({ min: 18, max: 80, mode: 'age' })),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.helpers.arrayElement(states),
    zipCode: faker.string.numeric(8),
    active: true,
  }
}).build()
