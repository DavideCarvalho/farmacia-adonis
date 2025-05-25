import factory from '@adonisjs/lucid/factories'
import MedicationRequest, { RequestStatus, RequestPriority } from '#models/medication_request'

const statuses = [
  RequestStatus.PENDING,
  RequestStatus.APPROVED,
  RequestStatus.REJECTED,
  RequestStatus.DISPENSED,
] as const

export const MedicationRequestFactory = factory
  .define(MedicationRequest, async ({ faker }) => {
    const status = faker.helpers.arrayElement(statuses)
    return {
      status,
      priority: faker.helpers.arrayElement(Object.values(RequestPriority)),
      rejectionReason: status === RequestStatus.REJECTED ? faker.lorem.sentence() : null,
      notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 }),
    }
  })
  .build()
