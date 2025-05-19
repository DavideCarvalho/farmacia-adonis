import { DashboardHeader } from '~/pages/dashboard/components/dashboard-header'
import { DashboardShell } from '~/layout/dashboard-layout'
import { DashboardStats } from '~/pages/dashboard/components/dashboard-stats'
import { MedicationAlerts } from '~/pages/dashboard/components/medication-alerts'
import { MedicationRequests } from '~/pages/dashboard/components/medication-requests'
import { RecentActivity } from '~/pages/dashboard/components/recent-activity'
import { StockChart } from '~/pages/dashboard/components/stock-chart'
import { TopMedications } from '~/pages/dashboard/components/top-medications'

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text="Bem-vindo ao Sistema de Controle de Farmácia Hospitalar"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
      </div> */}
    </>
  )
}

DashboardPage.layout = (page: React.ReactNode) => <DashboardShell>{page}</DashboardShell>
