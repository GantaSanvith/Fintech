import SummaryCards from "../components/SummaryCards"
import BalanceChart from "../components/BalanceChart"
import SpendingChart from "../components/SpendingChart"
import InsightsSection from "../components/InsightsSection"

function Dashboard() {
  return (
    <div>
      <SummaryCards />
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "16px" }}>
        <BalanceChart />
        <SpendingChart />
      </div>
      <InsightsSection />
    </div>
  )
}

export default Dashboard