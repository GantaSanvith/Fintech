import TransactionTable from "../components/TransactionTable"

function Transactions() {
  return (
    <div>
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#111827" }}>
        All Transactions
      </h2>
      <TransactionTable />
    </div>
  )
}

export default Transactions