import factory from '@adonisjs/lucid/factories'
import Activity from '#models/activity'
import { ActivityType } from '#models/activity'

const descriptions = {
  [ActivityType.LOGIN]: [
    'Usuário fez login no sistema',
    'Usuário acessou o sistema',
    'Usuário entrou no sistema',
  ],
  [ActivityType.LOGOUT]: [
    'Usuário fez logout do sistema',
    'Usuário saiu do sistema',
    'Usuário desconectou do sistema',
  ],
  [ActivityType.CREATE]: [
    'Usuário criou um novo registro',
    'Usuário adicionou um novo item',
    'Usuário registrou uma nova entrada',
  ],
  [ActivityType.UPDATE]: [
    'Usuário atualizou um registro',
    'Usuário modificou um item',
    'Usuário alterou uma entrada',
  ],
  [ActivityType.DELETE]: [
    'Usuário removeu um registro',
    'Usuário excluiu um item',
    'Usuário deletou uma entrada',
  ],
  [ActivityType.APPROVE]: [
    'Usuário aprovou uma solicitação',
    'Usuário autorizou uma operação',
    'Usuário validou um registro',
  ],
  [ActivityType.REJECT]: [
    'Usuário rejeitou uma solicitação',
    'Usuário negou uma operação',
    'Usuário invalidou um registro',
  ],
  [ActivityType.DISPENSE]: [
    'Usuário dispensou um medicamento',
    'Usuário entregou um medicamento',
    'Usuário realizou uma dispensação',
  ],
  [ActivityType.STOCK_MOVEMENT]: [
    'Usuário realizou uma movimentação de estoque',
    'Usuário registrou uma entrada/saída',
    'Usuário atualizou o estoque',
  ],
  [ActivityType.SYSTEM]: [
    'Operação automática do sistema',
    'Processo automático executado',
    'Tarefa agendada realizada',
  ],
}

export const ActivityFactory = factory
  .define(Activity, async ({ faker }) => {
    const type = faker.helpers.arrayElement(Object.values(ActivityType))
    return {
      type,
      description: faker.helpers.arrayElement(descriptions[type]),
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
    }
  })
  .build()
