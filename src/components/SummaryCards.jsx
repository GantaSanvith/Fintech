import { useApp } from "../context/AppContext"

function SummaryCards() {
  const { transactions } = useApp()

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const totalBalance = totalIncome - totalExpenses

  return (
    <div className="cards-grid">

      <div className="card-hover fade-in-1" style={{ background: "var(--surface)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px" }}>Total Balance</p>
        <h2 className="card-value" style={{ color: "var(--text)" }}>₹{totalBalance.toLocaleString()}</h2>
      </div>

      <div className="card-hover fade-in-2" style={{ background: "var(--surface)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px" }}>Total Income</p>
        <h2 className="card-value" style={{ color: "var(--green)" }}>₹{totalIncome.toLocaleString()}</h2>
      </div>

      <div className="card-hover fade-in-3" style={{ background: "var(--surface)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px" }}>Total Expenses</p>
        <h2 className="card-value" style={{ color: "var(--red)" }}>₹{totalExpenses.toLocaleString()}</h2>
      </div>

    </div>
  )
}

export default SummaryCards