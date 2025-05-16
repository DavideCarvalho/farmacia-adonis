import type { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { MedicationAlerts } from "@/components/dashboard/medication-alerts"
import { MedicationRequests } from "@/components/dashboard/medication-requests"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StockChart } from "@/components/dashboard/stock-chart"
import { TopMedications } from "@/components/dashboard/top-medications"

export const metadata: Metadata = {
  title: "Dashboard - Sistema de Controle de Farmácia Hospitalar",
  description: "Dashboard do sistema de controle de farmácia hospitalar",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Bem-vindo ao Sistema de Controle de Farmácia Hospitalar" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <StockChart />
        </div>
        <div className="col-span-3">
          <MedicationAlerts />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <MedicationRequests />
        </div>
        <div className="col-span-3">
          <TopMedications />
        </div>
      </div>
      <div className="grid gap-4">
        <RecentActivity />
      </div>
    </DashboardShell>
  )
}
