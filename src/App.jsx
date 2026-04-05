import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useApp } from "./context/AppContext"
import Header from "./components/Header"
import AddTransactionForm from "./components/AddTransactionForm"
import ExportButton from "./components/ExportButton"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Insights from "./pages/Insights"

function App() {
  const { role, loading, error } = useApp()
  const [showForm, setShowForm] = useState(false)

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "var(--bg)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "36px", height: "36px",
          border: "3px solid var(--border)",
          borderTop: "3px solid var(--blue)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 12px"
        }} />
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Loading transactions...</p>
      </div>
    </div>
  )

  if (error) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "var(--bg)" }}>
      <div style={{ textAlign: "center", padding: "32px", background: "var(--surface)", borderRadius: "12px", border: "1px solid var(--border)" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
        <p style={{ color: "var(--red)", fontSize: "14px", fontWeight: "500" }}>{error}</p>
        <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "8px" }}>Please try refreshing the page</p>
      </div>
    </div>
  )

  return (
    <BrowserRouter>
      <div className="main-wrapper">

        <Header />

        {/* Topbar actions — export + add */}
        <div className="topbar-actions">
          <ExportButton />
          {role === "Admin" && (
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: "9px 18px",
                background: "var(--blue)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              + Add Transaction
            </button>
          )}
        </div>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>

        {showForm && <AddTransactionForm onClose={() => setShowForm(false)} />}

      </div>
    </BrowserRouter>
  )
}

export default App