# TS-007-Vue3.3 — Routes & Navigation

## How to run
cd /workspace/frontend_runs/35d6e177-de5a-4cf1-b986-56bb4235e3da/project
npm install --legacy-peer-deps && npm run dev -- --port 59477 --strictPort
Then open http://localhost:59477

## Routes

| Route | Component file | Description |
|-------|----------------|-------------|
| / | redirect | Redirects to the main screen |
| /dashboard | src/views/DashboardView.vue | Financial overview with totals, category spending, and recent activity |
| /transactions | src/views/TransactionsView.vue | Searchable, filterable, sortable transaction management list |
| /transactions/new | src/views/TransactionFormView.vue | Add a new income or expense transaction |
| /transactions/:id/edit | src/views/TransactionFormView.vue | Edit an existing transaction |
| /categories | src/views/CategoriesView.vue | Predefined and custom category management |
| /summary | src/views/MonthlySummaryView.vue | Month-filtered income, expense, balance, and category summary |
| /:pathMatch(.*)* | src/views/NotFoundView.vue | Unknown-route fallback page |

## Navigation map
- Dashboard -> Transactions (sidebar link and View all recent transactions)
- Dashboard -> Add Transaction (Add transaction button)
- Transactions -> Dashboard (sidebar link)
- Transactions -> Add Transaction (Add transaction button)
- Transactions -> Edit Transaction (Edit transaction action)
- Edit Transaction -> Transactions (save, cancel, or back navigation)
- Add Transaction -> Transactions (save, cancel, or back navigation)
- Transactions -> Categories (sidebar link)
- Categories -> Dashboard (sidebar link)
- Categories -> Transactions (sidebar link)
- Categories -> Monthly Summary (sidebar link)
- Monthly Summary -> Dashboard (sidebar link)
- Monthly Summary -> Transactions (sidebar link)
- Monthly Summary -> Categories (sidebar link)
- Any page -> NotFound (unknown URL)
- NotFound -> Dashboard (Go to dashboard button)

## Shared components
- src/components/Sidebar.vue — Responsive primary navigation.
- src/components/TopBar.vue — Application top bar.
- src/components/MetricCard.vue — Reusable financial metric display card.
- src/components/ConfirmDialog.vue — Confirmation dialog for destructive actions.
- src/components/TransactionForm.vue — Validated add/edit transaction form.

## Design tokens
- primary: #2563eb
- primary-dark: #1d4ed8
- canvas: #f8fafc
- surface: #ffffff
- ink: #172033
- muted: #64748b
- border: #e2e8f0
- income: #16a34a
- expense: #dc2626
- warning: #d97706
