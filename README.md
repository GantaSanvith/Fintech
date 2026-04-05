# FinTrack — Finance Dashboard

> 🚀 Live Demo: https://fintech-peach.vercel.app
> 📁 GitHub: https://github.com/GantaSanvith/Fintech

A clean and interactive finance dashboard built with React. This project was built as part of the Zorvyn Frontend Developer Intern assignment.

---

## Live Features

### Core Requirements

- **Dashboard Overview** — Summary cards showing Total Balance, Income, and Expenses calculated live from transaction data
- **Balance Trend Chart** — Bar chart showing monthly balance using Recharts
- **Spending Breakdown Chart** — Donut chart showing expenses grouped by category
- **Transactions Section** — Full transaction list with search, category filter, and sort (newest/oldest/highest)
- **Role Based UI** — Switch between Admin and Viewer using a dropdown in the header
  - Admin can add and delete transactions
  - Viewer gets a read-only view with no add or delete controls
- **Insights Section** — Shows top spending category, month vs last month comparison, savings rate, and transaction count
- **State Management** — Centralized using React Context API, managing transactions, role, filter, and dark mode across all components

### Optional Enhancements

- **Dark Mode** — Full dark and light mode toggle using CSS variables, preference saved to localStorage
- **Data Persistence** — Transactions persist across page refreshes using localStorage
- **Mock API Integration** — Data is served via MockAPI (cloud hosted), with real GET, POST, and DELETE calls. Includes loading spinner and error state if API is unreachable
- **Export CSV** — Download all transactions as a .csv file openable in Excel or Google Sheets
- **Animations** — Fade-in-up animations on page load with staggered delays, and hover lift effect on cards

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React | UI framework |
| Vite | Build tool |
| Recharts | Charts (BarChart, PieChart) |
| React Router DOM | Client side routing |
| MockAPI | Cloud hosted mock REST API |
| CSS Variables | Theming and dark mode |
| Context API | Global state management |
| Vercel | Deployment |

---

## Project Structure

```
finance-dashboard/
├── package.json
├── README.md
└── src/
    ├── main.jsx                   # Entry point, wraps app in AppProvider
    ├── App.jsx                    # Root component, routing setup
    ├── index.css                  # Global styles, CSS variables, animations
    ├── components/
    │   ├── Header.jsx             # Navigation, role switcher, dark mode toggle
    │   ├── SummaryCards.jsx       # Balance, income, expenses cards
    │   ├── BalanceChart.jsx       # Monthly balance bar chart
    │   ├── SpendingChart.jsx      # Category spending donut chart
    │   ├── TransactionTable.jsx   # Filterable, searchable transaction list
    │   ├── InsightsSection.jsx    # Automated financial insights
    │   ├── AddTransactionForm.jsx # Modal form to add new transactions
    │   └── ExportButton.jsx       # CSV export functionality
    ├── pages/
    │   ├── Dashboard.jsx          # Main overview page
    │   ├── Transactions.jsx       # Full transactions page
    │   └── Insights.jsx           # Insights and spending breakdown page
    ├── context/
    │   └── AppContext.jsx         # Global state, API calls, dark mode logic
    └── data/
        └── transactions.js        # Fallback mock data
```

---

## Setup Instructions

### 1. Clone the project

```bash
git clone https://github.com/GantaSanvith/Fintech
cd finance-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the React app

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

> No separate API server needed — the app connects to a live MockAPI endpoint hosted in the cloud.

---

## How to Use

| Action | How |
|---|---|
| Switch role | Use the dropdown in the top right of the header |
| Add transaction | Switch to Admin, click "+ Add Transaction" button |
| Delete transaction | Switch to Admin, click Delete on any table row |
| Search transactions | Type in the search box on the Transactions page |
| Filter by category | Use the category dropdown next to the search box |
| Sort transactions | Use the sort dropdown — newest, oldest, or highest amount |
| Export data | Click the "⬇ Export CSV" button |
| Toggle dark mode | Click the 🌙 or ☀️ button in the header |

---

## State Management Approach

All application state lives in a single `AppContext` using React's built-in Context API. This includes:

- `transactions` — the full list fetched from the API
- `role` — current user role (Admin or Viewer)
- `filter` — active category filter
- `darkMode` — current theme preference
- `loading` and `error` — API fetch states
- `addTransaction` — POST to API and update state
- `deleteTransaction` — DELETE from API and update state

Every component pulls only what it needs using the `useApp()` hook. This keeps components simple and avoids prop drilling.

---

## API Integration

The app uses MockAPI — a cloud hosted mock REST API — so it works on any device without running a local server.

| Method | Endpoint | Action |
|---|---|---|
| GET | /transactions | Load all transactions on app start |
| POST | /transactions | Add a new transaction |
| DELETE | /transactions/:id | Delete a transaction by id |

The app handles three API states:
- **Loading** — spinner shown while fetching
- **Success** — data rendered normally
- **Error** — friendly error message shown if API is unreachable

---

## Role Based UI

| Feature | Admin | Viewer |
|---|---|---|
| View dashboard | Yes | Yes |
| View transactions | Yes | Yes |
| View insights | Yes | Yes |
| Add transaction | Yes | No |
| Delete transaction | Yes | No |
| Export CSV | Yes | Yes |
| Switch dark mode | Yes | Yes |

Role switching is handled on the frontend only using the role value stored in Context. No backend auth is needed for this demo.

---

## Approach and Decisions

I started by planning the component structure and data shape before writing any code. The goal was to keep components small and focused — each one does one thing and reads state from context rather than receiving many props.

The mock API uses MockAPI which provides real cloud hosted HTTP endpoints. This means the app behaves like a real API-connected frontend with loading states, error handling, and live data persistence — and works fully on the deployed Vercel URL without any local server.

Dark mode is implemented using CSS custom properties defined on the html element. Toggling a single class on the html tag switches every variable at once, so all components automatically respond without any extra logic.

The insights section derives all its values automatically from the transactions array using JavaScript reduce and filter operations — no hardcoded values anywhere.

---

## Author

**Name:** Sanvith Ganta
**Email:** sanvithganta223@gmail.com
**Assignment:** Finance Dashboard UI — Frontend Developer Intern
**Company:** Zorvyn FinTech Pvt. Ltd.