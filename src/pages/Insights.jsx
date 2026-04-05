import InsightsSection from "../components/InsightsSection"
import SpendingChart from "../components/SpendingChart"

function Insights() {
  return (
    <div>
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#111827" }}>
        Insights
      </h2>
      <InsightsSection />
      <SpendingChart />
    </div>
  )
}

export default Insights