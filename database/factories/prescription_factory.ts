import factory from '@adonisjs/lucid/factories'
import Prescription from '#models/prescription'

const diagnoses = [
  'Hipertensão arterial',
  'Diabetes mellitus tipo 2',
  'Ansiedade generalizada',
  'Depressão',
  'Asma brônquica',
  'Artrite reumatoide',
  'Hipotiroidismo',
  'Gastrite crônica',
  'Enxaqueca',
  'Insônia',
]

const medications = [
  'Losartana 50mg - 1 comprimido 1x ao dia',
  'Metformina 850mg - 1 comprimido 3x ao dia',
  'Sertralina 50mg - 1 comprimido 1x ao dia',
  'Amitriptilina 25mg - 1 comprimido 1x ao dia',
  'Salbutamol 100mcg - 2 jatos 4x ao dia',
  'Metotrexato 2,5mg - 4 comprimidos 1x por semana',
  'Levotiroxina 50mcg - 1 comprimido 1x ao dia',
  'Omeprazol 20mg - 1 comprimido 2x ao dia',
  'Sumatriptana 50mg - 1 comprimido quando necessário',
  'Zolpidem 10mg - 1 comprimido ao deitar',
]

export const PrescriptionFactory = factory
  .define(Prescription, async ({ faker }) => {
    const status = faker.helpers.arrayElement(['pending', 'approved', 'rejected'] as const)
    const diagnosis = faker.helpers.arrayElement(diagnoses)
    const medication = faker.helpers.arrayElement(medications)

    return {
      diagnosis,
      medications: medication,
      status,
      pharmacistNotes: status === 'rejected' ? faker.lorem.sentence() : null,
    }
  })
  .build()
