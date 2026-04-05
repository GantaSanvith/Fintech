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
      Food:          { background: "var(--amber-light)", color: "var(--amber)" },
      Travel:        { background: "var(--blue-light)", color: "var(--blue)" },
      Shopping:      { background: "var(--pink-light)", color: "var(--pink)" },
      Bills:         { background: "var(--teal-light)", color: "var(--teal)" },
      Entertainment: { background: "var(--blue-light)", color: "var(--blue)" },
      Income:        { background: "var(--green-light)", color: "var(--green)" },
    }
    return styles[category] || { background: "var(--bg)", color: "var(--text-muted)" }
  }

  const inputStyle = {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "1px solid var(--border)",
    fontSize: "13px",
    outline: "none",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "inherit",
    width: "100%"
  }

  return (
    <div className="fade-in" style={{ background: "var(--surface)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "24px" }}>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)" }}>Transactions</h3>

        <div className="table-controls">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={inputStyle}
          />
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest amount</option>
          </select>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-hint)", fontSize: "14px" }}>
          No transactions found
        </div>
      )}

      {/* Table */}
      {filtered.length > 0 && (
        <div className="table-wrapper">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Description", "Date", "Category", "Type", "Amount", ""].map((h, i) => (
                  <th key={i} style={{ textAlign: i === 4 ? "right" : "left", padding: "8px 0", fontSize: "11px", color: "var(--text-hint)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.4px", paddingRight: i < 5 ? "12px" : "0" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "11px 12px 11px 0", fontSize: "13px", color: "var(--text)" }}>{t.description}</td>
                  <td style={{ padding: "11px 12px 11px 0", fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{t.date}</td>
                  <td style={{ padding: "11px 12px 11px 0" }}>
                    <span style={{ ...badgeStyle(t.category), fontSize: "11px", padding: "3px 9px", borderRadius: "20px", fontWeight: "500", whiteSpace: "nowrap" }}>
                      {t.category}
                    </span>
                  </td>
                  <td style={{ padding: "11px 12px 11px 0", fontSize: "12px", color: "var(--text-muted)", textTransform: "capitalize" }}>{t.type}</td>
                  <td style={{ padding: "11px 12px 11px 0", fontSize: "13px", fontWeight: "600", color: t.type === "income" ? "var(--green)" : "var(--red)", textAlign: "right", whiteSpace: "nowrap" }}>
                    {t.type === "income" ? "+" : ""}₹{Math.abs(t.amount).toLocaleString()}
                  </td>
                  <td style={{ padding: "11px 0", textAlign: "right" }}>
                    {role === "Admin" && (
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        style={{
                          background: "var(--red-light)",
                          color: "var(--red)",
                          border: "1px solid var(--red)",
                          borderRadius: "6px",
                          padding: "3px 10px",
                          fontSize: "11px",
                          cursor: "pointer",
                          fontFamily: "inherit"
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
        </div>
      )}
    </div>
  )
}

export default TransactionTable