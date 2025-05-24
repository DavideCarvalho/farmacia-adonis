import { BaseSeeder } from '@adonisjs/lucid/seeders'
import MedicationRequest, { RequestStatus, RequestPriority } from '#models/medication_request'
import MedicationRequestItem from '#models/medication_request_item'
import Department from '#models/department'
import User, { UserRole } from '#models/user'
import Medication from '#models/medication'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

interface RequestData {
  departmentId: string
  requestedById: string
  status: RequestStatus
  priority: RequestPriority
  rejectionReason: string | null
  approvedById: string | null
  createdAt: DateTime
  updatedAt: DateTime
  createdBy: string
  updatedBy: string
}

interface ItemData {
  medicationId: string
  quantity: number
  notes?: string
  createdAt: DateTime
  updatedAt: DateTime
  createdBy: string
  updatedBy: string
  requestIndex: number
}

export default class extends BaseSeeder {
  async run() {
    const { departmentUsers, medications } = await this.loadDependencies()
    if (!this.validateDependencies(departmentUsers, medications)) return

    const { requests, items } = this.prepareRequestsAndItems(departmentUsers, medications)
    await this.createRequestsAndItems(requests, items)
  }

  private async loadDependencies() {
    const departments = await Department.all()
    const departmentUsers = await User.query()
      .where('role', UserRole.DEPARTMENT_USER)
      .preload('department')

    const medications = await Medication.all()

    return { departmentUsers, medications }
  }

  private validateDependencies(departmentUsers: User[], medications: Medication[]) {
    if (departmentUsers.length === 0 || medications.length === 0) {
      return false
    }

    return true
  }

  private prepareRequestsAndItems(departmentUsers: User[], medications: Medication[]) {
    const requests: RequestData[] = []
    const items: ItemData[] = []

    for (const user of departmentUsers) {
      if (!user.department) continue

      for (let i = 0; i < 5; i++) {
        const status = this.getRandomStatus()
        const priority = this.getRandomPriority()

        const request: RequestData = {
          departmentId: user.department.id,
          requestedById: user.id,
          status,
          priority,
          rejectionReason:
            status === RequestStatus.REJECTED ? 'Medicamento não disponível no momento' : null,
          approvedById: status === RequestStatus.APPROVED ? user.id : null,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          createdBy: user.id,
          updatedBy: user.id,
        }

        requests.push(request)

        const numItems = Math.floor(Math.random() * 2) + 2
        for (let j = 0; j < numItems; j++) {
          const medication = medications[Math.floor(Math.random() * medications.length)]
          const item: ItemData = {
            medicationId: medication.id,
            quantity: Math.floor(Math.random() * 50) + 10,
            notes: Math.random() < 0.3 ? 'Urgente' : undefined,
            createdAt: DateTime.now(),
            updatedAt: DateTime.now(),
            createdBy: user.id,
            updatedBy: user.id,
            requestIndex: requests.length - 1,
          }
          items.push(item)
        }
      }
    }

    return { requests, items }
  }

  private async createRequestsAndItems(requests: RequestData[], items: ItemData[]) {
    const trx = await db.transaction()

    try {
      const createdRequests = await this.createRequests(trx, requests)
      await trx.commit()

      const verifiedRequests = await this.verifyRequests(createdRequests)
      await this.createItems(verifiedRequests, items)
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  private async createRequests(trx: any, requests: RequestData[]) {
    const createdRequests = []

    for (const request of requests) {
      const createdRequest = await MedicationRequest.create(request, { client: trx })
      createdRequests.push(createdRequest)
    }

    return createdRequests
  }

  private async verifyRequests(createdRequests: MedicationRequest[]) {
    const departmentIds = [...new Set(createdRequests.map((r) => r.departmentId))]

    const foundRequests = await MedicationRequest.query()
      .whereIn('departmentId', departmentIds)
      .orderBy('createdAt', 'desc')

    if (foundRequests.length !== createdRequests.length) {
      throw new Error(
        `Apenas ${foundRequests.length} de ${createdRequests.length} solicitações foram criadas`
      )
    }

    return foundRequests
  }

  private async createItems(verifiedRequests: MedicationRequest[], items: ItemData[]) {
    const itemsTrx = await db.transaction()

    try {
      const createdItems = []

      for (const item of items) {
        const request = verifiedRequests[item.requestIndex]
        if (!request) continue

        const { requestIndex, ...itemData } = item
        const itemToCreate = {
          ...itemData,
          medicationRequestId: request.id,
        }

        const createdItem = await MedicationRequestItem.create(itemToCreate, { client: itemsTrx })
        createdItems.push(createdItem)
      }

      await itemsTrx.commit()
    } catch (error) {
      await itemsTrx.rollback()
      throw error
    }
  }

  private getRandomStatus(): RequestStatus {
    const statuses = [
      RequestStatus.PENDING,
      RequestStatus.APPROVED,
      RequestStatus.REJECTED,
      RequestStatus.DISPENSED,
    ]
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  private getRandomPriority(): RequestPriority {
    const priorities = [RequestPriority.LOW, RequestPriority.MEDIUM, RequestPriority.HIGH]
    return priorities[Math.floor(Math.random() * priorities.length)]
  }
}
