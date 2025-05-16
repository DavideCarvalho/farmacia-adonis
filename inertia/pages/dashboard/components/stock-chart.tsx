"use client"

import { useEffect, useState } from "react"
import { BarChart, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function StockChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const monthlyData = [
    {
      name: "Jan",
      entradas: 1200,
      saidas: 900,
    },
    {
      name: "Fev",
      entradas: 1500,
      saidas: 1200,
    },
    {
      name: "Mar",
      entradas: 1300,
      saidas: 1100,
    },
    {
      name: "Abr",
      entradas: 1600,
      saidas: 1300,
    },
    {
      name: "Mai",
      entradas: 1400,
      saidas: 1500,
    },
    {
      name: "Jun",
      entradas: 1700,
      saidas: 1400,
    },
  ]

  const departmentData = [
    {
      name: "UTI",
      consumo: 450,
    },
    {
      name: "Emergência",
      consumo: 380,
    },
    {
      name: "Clínica",
      consumo: 280,
    },
    {
      name: "Pediatria",
      consumo: 220,
    },
    {
      name: "Oncologia",
      consumo: 310,
    },
    {
      name: "Cirurgia",
      consumo: 290,
    },
  ]

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Análise de Estoque</CardTitle>
          <CardDescription>Carregando dados de estoque...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 w-full animate-pulse bg-muted/20" />
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Análise de Estoque</CardTitle>
          <CardDescription>Movimentação de medicamentos no sistema</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <LineChart className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">
              <LineChart className="mr-2 h-4 w-4" />
              Mensal
            </TabsTrigger>
            <TabsTrigger value="department">
              <BarChart className="mr-2 h-4 w-4" />
              Por Departamento
            </TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={monthlyData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="entradas"
                    stroke="#0d9488"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    name="Entradas"
                  />
                  <Line
                    type="monotone"
                    dataKey="saidas"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    name="Saídas"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="department" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={departmentData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumo" fill="#0d9488" radius={[4, 4, 0, 0]} name="Consumo" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
