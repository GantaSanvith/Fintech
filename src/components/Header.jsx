import { useApp } from "../context/AppContext"
import { NavLink } from "react-router-dom"

function Header() {
  const { role, setRole, darkMode, setDarkMode } = useApp()

  const navStyle = ({ isActive }) => ({
    textDecoration: "none",
    fontSize: "13.5px",
    fontWeight: "500",
    padding: "6px 14px",
    borderRadius: "8px",
    background: isActive ? "var(--blue-light)" : "transparent",
    color: isActive ? "var(--blue)" : "var(--text-muted)",
    transition: "background 0.15s, color 0.15s",
    whiteSpace: "nowrap"
  })

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      background: "var(--surface)",
      padding: "14px 20px",
      borderRadius: "12px",
      border: "1px solid var(--border)",
      transition: "background 0.3s ease",
      flexWrap: "wrap",
      gap: "12px"
    }}>

      {/* LEFT — logo + nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "-0.5px", color: "var(--text)" }}>
          Fin<span style={{ color: "var(--blue)" }}>Track</span>
        </div>

        {/* Nav links — hidden on mobile via CSS class */}
        <nav className="nav-links" style={{ display: "flex", gap: "4px" }}>
          <NavLink to="/" end style={navStyle}>Dashboard</NavLink>
          <NavLink to="/transactions" style={navStyle}>Transactions</NavLink>
          <NavLink to="/insights" style={navStyle}>Insights</NavLink>
        </nav>
      </div>

      {/* RIGHT — dark mode + role badge + dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "var(--bg)",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
            flexShrink: 0
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Role badge */}
        <span style={{
          fontSize: "12px",
          padding: "4px 12px",
          borderRadius: "20px",
          fontWeight: "500",
          background: role === "Admin" ? "var(--blue-light)" : "var(--bg)",
          color: role === "Admin" ? "var(--blue)" : "var(--text-muted)",
          border: "1px solid var(--border)",
          whiteSpace: "nowrap"
        }}>
          {role}
        </span>

        {/* Role dropdown */}
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{
            padding: "7px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            fontSize: "13px",
            fontFamily: "inherit",
            background: "var(--bg)",
            color: "var(--text)",
            cursor: "pointer"
          }}
        >
          <option value="Admin">Admin</option>
          <option value="Viewer">Viewer</option>
        </select>

      </div>
    </div>
  )
}

export default Header