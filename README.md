## ⚡ CodeForge
Modern, local-first coding practice and problem-solving platform

### Overview
CodeForge is an interactive web app where you can practice algorithms and data structures using a real-time code editor, browse a curated problem set, filter by topic and difficulty, run against sample test cases, and track your progress — all client-side with persistent local storage.

Built with React + TypeScript, Vite, Tailwind CSS, shadcn/ui (Radix UI), Zustand, and Monaco Editor. No backend is required; the experience is instantaneous and local-first.

### Quick links
- Live dev: npm run dev → open http://localhost:5173
- Main entry: src/main.tsx, src/App.tsx
- State/store: src/store/useStore.ts
- Problems dataset: src/data/problems.ts
- Editor: src/components/CodeEditor.tsx

---

## 🚀 Features
- Multiple languages in-editor: JavaScript, TypeScript, Python, C++, Java
- Monaco-based editor with IDE-like UX: dark theme, word wrap, minimap disabled, proper line numbers
- Problem library with metadata: examples, constraints, tags, acceptance, submissions, companies
- Powerful filters: difficulty, tags, status, full-text search
- Local-first persistence: progress, code drafts, submissions, sessions via zustand + localStorage
- Submission history: view past attempts, code, language, and per-test results
- Hints system: reveal per-problem hints; track hints used in sessions
- Problem stats widgets: acceptance rate, time spent, hints used, company tags
- Auth simulation: in-app signup/login stored locally; protected routes
- Polished UI: Tailwind CSS + shadcn/ui (Radix primitives) + Lucide icons + framer-motion animations
- Routing: react-router-dom with auth guard

---

## 🧭 How it works (high level)
1. Data source: Problems are defined statically in src/data/problems.ts with fields like id, title, difficulty, description, examples, constraints, testCases, tags, acceptance, submissions, hints, companies.
2. Routing and auth: src/App.tsx wires routes with react-router-dom. The RequireAuth component checks useStore().isLoggedIn and redirects to /login if needed.
3. State management: src/store/useStore.ts uses Zustand with persist to keep userProgress (solved/attempted/bookmarked, codeByProblem, submissions, sessions, streak) and lightweight user accounts in localStorage under codeforge-storage.
4. Problem browsing: src/pages/Problems.tsx reads filters from the store and derives the filtered list from getFilteredProblems() combining the static dataset + user status overlays.
5. Problem detail: src/pages/ProblemDetail.tsx displays content tabs (description, examples, constraints) and loads the coding workspace (CodeEditor).
6. Code editing: src/components/CodeEditor.tsx embeds Monaco Editor, auto-saves drafts per problem and language, provides quick templates, custom tests, and mock execution against the problem’s sample tests. Passing all tests marks the problem solved.
7. Running code: Execution is simulated client-side (no sandbox/back-end). CodeEditor.tsx uses a small mapping of known inputs→outputs; CodeRunner.tsx offers an alternate runner UI with randomized pass rates for demo.
8. History and stats: addSubmission() stores each run’s results; CodeHistory.tsx and ProblemStats.tsx visualize progress, time-on-task, and usage.

---

## 🛠 Tech stack

### Core
- React 18 + TypeScript
- Vite 5 (with @vitejs/plugin-react-swc)
- Zustand 5 (with persist + localStorage)
- React Router DOM 6
- @tanstack/react-query 5 (ready for async/data fetching needs)

### UI/UX
- TailwindCSS 3 + tailwindcss-animate + tailwind-merge
- shadcn/ui components built atop Radix UI primitives
- Radix UI: accordion, dialog, dropdown, popover, select, tabs, toast, tooltip, etc.
- Lucide React icons
- framer-motion for micro-animations

### Editor & visualization
- @monaco-editor/react
- recharts, embla-carousel-react (available for charts/carousels)

### Forms & validation
- react-hook-form + @hookform/resolvers + zod

### Utilities
- clsx, class-variance-authority, date-fns, sonner (toasts), react-resizable-panels

### Tooling
- ESLint 9 (eslint, @eslint/js, typescript-eslint)
- TypeScript 5
- PostCSS + Autoprefixer

### Scripts (package.json)
- dev: start Vite dev server
- build: production build
- build:dev: development-mode build
- preview: preview production build
- lint: run ESLint

---

## 📂 Project structure
```plaintext
Top-level

public/                 # Static assets (favicon, robots)
src/                    # Application code
  components/           # App components
    CodeEditor.tsx      # Monaco editor, language switcher, autosave, mock run
    CodeRunner.tsx      # Alternate runner UI (mock), progress/results
    CodeHistory.tsx     # Modal viewer for submissions history
    HintsPanel.tsx      # Collapsible hints with reveal tracking
    ProblemStats.tsx    # Stats for acceptance/time/hints/companies
    ui/                 # shadcn/ui components (Radix-based)
  data/
    problems.ts         # Problem definitions and all available tags
  hooks/                # `use-toast`, `use-mobile`
  lib/
    utils.ts            # helpers (e.g., className merger)
  pages/                # Route pages (Home, Problems, ProblemDetail, etc.)
  store/
    useStore.ts         # Zustand store with persist & all actions/selectors
  types/
    problem.ts          # Problem, session, submission, filters, user types
  App.tsx               # Router + providers (Query, Tooltip, Toasters)
  main.tsx              # React root creation
tailwind.config.ts      # Tailwind config
vite.config.ts          # Vite config
eslint.config.js        # ESLint config

```
---


