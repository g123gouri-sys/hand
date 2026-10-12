import { Pencil, Settings } from 'lucide-react'
import { Sidebar } from '../components/dashboard/Sidebar'
import { Navbar } from '../components/dashboard/Navbar'
import { MetricCards } from '../components/dashboard/MetricCards'
import { AnalyticsCharts } from '../components/dashboard/AnalyticsCharts'
import { SalesChart } from '../components/dashboard/SalesChart'
import { Tasks } from '../components/dashboard/Tasks'

export default function Dashboard() {
  return (
    <main className="dashboard-shell">
      <Sidebar />
      <section className="main-area dashboard-area">
        <Navbar />
        <div className="dashboard-content">
          <MetricCards />
          <AnalyticsCharts />
          <section className="lower-grid"><SalesChart /><Tasks /></section>
        </div>
        <button className="settings" aria-label="Dashboard settings"><Settings /></button>
        <button className="edit-button" aria-label="Edit dashboard"><Pencil /></button>
      </section>
    </main>
  )
}
