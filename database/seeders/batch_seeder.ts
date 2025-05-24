import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Batch from '#models/batch'
import Medication from '#models/medication'
import Supplier from '#models/supplier'
import { v7 } from 'uuid'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Buscar todos os medicamentos e fornecedores
    const medications = await Medication.all()
    const suppliers = await Supplier.all()

    if (medications.length === 0 || suppliers.length === 0) {
      console.log('Nenhum medicamento ou fornecedor encontrado. Pulando seeder de lotes.')
      return
    }

    const batches = []

    // Para cada medicamento, criar 2 lotes
    for (const medication of medications) {
      // Lote 1 - Válido
      batches.push({
        id: v7(),
        medicationId: medication.id,
        supplierId: suppliers[0].id,
        number: `LOTE-${medication.id.slice(0, 8)}-1`,
        manufacturingDate: DateTime.now().minus({ months: 6 }).toSQLDate(),
        expirationDate: DateTime.now().plus({ months: 18 }).toSQLDate(),
        quantity: 1000,
        unitPrice: 10.50,
        active: true,
      })

      // Lote 2 - Próximo do vencimento
      batches.push({
        id: v7(),
        medicationId: medication.id,
        supplierId: suppliers[1].id,
        number: `LOTE-${medication.id.slice(0, 8)}-2`,
        manufacturingDate: DateTime.now().minus({ months: 12 }).toSQLDate(),
        expirationDate: DateTime.now().plus({ days: 20 }).toSQLDate(),
        quantity: 500,
        unitPrice: 11.00,
        active: true,
      })
    }

    await Batch.createMany(batches)
  }
} 