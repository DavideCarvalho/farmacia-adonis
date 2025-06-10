import { AiService } from '#services/ai.service'
import { inject } from '@adonisjs/core'

@inject()
export default class YellowbookAiController {
  constructor(private aiService: AiService) {}

  async query() {
    return this.aiService.query(
      'Qual a posologia do Losartana? Por favor informe a página do livro de referência.'
    )
  }
}
