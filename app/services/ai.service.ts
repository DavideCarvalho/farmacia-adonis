import { type RAGApplication, RAGApplicationBuilder, SIMPLE_MODELS } from '@llm-tools/embedjs'
import { OpenAiEmbeddings } from '@llm-tools/embedjs-openai'
import { HNSWDb } from '@llm-tools/embedjs-hnswlib'
import { PdfLoader } from '@llm-tools/embedjs-loader-pdf'
import path from 'node:path'

export class AiService {
  private app!: RAGApplication

  constructor() {
    this.start()
  }

  async start() {
    this.app = await new RAGApplicationBuilder()
      .setModel(SIMPLE_MODELS.OPENAI_GPT4_O)
      .setEmbeddingModel(new OpenAiEmbeddings())
      .setVectorDatabase(new HNSWDb())
      .build()

    await this.loadPdf(path.join(import.meta.dirname, 'yellowbook.pdf'))
  }

  async loadPdf(pdfPath: string) {
    const loader = new PdfLoader({
      filePathOrUrl: pdfPath,
    })
    this.app.addLoader(loader)
  }

  async query(query: string) {
    const result = await this.app.query(query)
    return result
  }
}
