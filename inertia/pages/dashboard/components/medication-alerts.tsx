import { AlertTriangle, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MedicationAlerts() {
  const alerts = [
    {
      id: 1,
      name: "Dipirona 500mg",
      type: "estoque",
      message: "Estoque abaixo do mínimo (15 unidades)",
      severity: "high",
    },
    {
      id: 2,
      name: "Amoxicilina 500mg",
      type: "validade",
      message: "Vencimento em 15 dias",
      severity: "medium",
    },
    {
      id: 3,
      name: "Paracetamol 750mg",
      type: "estoque",
      message: "Estoque abaixo do mínimo (20 unidades)",
      severity: "high",
    },
    {
      id: 4,
      name: "Omeprazol 20mg",
      type: "validade",
      message: "Vencimento em 30 dias",
      severity: "low",
    },
    {
      id: 5,
      name: "Insulina Regular",
      type: "temperatura",
      message: "Temperatura acima do ideal",
      severity: "high",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Alertas</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </div>
        <CardDescription>Medicamentos que requerem atenção imediata</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between space-x-4 rounded-md border p-3">
            <div className="space-y-1">
              <p className="font-medium leading-none">{alert.name}</p>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "outline"
                }
              >
                {alert.severity === "high" ? "Crítico" : alert.severity === "medium" ? "Médio" : "Baixo"}
              </Badge>
              {alert.type === "validade" && <Clock className="h-4 w-4 text-muted-foreground" />}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
