# Investment App Plan

Building a professional investment platform where clients can save, invest, and track returns.

## Scope Summary
- **User Dashboard:** Real-time (simulated) portfolio overview, balance, and growth charts.
- **Investment Management:** Browse available investment plans (e.g., Conservative, Balanced, Aggressive), view details, and invest.
- **Transactions:** Deposit and withdraw functionality with history tracking.
- **Portfolio Analytics:** Simple visualization of gains and asset allocation.
- **Local Persistence:** Data saved to `localStorage` for session persistence (no Supabase in this session).

## Non-Goals
- Real money processing (simulated transactions only).
- Live stock market API integration (will use mock market data for stability).
- Server-side authentication or database storage.

## Assumptions & Open Questions
- **Assumption:** The app should look like a premium fintech product (clean UI, high contrast, professional charts).
- **Open Question:** Are there specific investment types required? (Defaulting to basic risk-based mutual funds/indices).

## Affected Areas
- **Frontend UI:** New components for charts, cards, and transaction forms.
- **State Management:** Custom hooks for managing balance, investments, and transaction history using `localStorage`.
- **Navigation:** Multi-view layout (Dashboard, Invest, Transactions, Profile).

## Phases & Deliverables

### Phase 1: Foundation & Navigation (frontend_engineer)
- Set up project structure and navigation (using a sidebar or bottom nav for mobile-friendliness).
- Create basic layout shell with a header for user balance and notifications.
- Deliverable: App layout with functional navigation.

### Phase 2: Dashboard & Portfolio (frontend_engineer)
- Build the main dashboard with a summary card showing "Total Balance", "Total Profit", and a "Monthly Growth" chart (using Recharts).
- List "Active Investments" with their current performance.
- Deliverable: Interactive dashboard with mock data.

### Phase 3: Investment Market & Details (frontend_engineer)
- Create an "Invest" page showing different investment tiers/funds.
- Add a modal or detail view for each fund explaining risk level and historical returns.
- Deliverable: Fund browsing and selection UI.

### Phase 4: Transaction System & Logic (frontend_engineer)
- Implement the logic for "Investing", "Withdrawing", and "Depositing".
- Create the transaction history view.
- Persist user balance and portfolio to `localStorage`.
- Deliverable: Functional investment and withdrawal flow.

### Phase 5: Polishing & UX (quick_fix_engineer)
- Refine animations, button states, and empty states (e.g., when no investments exist).
- Ensure responsive design across mobile and desktop.
- Final UI polish (spacing, typography, color scheme).
- Deliverable: Production-ready feel.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the core application architecture and dashboard.
2. quick_fix_engineer — Final UI refinements and responsiveness checks.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** Create a complete investment platform. Use `lucide-react` for icons and `recharts` for data visualization. Implement a robust `usePortfolio` hook that manages state and syncs with `localStorage`.
- **Files:**
  - `src/App.tsx`: Main router and provider setup.
  - `src/components/layout/Shell.tsx`: Side/Top navigation.
  - `src/components/dashboard/PortfolioChart.tsx`: Recharts implementation.
  - `src/hooks/usePortfolio.ts`: Logic for balance, profits, and investments.
  - `src/pages/Dashboard.tsx`, `src/pages/Market.tsx`, `src/pages/Transactions.tsx`.
- **Acceptance criteria:**
  - User can "deposit" money to increase balance.
  - User can "invest" in a fund, which deducts from balance and adds to portfolio.
  - User can "withdraw" from an investment (simulating profit).
  - Data persists after page refresh.

### 2. quick_fix_engineer
- **Phases:** 5
- **Scope:** Audit the UI for consistency. Add smooth transitions between pages. Fix any alignment issues in the cards or tables.
- **Files:** `src/index.css`, various component files.
- **Depends on:** frontend_engineer
- **Acceptance criteria:**
  - Mobile view is flawless.
  - Buttons have clear hover/active states.
  - Typography is consistent with a fintech brand.
