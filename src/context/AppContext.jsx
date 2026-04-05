import { createContext, useContext, useState, useEffect } from "react"

const AppContext = createContext()

const API_URL = "https://69d235af5043d95be9719726.mockapi.io/transactions"
export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [role, setRole] = useState("Admin")
  const [filter, setFilter] = useState("All")

  // API states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🌙 DARK MODE STATE
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"
  })

  // 🌙 APPLY DARK CLASS TO HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  // ── FETCH DATA ───────────────────────────────────────────────
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const res = await fetch(API_URL)

        if (!res.ok) throw new Error("Failed to fetch transactions")

        const data = await res.json()
        setTransactions(data)
        setError(null)
      } catch (err) {
        setError("Could not load transactions. Is the API server running?")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  // ── ADD TRANSACTION ──────────────────────────────────────────
  const addTransaction = async (newTransaction) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction)
      })

      const saved = await res.json()
      setTransactions(prev => [saved, ...prev])
    } catch (err) {
      alert("Failed to add transaction. Is the API server running?")
    }
  }

  // ── DELETE TRANSACTION ───────────────────────────────────────
  const deleteTransaction = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" })
      setTransactions(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      alert("Failed to delete transaction.")
    }
  }

  return (
    <AppContext.Provider value={{
      transactions,
      setTransactions,
      role, setRole,
      filter, setFilter,
      loading,
      error,
      addTransaction,
      deleteTransaction,
      darkMode,          // ✅ added
      setDarkMode        // ✅ added
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)