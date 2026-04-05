import { useApp } from "../context/AppContext"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

function BalanceChart() {
  const { transactions } = useApp()

  const monthlyData = transactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7)

    if (!acc[month]) acc[month] = { month, income: 0, expenses: 0 }

    if (t.type === "income") acc[month].income += t.amount
    if (t.type === "expense") acc[month].expenses += Math.abs(t.amount)

    return acc
  }, {})

  const chartData = Object.values(monthlyData).map(m => ({
    month: m.month.slice(5),
    balance: m.income - m.expenses
  }))

  return (
     <div
  className="fade-in-1"
  style={{
    background: "var(--surface)",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    marginBottom: "24px"
  }}
>
  <h3 style={{
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "var(--text)"
  }}>
    Balance by Month
  </h3>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} />
          <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
          <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Balance"]} />
          <Bar dataKey="balance" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceChart