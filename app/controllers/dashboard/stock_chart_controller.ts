import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class StockChartController {
  async handle({ response }: HttpContext) {
    const lastSixMonths = await db
      .from('stock_items')
      .select(
        db.raw("DATE_TRUNC('month', created_at) as month"),
        db.raw('SUM(current_quantity) as total_quantity')
      )
      .groupBy('month')
      .orderBy('month', 'desc')
      .limit(6)

    const labels = lastSixMonths
      .map((item) => {
        const date = new Date(item.month)
        return date.toLocaleString('pt-BR', { month: 'short' })
      })
      .reverse()

    const data = lastSixMonths.map((item) => Number(item.total_quantity)).reverse()

    return response.json({
      labels,
      datasets: [
        {
          label: 'Nível de Estoque',
          data,
        },
      ],
    })
  }
}
