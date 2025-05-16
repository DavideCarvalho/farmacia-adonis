import { ArrowRight, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TopMedications() {
  const medications = [
    {
      id: 1,
      name: "Dipirona 500mg",
      quantity: 450,
      percentage: 90,
    },
    {
      id: 2,
      name: "Paracetamol 750mg",
      quantity: 380,
      percentage: 76,
    },
    {
      id: 3,
      name: "Omeprazol 20mg",
      quantity: 320,
      percentage: 64,
    },
    {
      id: 4,
      name: "Amoxicilina 500mg",
      quantity: 280,
      percentage: 56,
    },
    {
      id: 5,
      name: "Losartana 50mg",
      quantity: 250,
      percentage: 50,
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Medicamentos Mais Dispensados</CardTitle>
          <TrendingUp className="h-4 w-4 text-teal-600" />
        </div>
        <CardDescription>Top 5 medicamentos mais dispensados este mês</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {medications.map((medication) => (
          <div key={medication.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{medication.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{medication.quantity} unidades</span>
            </div>
            <Progress value={medication.percentage} className="h-2" />
          </div>
        ))}
        <Button variant="outline" className="w-full" size="sm">
          Ver relatório completo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
