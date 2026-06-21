# Smart Personal Finance Assistant (Frontend Client)

A fully featured, responsive, and beautifully crafted React frontend for an AI-powered Personal Finance Assistant. This interface allows users to seamlessly budget and track investments with an inline chat helper.

## Tech Stack Overview

- **Framework**: React 18 with TypeScript 5
- **Build Infrastructure**: Vite 6
- **Styling**: Tailwind CSS v4 (incorporating modern CSS-only theme configurations)
- **Networking**: Axios client with custom timestamping interceptors and normalized ApiError formatting
- **Animations**: `motion` layout and micro-transitions
- **Testing**: Vitest with React Testing Library (RTL) & JSDOM environment

---

## File Structure Map

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseSummary.tsx
│   │   ├── QuickActions.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── Header.tsx
│   ├── hooks/
│   │   ├── useChat.ts
│   │   └── useExpenses.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── formatters.ts
│   ├── tests/
│   │   ├── formatters.test.ts
│   │   ├── useExpenses.test.ts
│   │   └── ChatInterface.test.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── favicon.ico
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

---

## Essential Commands

### Development Server
Starts the application locally on Port 3000:
```bash
npm run dev
```

### Build Production assets
Computes standard optimized Static bundles:
```bash
npm run build
```

### Running Test Suite Passes
Executes all unit and integration test assertions using Vitest:
```bash
npm run test
```

### Static Type-Checking
Performs schema and diagnostic validations:
```bash
npm run type-check
```

---

## Key Features Built & Assured

1. **Performance**: Optimized rendering using memoization (`React.memo` on message bubbles and expense breakdown lists) and dynamic lazy loading (`React.lazy` on Summary charts).
2. **Robust Sanitization**: Input fields are strictly scrubbed to prevent cross-site scripting (XSS) via safe regex HTML and script-stripping expressions.
3. **Accessibility**: Screen readers are supported through proper semantic layouts (`<main>`, `<header>`), state indicators (`aria-busy`), and error labels (`aria-describedby` & `aria-invalid`).
4. **Cohesive Design**: Structured following a sophisticated dark slate twilight visual motif with high-contrast text alignments.
