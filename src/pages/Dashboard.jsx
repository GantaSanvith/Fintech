import SummaryCards from "../components/SummaryCards"
import BalanceChart from "../components/BalanceChart"
import SpendingChart from "../components/SpendingChart"
import InsightsSection from "../components/InsightsSection"

function Dashboard() {
  return (
    <div>
      <SummaryCards />

      {/* Charts side by side on desktop, stacked on mobile */}
      <div className="charts-grid" style={{ marginBottom: "24px" }}>
        <BalanceChart />
        <SpendingChart />
      </div>

      <InsightsSection />
    </div>
  )
}

export default Dashboard