import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Medication from '#models/medication'
import { v7 } from 'uuid'
import { MedicationForm } from '#models/medication'

export default class extends BaseSeeder {
  async run() {
    const medications = [
      {
        id: v7(),
        name: 'Dipirona 500mg',
        genericName: 'Dipirona',
        description: 'Analgésico e antitérmico',
        dosage: '500mg',
        form: MedicationForm.COMPRIMIDO,
        category: 'Analgésico',
        minStock: 100,
        maxStock: 1000,
        controlled: false,
        refrigerated: false,
        barcode: '7891234567890',
      },
      {
        id: v7(),
        name: 'Amoxicilina 500mg',
        genericName: 'Amoxicilina',
        description: 'Antibiótico',
        dosage: '500mg',
        form: MedicationForm.CAPSULA,
        category: 'Antibiótico',
        minStock: 50,
        maxStock: 500,
        controlled: false,
        refrigerated: false,
        barcode: '7891234567891',
      },
      {
        id: v7(),
        name: 'Insulina Regular',
        genericName: 'Insulina Humana Regular',
        description: 'Hormônio para controle de glicemia',
        dosage: '100UI/ml',
        form: MedicationForm.INJETAVEL,
        category: 'Hormônio',
        minStock: 20,
        maxStock: 200,
        controlled: true,
        refrigerated: true,
        barcode: '7891234567892',
      },
      {
        id: v7(),
        name: 'Soro Fisiológico 0,9%',
        genericName: 'Cloreto de Sódio 0,9%',
        description: 'Solução para hidratação',
        dosage: '500ml',
        form: MedicationForm.LIQUIDO,
        category: 'Solução',
        minStock: 30,
        maxStock: 300,
        controlled: false,
        refrigerated: false,
        barcode: '7891234567893',
      },
      {
        id: v7(),
        name: 'Dexametasona 4mg',
        genericName: 'Dexametasona',
        description: 'Anti-inflamatório e imunossupressor',
        dosage: '4mg',
        form: MedicationForm.COMPRIMIDO,
        category: 'Corticóide',
        minStock: 50,
        maxStock: 500,
        controlled: false,
        refrigerated: false,
        barcode: '7891234567894',
      },
    ]

    await Medication.createMany(medications)
  }
}
