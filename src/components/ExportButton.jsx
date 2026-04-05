import { useApp } from "../context/AppContext"

function ExportButton() {
  const { transactions } = useApp()

  const exportCSV = () => {
    // Step 1 — define the column headers
    const headers = ["ID", "Description", "Amount", "Category", "Type", "Date"]

    // Step 2 — convert each transaction into a row of values
    const rows = transactions.map(t => [
      t.id,
      t.description,
      Math.abs(t.amount),
      t.category,
      t.type,
      t.date
    ])

    // Step 3 — combine headers and rows into CSV string
    // each row is joined by commas, rows are separated by new lines
    const csvContent = [headers, ...rows]
      .map(row => row.join(","))
      .join("\n")

    // Step 4 — create a downloadable link and click it automatically
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "transactions.csv"  // filename the user gets
    link.click()

    // Step 5 — clean up the url we created
    URL.revokeObjectURL(url)
  }

  return (
     <button
  onClick={exportCSV}
  style={{
    padding: "9px 18px",
    background: "var(--surface)",      // was hardcoded white
    color: "var(--text)",              // was hardcoded #374151
    border: "1px solid var(--border)", // was hardcoded #e5e7eb
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "background 0.3s ease, color 0.3s ease"
  }}
>
  ⬇ Export CSV
</button>
  )
}

export default ExportButton