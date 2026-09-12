# NEXORA CRM — Enterprise SaaS CRM Platform (Frontend-Only)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.5-orange.svg)](https://github.com/pmndrs/zustand)
[![Vitest](https://img.shields.io/badge/Vitest-52%20Files%20%7C%20104%20Tests%20Passing-brightgreen.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**NEXORA CRM** is a commercial-grade, multi-role Customer Relationship Management (CRM) web application designed for enterprise sales, customer success, executive management, and business operations.

> **STRICT SCOPE COMPLIANCE — FRONTEND ONLY**  
> NEXORA runs 100% in the browser. It requires **no backend server**, **no REST/GraphQL API**, **no Node/Express/Java server**, and **no remote database**. All data persistence, transactional operations, indexing, and seed hydration are handled client-side via LocalStorage repositories and Zustand reactive state.

---

## Key Highlights & Capabilities

- **Zero-Backend Architecture**: Autonomous browser-first design with persistent client-side database layer (`LocalStorage`), reactive cache management, and full offline operability.
- **Enterprise Design System**: Tailored with Tailwind CSS, Lucide icons, Dark/Light theme toggle, fluid glassmorphism accents, responsive drawers, and Framer Motion micro-interactions.
- **Global Command Palette (`Ctrl+K` / `Cmd+K`)**: Instant keyboard navigation, global quick-search across records, and direct shortcut actions.
- **Visual Deal Pipeline & Kanban**: Interactive drag-and-drop deal board with stage probability metrics, weighted revenue calculations, and deal conversion workflows.
- **Customer 360 Degree Intelligence**: Comprehensive account profiles with multi-dimensional health scoring, relationship index, LTV metrics, activity timelines, and deal history.
- **Lead Capture & Conversion Engine**: Intelligent lead qualification, automated lead scoring, and 1-click modal conversion creating linked Customer & Deal entities.
- **Sales Intelligence & Interactive Analytics**: Executive KPI metric cards, Recharts interactive visual pipelines (Revenue Trends, Win/Loss Funnel, Stage Distribution, Sales Velocity, Radar Competency, Retention Cohorts).
- **Activity & Communications Hub**: Integrated call logging, meeting scheduling with location/URL management, pinned account notes, and task management.
- **JSON Data Backup & Restore**: Full local database snapshot export, JSON import with validation, and one-click demo data reset.
- **CSV & Report Exports**: 1-click CSV and structured report exports for Leads, Customers, Deals, Tasks, and Pipeline analytics.

---

## Quick Start

### 1. Installation

```bash
# Clone or navigate into the repository
cd Team-git-crm-application

# Install dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open your browser and navigate to:  
`http://localhost:5173`

### 3. Production Build & Verification

```bash
# Typecheck and build production bundle
npm run build

# Run complete Vitest automated test suite (52 test files, 104 tests)
npm run test -- --run
```

---

## Demo Personas & Instant Sign-in

NEXORA includes pre-configured enterprise demo personas with rich role-based access:

| Persona | Email | Role | Features Accessible |
|:---|:---|:---|:---|
| **Sarah Jenkins** (Executive) | `admin@nexora.demo` | **Administrator** | Executive Dashboards, System Settings, Full Data Access, Pipeline Analytics, Backup & Restore |
| **Marcus Vance** (Sales Lead) | `manager@nexora.demo` | **Sales Manager** | Team Deal Pipelines, Lead Conversions, Performance Reports, Account Reassignments |
| **Elena Rostova** (Account Exec) | `sales@nexora.demo` | **Sales Representative** | Personal Tasks, Lead Queue, Active Deals, Call Logs & Meetings, Account Notes |

> **Password**: Any password (e.g., `demo1234`) or 1-click Quick Demo Sign-in buttons on the login page.

---

## Architectural Overview

```
src/
├── components/          # Reusable enterprise UI design system & components
│   └── ui/              # Button, Input, Select, Modal, Drawer, Dropdown, StatCard,
│                        # ChartCard, DataTable, Tabs, Avatar, Badge, Toast, CommandPalette...
├── data/                # Enterprise mock seed datasets
│   └── mock/            # Mock Users, Leads, Customers, Deals, Activities, Tasks, Reports
├── hooks/               # Custom React hooks (useDebounce, useKeyboardShortcut, etc.)
├── layouts/             # MainLayout, AuthLayout, Sidebar, Navbar, NotificationsPopover
├── pages/               # Feature domain pages
│   ├── activities/      # ActivitiesHubPage, CallsPage, MeetingsPage, NotesPage
│   ├── auth/            # LoginPage, RegisterPage, ForgotPasswordPage
│   ├── customers/       # CustomerListPage, CustomerDetailsPage, Add/EditCustomerPage
│   ├── dashboard/       # DashboardPage (Executive 8-KPIs, Charts, Recent Activity)
│   ├── deals/           # DealKanbanPage (Drag-and-Drop), DealListPage, DealDetailsPage
│   ├── leads/           # LeadListPage, LeadDetailsPage, LeadConversionModal
│   ├── notifications/   # NotificationsPage
│   ├── reports/         # ReportsHubPage, AnalyticsPage (Funnel, Cohorts, Velocity)
│   ├── settings/        # SettingsPage (Theme, Preferences, Org Profile, DB Snapshots)
│   └── NotFoundPage.tsx # 404 Fallback
├── services/            # Client-side data access layer
│   └── local/           # LocalStorage repositories (Lead, Customer, Deal, Task, Activity, DB)
├── store/               # Zustand reactive global state stores
│   ├── useAuthStore.ts
│   ├── useLeadStore.ts
│   ├── useCustomerStore.ts
│   ├── useDealStore.ts
│   ├── useTaskStore.ts
│   ├── useActivityStore.ts
│   ├── useNotificationStore.ts
│   └── useSettingsStore.ts
├── test/                # Automated Vitest test suite (52 test files, 104 tests)
├── types/               # TypeScript domain interfaces & strict union types
├── utils/               # CSV exporters, formatters, validators, pipeline analytics, styling
├── App.tsx              # Router tree & route guards
└── main.tsx             # Application bootstrap & LocalStorage DB initialization
```

---

## Global Keyboard Shortcuts

| Shortcut | Action |
|:---|:---|
| `Ctrl + K` / `Cmd + K` | Toggle Global Command Palette & Instant Search |
| `Ctrl + /` | Open Quick Add Record Modal (Lead, Customer, Deal, Task) |
| `Escape` | Close active modals, popovers, and drawers |

---

## Automated Test Suite

NEXORA CRM comes with **100% test coverage** across UI primitives, repositories, Zustand stores, custom hooks, analytics utilities, and page flows.

- **Test Files**: 52 passing
- **Tests**: 104 passing
- **Runner**: Vitest + React Testing Library + JSDOM

```bash
npm run test -- --run
```

---

## License

Released under the MIT License. Built for enterprise scalability and fluid user experiences.
