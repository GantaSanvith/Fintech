import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useApp } from "./context/AppContext"
import Header from "./components/Header"
import AddTransactionForm from "./components/AddTransactionForm"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Insights from "./pages/Insights"
import ExportButton from "./components/ExportButton"

function App() {
  const { role, loading, error } = useApp()
  const [showForm, setShowForm] = useState(false)

  // ✅ LOADING STATE (UPDATED)
  if (loading) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "var(--bg)"   // ✅ updated
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "36px",
          height: "36px",
          border: "3px solid var(--border)", // ✅ updated
          borderTop: "3px solid var(--blue)", // ✅ updated
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 12px"
        }} />
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Loading transactions...
        </p>
      </div>
    </div>
  )

  // ✅ ERROR STATE (UPDATED)
  if (error) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "var(--bg)"  // ✅ updated
    }}>
      <div style={{
        textAlign: "center",
        padding: "32px",
        background: "var(--surface)", // ✅ updated
        borderRadius: "12px",
        border: "1px solid var(--border)" // ✅ updated
      }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>

        <p style={{
          color: "#dc2626", // keep red for error
          fontSize: "14px",
          fontWeight: "500"
        }}>
          {error}
        </p>

        <p style={{
          color: "var(--text-muted)",
          fontSize: "13px",
          marginTop: "8px"
        }}>
          Run{" "}
          <code style={{
            background: "var(--bg)",
            padding: "2px 6px",
            borderRadius: "4px",
            border: "1px solid var(--border)",
            color: "var(--text)"
          }}>
            npm run server
          </code>{" "}
          in your terminal
        </p>
      </div>
    </div>
  )

  // ✅ MAIN APP UI
  return (
    <BrowserRouter>
      <div style={{
        padding: "24px",
        background: "var(--bg)",   // ✅ updated
        minHeight: "100vh"
      }}>

        <Header />

        {/* BUTTON ROW */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
          gap: "10px"
        }}>
          
          <ExportButton />

          {role === "Admin" && (
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: "9px 18px",
                background: "var(--blue)", // ✅ updated
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              + Add Transaction
            </button>
          )}

        </div>

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