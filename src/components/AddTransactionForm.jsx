import { useState } from "react"
import { useApp } from "../context/AppContext"

function AddTransactionForm({ onClose }) {
  const { addTransaction } = useApp()

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().slice(0, 10)
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.description || !form.amount) return

    const newTransaction = {
      ...form,
      amount: form.type === "expense"
        ? -Math.abs(Number(form.amount))
        : Math.abs(Number(form.amount))
    }

    await addTransaction(newTransaction)
    onClose()
  }

  // ✅ UPDATED STYLES (use CSS variables)
  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    fontSize: "13px",
    fontFamily: "inherit",
    outline: "none",
    background: "var(--bg)",
    color: "var(--text)"
  }

  const labelStyle = {
    fontSize: "12px",
    fontWeight: "500",
    color: "var(--text-muted)",
    marginBottom: "5px",
    display: "block"
  }

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100
    }}>

      {/* FORM BOX */}
      <div style={{
        background: "var(--surface)",
        borderRadius: "16px",
        padding: "28px",
        width: "100%",
        maxWidth: "420px",
        border: "1px solid var(--border)"
      }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "var(--text)" }}>
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "var(--text-muted)"
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

          <div>
            <label style={labelStyle}>Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Swiggy order"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Amount (₹)</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 500"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Type</label>
            <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Income</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              marginTop: "6px",
              padding: "10px",
              background: "var(--blue)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Add Transaction
          </button>

        </div>
      </div>
    </div>
  )
}

export default AddTransactionForm