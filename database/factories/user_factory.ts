import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { UserRole } from '#models/user'
import { PatientFactory } from './patient_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456',
      role: faker.helpers.arrayElement(Object.values(UserRole)),
      active: true,
    }
  })
  .relation('patient', () => PatientFactory)
  .build()
