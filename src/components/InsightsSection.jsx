import { useApp } from "../context/AppContext"

function InsightsSection() {
  const { transactions } = useApp()

  const expenses = transactions.filter(t => t.type === "expense")

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount)
    return acc
  }, {})

  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0]

  const today = new Date()
  const thisMonth = today.toISOString().slice(0, 7)
  const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const lastMonth = lastMonthDate.toISOString().slice(0, 7)

  const thisMonthTotal = expenses
    .filter(t => t.date.startsWith(thisMonth))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const lastMonthTotal = expenses
    .filter(t => t.date.startsWith(lastMonth))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const percentChange = lastMonthTotal === 0
    ? 0
    : (((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(1)

  const thisMonthIncome = transactions
    .filter(t => t.type === "income" && t.date.startsWith(thisMonth))
    .reduce((sum, t) => sum + t.amount, 0)

  const savingsRate = thisMonthIncome === 0
    ? 0
    : (((thisMonthIncome - thisMonthTotal) / thisMonthIncome) * 100).toFixed(1)

  const txThisMonth = transactions.filter(t => t.date.startsWith(thisMonth)).length

  const cardStyle = {
    background: "var(--surface)",
    padding: "18px 20px",
    borderRadius: "12px",
    border: "1px solid var(--border)"
  }

  return (
    <div style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        Insights
      </h3>

      <div className="insights-grid">

        <div className="card-hover fade-in-1" style={cardStyle}>
          <div style={{ fontSize: "20px", marginBottom: "8px" }}>🏆</div>
          <div style={{ fontSize: "11px", color: "var(--text-hint)", textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: "600", marginBottom: "4px" }}>Top category</div>
          <div style={{ fontSize: "17px", fontWeight: "600", color: "var(--text)", marginBottom: "4px" }}>{topCategory ? topCategory[0] : "N/A"}</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>₹{topCategory ? topCategory[1].toLocaleString() : 0} spent</div>
        </div>

        <div className="card-hover fade-in-2" style={cardStyle}>
          <div style={{ fontSize: "20px", marginBottom: "8px" }}>📊</div>
          <div style={{ fontSize: "11px", color: "var(--text-hint)", textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: "600", marginBottom: "4px" }}>vs last month</div>
          <div style={{ fontSize: "17px", fontWeight: "600", marginBottom: "4px", color: percentChange > 0 ? "var(--red)" : "var(--green)" }}>
            {percentChange > 0 ? "+" : ""}{percentChange}%
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>₹{thisMonthTotal.toLocaleString()} this month</div>
        </div>

        <div className="card-hover fade-in-3" style={cardStyle}>
          <div style={{ fontSize: "20px", marginBottom: "8px" }}>💰</div>
          <div style={{ fontSize: "11px", color: "var(--text-hint)", textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: "600", marginBottom: "4px" }}>Savings rate</div>
          <div style={{ fontSize: "17px", fontWeight: "600", color: "var(--green)", marginBottom: "4px" }}>{savingsRate}%</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>₹{(thisMonthIncome - thisMonthTotal).toLocaleString()} saved</div>
        </div>

        <div className="card-hover fade-in-4" style={cardStyle}>
          <div style={{ fontSize: "20px", marginBottom: "8px" }}>🧾</div>
          <div style={{ fontSize: "11px", color: "var(--text-hint)", textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: "600", marginBottom: "4px" }}>Transactions</div>
          <div style={{ fontSize: "17px", fontWeight: "600", color: "var(--text)", marginBottom: "4px" }}>{txThisMonth}</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>this month</div>
        </div>

      </div>
    </div>
  )
}

export default InsightsSection