## 🔐 Auth model (local, demo)
- Users are stored client-side in the Zustand store and persisted to localStorage.
- login(username, password) and signup() simply manage an in-memory list with persistence; there is no server.
- RequireAuth component guards routes; redirects unauthenticated users to /login while preserving from location.

Security note: Because auth is purely client-side for demo purposes, do not use this as-is for production.

---

## 💾 State and persistence
All progress is stored locally via Zustand persist under the key codeforge-storage:
- userProgress.solved, attempted, bookmarked
- userProgress.codeByProblem[problemId][language] for autosaved editor drafts
- userProgress.submissions[problemId] (list of CodeSubmission)
- userProgress.sessions[problemId] with startTime, totalTime, hintsUsed
- streak scaffolding exists for future expansion

Important actions in useStore.ts:
- markProblemSolved(problemId) / markProblemAttempted(problemId)
- saveCode(problemId, language, code) / getCode(problemId, language)
- toggleBookmark(problemId)
- addSubmission(problemId, submission) / getSubmissions(problemId)
- startSession(problemId) / updateSession(problemId, hintsUsed) / endSession(problemId)
- getFilteredProblems() overlays user status onto static dataset and applies filters
- getProblemById(id) returns a problem augmented with user status

---

## ✍ Editor and runner behavior
- The Monaco editor initializes with a language-specific template and auto-saves after 1s idle.
- The run functionality is mocked for demo:
  - CodeEditor.tsx has a simulateCodeExecution map for a subset of known test inputs.
  - CodeRunner.tsx generates randomized pass/fail results (70% pass rate) and execution times.
- When all mocked tests pass, the problem is marked as solved and a submission is recorded.
- You can enter custom input in CodeEditor.tsx to observe the mock output mapping.

Limitations of mock execution:
- There is no sandbox or real code execution. Integrating a real runner requires a backend service or in-browser sandbox (e.g., WebContainers, Pyodide, WASI) and security hardening.

---

## 🧩 Types
See src/types/problem.ts for:
- Problem, Example, TestCase, ProblemFilters
- UserProgress, CodeSubmission, ProblemSession, User

These ensure type-safe store operations and consistent problem definitions.

---

## 🎨 Design system
- TailwindCSS utility classes define color tokens like bg-gradient-card, bg-editor-bg, bg-code-bg, and status colors (success/destructive).
- shadcn/ui + Radix primitives provide composable, accessible components (button, card, select, dialog, tabs, toast, tooltip, etc.).
- lucide-react icons unify iconography.
- framer-motion adds subtle entrance and feedback animations across pages.

---

## 🧪 Linting and code style
- ESLint configured for React, hooks, and TypeScript.
- Run npm run lint to check code.
- Coding conventions: clear names, types for public APIs, early returns, minimal nesting, and comments for non-trivial logic.

---

## ▶ Getting started

### Prerequisites
- Node.js 18+ (recommended), npm 9+

### Install & run

npm install
npm run dev

Open http://localhost:5173.

### Build & preview

npm run build
npm run preview


### Lint

npm run lint


---

## 🔍 Key routes
Defined in src/App.tsx (guarded by RequireAuth):
- /login — login/signup page
- / — Home
- /problems — listing with filters
- /problem/:id — detail page with editor
- /dashboard, /leaderboard, /community, /account — additional sections
- * — NotFound catch-all

---

## 📈 Performance notes
- Vite + SWC for fast dev and builds
- Local data avoids network latency
- Monaco minimized options (no minimap) and automaticLayout to keep UI responsive
- Derived filtering is O(n) on a small local dataset; acceptable for demo scale

---

## ⚠ Limitations and roadmap

### Current limitations
- Mocked code execution; no real runner/sandbox
- Client-side auth only; not secure for production
- Dataset is static and small; no server sync

### Potential enhancements
- Real execution backend or in-browser sandboxes per language
- Server-backed auth and user profiles
- Cloud sync of progress and submissions
- Richer problem sets, pagination, and community features (discussions, likes)
- Leaderboard fed by real submission metrics

---

## ❓ FAQ
- *Can I add new problems?* Yes. Extend src/data/problems.ts with new Problem objects; ensure id is unique.
- *How do I integrate a real code runner?* Replace the mock execution in CodeEditor.tsx/CodeRunner.tsx with API calls to a secured sandbox service. Consider queueing, resource limits, and language toolchains.
- *Where is user data stored?* In the browser’s localStorage via Zustand persist under the key codeforge-storage.
- *Why can I access pages only after login?* RequireAuth checks useStore().isLoggedIn; unauthenticated users are redirected to /login.

---

## 📝 License
This project is provided for educational/demo purposes. Adapt licensing as needed for your use case.
