import { useState } from "react"
import { useApp } from "../context/AppContext"

function TransactionTable() {
  const { transactions, role, deleteTransaction } = useApp()

  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [sortOrder, setSortOrder] = useState("newest")

  const categories = ["All", ...new Set(transactions.map(t => t.category))]

  const filtered = transactions
    .filter(t => t.description.toLowerCase().includes(search.toLowerCase()))
    .filter(t => filterCategory === "All" ? true : t.category === filterCategory)
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.date) - new Date(a.date)
      if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date)
      if (sortOrder === "highest") return Math.abs(b.amount) - Math.abs(a.amount)
      return 0
    })

  const badgeStyle = (category) => {
    const styles = {
      Food: { background: "#fffbeb", color: "#d97706" },
      Travel: { background: "#eff6ff", color: "#2563eb" },
      Shopping: { background: "#fdf2f8", color: "#db2777" },
      Bills: { background: "#f0fdfa", color: "#0f766e" },
      Entertainment: { background: "#faf5ff", color: "#7c3aed" },
      Income: { background: "#f0fdf4", color: "#16a34a" },
    }
    return styles[category] || { background: "#f3f4f6", color: "#6b7280" }
  }

  const thStyle = {
    textAlign: "left",
    padding: "8px 0",
    fontSize: "11px",
    color: "var(--text-hint)", // ✅ updated
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.4px"
  }

  return (
    <div style={{
      background: "var(--surface)",   // ✅ updated
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid var(--border)", // ✅ updated
      marginBottom: "24px"
    }}>

      {/* TOP BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)" }}>
          Transactions
        </h3>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              fontSize: "13px",
              width: "160px",
              outline: "none",
              background: "var(--bg)",
              color: "var(--text)"
            }}
          />

          {/* FILTER */}
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              fontSize: "13px",
              background: "var(--bg)",
              color: "var(--text)"
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* SORT */}
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              fontSize: "13px",
              background: "var(--bg)",
              color: "var(--text)"
            }}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest amount</option>
          </select>
        </div>
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-hint)" }}>
          No transactions found
        </div>
      )}

      {/* TABLE */}
      {filtered.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(t => (
              <tr key={t.id} style={{ borderBottom: "1px solid var(--border)" }}>

                <td style={{ padding: "11px 0", fontSize: "13px", color: "var(--text)" }}>
                  {t.description}
                </td>

                <td style={{ padding: "11px 0", fontSize: "12px", color: "var(--text-muted)" }}>
                  {t.date}
                </td>

                <td style={{ padding: "11px 0" }}>
                  <span style={{ ...badgeStyle(t.category), padding: "3px 9px", borderRadius: "20px", fontSize: "11px" }}>
                    {t.category}
                  </span>
                </td>

                <td style={{ padding: "11px 0", color: "var(--text-muted)" }}>
                  {t.type}
                </td>

                <td style={{
                  padding: "11px 0",
                  fontWeight: "600",
                  color: t.type === "income" ? "#16a34a" : "#dc2626"
                }}>
                  {t.type === "income" ? "+" : ""}₹{Math.abs(t.amount).toLocaleString()}
                </td>

                <td style={{ padding: "11px 0" }}>
                  {role === "Admin" && (
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      style={{
                        background: "#fef2f2",
                        color: "#dc2626",
                        border: "1px solid #fecaca",
                        borderRadius: "6px",
                        padding: "3px 10px",
                        fontSize: "11px",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TransactionTable