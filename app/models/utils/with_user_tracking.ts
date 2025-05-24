import User from '#models/user'
import { type BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { NormalizeConstructor } from '@adonisjs/core/types/helpers'

type ModelWithUserTrackingRow = {
  createdById: string
  updatedById: string
  createdBy: BelongsTo<typeof User>
  updatedBy: BelongsTo<typeof User>
}

type ModelWithUserTrackingClass<
  Model extends NormalizeConstructor<typeof BaseModel> = NormalizeConstructor<typeof BaseModel>,
> = Model & {
  new (...args: any[]): ModelWithUserTrackingRow
}

export function withUserTracking() {
  return <T extends NormalizeConstructor<typeof BaseModel>>(
    superclass: T
  ): ModelWithUserTrackingClass<T> => {
    class ModelWithUserTracking extends superclass {
      @column()
      declare createdById: string

      @column()
      declare updatedById: string

      @belongsTo(() => User)
      declare createdBy: BelongsTo<typeof User>

      @belongsTo(() => User)
      declare updatedBy: BelongsTo<typeof User>
    }

    return ModelWithUserTracking as unknown as ModelWithUserTrackingClass<T>
  }
}
