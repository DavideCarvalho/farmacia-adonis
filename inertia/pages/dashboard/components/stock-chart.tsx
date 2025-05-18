"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { tuyau } from '~/api/utils/tuyau_client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Line, LineChart, XAxis, YAxis } from 'recharts'

function StockChartContent() {
  const { data } = useSuspenseQuery({
    queryKey: ['stock-chart'],
    queryFn: () => tuyau.api.dashboard['stock-chart'].$get()
  })

  const chartConfig = {
    stock: {
      label: 'Nível de Estoque',
      theme: {
        light: 'rgb(75, 192, 192)',
        dark: 'rgb(75, 192, 192)',
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nível de Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data.data?.datasets[0].data}>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-stock)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend
              content={
                <ChartLegendContent
                  verticalAlign="top"
                  className="justify-end"
                />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function ErrorFallback() {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Erro ao carregar gráfico
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar o gráfico de nível de estoque. Por favor, tente novamente mais tarde.
        </p>
      </CardContent>
    </Card>
  )
}

export function StockChart() {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <Suspense fallback={
        <Card>
          <CardHeader>
            <CardTitle>Nível de Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full animate-pulse rounded bg-muted" />
          </CardContent>
        </Card>
      }>
        <StockChartContent />
      </Suspense>
    </ErrorBoundary>
  )
}
