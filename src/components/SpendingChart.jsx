import { useApp } from "../context/AppContext"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

function SpendingChart() {
  const { transactions } = useApp()

  // Step 1 — filter only expenses, then group by category
  const categoryTotals = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      const cat = t.category

      // if this category doesn't exist yet, create it with 0
      if (!acc[cat]) acc[cat] = { name: cat, value: 0 }

      // add this transaction's amount to that category's total
      acc[cat].value += Math.abs(t.amount)

      return acc
    }, {})

  // Step 2 — convert object to array so recharts can use it
  const chartData = Object.values(categoryTotals)

  // Step 3 — define a color for each slice
  const COLORS = ["#2563eb", "#d97706", "#db2777", "#0f766e", "#7c3aed", "#dc2626"]

  return (
    <div style={{
  background: "var(--surface)",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid var(--border)",
  marginBottom: "24px"
}}>
  <h3 style={{
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "var(--text)"
  }}>
    Spending by Category
  </h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"        // which field holds the number
            nameKey="name"         // which field holds the label
            cx="50%"               // center horizontally
            cy="50%"               // center vertically
            outerRadius={90}       // size of the pie
            innerRadius={45}       // makes it a donut shape, remove for full pie
          >
            {/* Loop through data and assign each slice a color */}
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* Tooltip shows category name + amount on hover */}
          <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Spent"]} />

          {/* Legend shows colored labels below the chart */}
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingChart