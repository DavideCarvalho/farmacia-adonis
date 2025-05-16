import type { JobHandlerContract, Job } from '@acidiney/bull-queue/types'

export type TestePayload = {}

export default class TesteJob implements JobHandlerContract<TestePayload> {
  /**
   * Base Entry point
   */
  async handle(job: Job<TestePayload>) {
    console.log('TesteJob', job)
  }

  /**
   * This is an optional method that gets called if it exists when the retries has exceeded and is marked failed.
   */
  async failed(job: Job<TestePayload>) {
    console.log('TesteJob failed', job)
  }
}
