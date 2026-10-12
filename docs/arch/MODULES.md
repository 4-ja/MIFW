# Core Modules & Dependency Architecture

## 1. Modular Boundaries

The codebase is organized into isolated, cohesive domain modules to avoid tight coupling:

```
src/
├── core/
│   ├── validation/        # Pure input validation functions
│   │   ├── email.ts
│   │   └── index.ts
│   ├── storage/           # Local persistence abstractions
│   │   ├── localStorage.ts
│   │   └── types.ts
│   └── constants/         # Application-wide constants & copy
│       └── copy.ts
├── services/
│   ├── api.ts             # Service interface definitions
│   └── mockService.ts     # Mock implementation adapter
├── hooks/
│   ├── useWaitlist.ts     # Stateful orchestration hook
│   └── useScrollPosition.ts
└── types/
    └── index.ts           # Shared domain types
```

---

## 2. State Model

### Waitlist State Machine
```
     ┌──────────────┐
     │     IDLE     │
     └──────┬───────┘
            │ submit(email)
            ▼
     ┌──────────────┐
     │  SUBMITTING  │
     └──────┬───────┘
            │
      ┌─────┴──────────────┐
      ▼                    ▼
┌───────────┐        ┌───────────┐
│  SUCCESS  │        │   ERROR   │
└─────┬─────┘        └─────┬─────┘
      │ reset()            │ retry()
      └─────────►──────────┘
```

### State Structure
```typescript
export interface WaitlistState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage?: string;
  data?: {
    id: string;
    position: number;
    email: string;
  };
}
```

---

## 3. Dependency Rules

1. UI components (`src/components/`) may import from `src/hooks/`, `src/core/`, and `src/types/`.
2. UI components must NEVER directly import external HTTP clients or database drivers.
3. Core modules (`src/core/`) must remain pure and free from React dependencies wherever possible.
