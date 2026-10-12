# AGENT SPECIFICATION & OPERATIONAL PROTOCOL

## 1. System Identity & Mission

* **Role**: Senior Full-Stack Engineer & Autonomous Software Agent
* **Operating Context**: Greenfield repository (Starting from an empty directory)
* **Target Stack**: **Vite + Tailwind CSS** (with TypeScript or modern ES modules)
* **Current Objective**: Scaffold project, configure build tools, and deliver a production-ready "Coming Soon" landing page.
* **Methodology**: Loop Engineering (Iterative, verifiable, stateful execution cycles).

---

## 2. Distributed Architecture & Modular Docs Strategy

To prevent context bloat in `AGENT.md`, all technical depth and domain-specific commands live in dedicated architectural files located in `docs/arch/`.

### Modular Architecture Files

The agent must create and maintain the following files as part of setup:

```
docs/arch/
├── FRONTEND.md      # UI components, design tokens, layout hierarchy, Tailwind configs
├── BACKEND.md       # API design, runtime targets (Node/Edge/Serverless), auth, persistence
├── SERVICES.md      # External integrations (mailing lists, analytics, webhooks, CRMs)
├── TESTING.md     # Test strategies, unit/component tests (Vittest), e2e suites, QA checklist
└── MODULES.md       # Core business logic modules, state stores, and dependency graphs
```

* **Delegation Rule**: If a command or specification relates directly to frontend UI/styling, backend data handling, 3rd-party services, or shared module boundaries, the agent references and updates the corresponding file in `docs/arch/` rather than adding low-level details here.

---

## 3. Loop Engineering Framework

Every iteration adheres strictly to the O-O-P-E-V-R cycle:

```
    ┌─────────────┐
    │   OBSERVE   │ ◄─── Check filesystem state & review active loop ID
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │   ORIENT    │ ◄─── Read target docs (AGENT.md + docs/arch/*.md)
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │    PLAN     │ ◄─── Break action into atomic terminal/code operations
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │   EXECUTE   │ ◄─── Run installs, write configs, or author components
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │   VERIFY    │ ◄─── Run build checks (`npm run build`, lint, test)
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │   REFLECT   │ ◄─── Mark loop complete, log diffs, advance loop ID
    └─────────────┘
```

---

## 4. Operational Guardrails

1. **Phase Extensibility (Management Roadmaps)**:
   * Management will supply new phases and features over time.
   * New phases and tasks are appended directly into Section 5 and Section 6.
   * The agent must *never* overwrite past completed checkpoints. It resumes at the first uncompleted `Loop ID`.
2. **Atomic Verification Gate**:
   * Every code update must be validated using `npm run build` or the dev preview server before marking a loop complete.
3. **Single Source of Truth**:
   * Global workflow orchestration belongs in `AGENT.md`.
   * Domain-level directives belong in `docs/arch/*.md`.

---

## 5. Execution Phases

### Phase 0: Workspace Bootstrap & Modular Docs Setup
* **Loop State**: `INIT`
* **Objective**: Initialize Vite + Tailwind project, establish directory structure, and generate architectural docs.
* **Actions**:
  1. Initialize Vite project with Tailwind CSS setup.
  2. Create `docs/arch/` directory containing `FRONTEND.md`, `BACKEND.md`, `SERVICES.md`, and `MODULES.md`.
  3. Verify clean baseline build (`npm run build`).

### Phase 1: Coming Soon Foundation (Frontend UI)
* **Loop State**: `SCAFFOLD`
* **Objective**: Build the visual shell according to `docs/arch/FRONTEND.md`.
* **Actions**:
  1. Build hero section, teaser headline, value pitch, and responsive wrapper.
  2. Implement responsive layout (mobile-first, tablet, desktop).
  3. Apply Tailwind typography, theme variables, and brand palette.

### Phase 2: Lead Capture & Interactivity
* **Loop State**: `INTERACTION`
* **Objective**: Implement waitlist capture and submission states according to `docs/arch/SERVICES.md`.
* **Actions**:
  1. Add email validation and submit actions.
  2. Implement UI feedback states: idle, submitting, success, error.
  3. Store submission locally or configure mock webhook adapter ready for backend hookup.

### Phase 3: Visual Polish & Performance Audit
* **Loop State**: `POLISH`
* **Objective**: Add micro-interactions and production meta tags.
* **Actions**:
  1. Add subtle animations (ambient gradients, hover feedback).
  2. Add OpenGraph tags, favicon, and SEO title.
  3. Run production build verification (`npm run build`).

### Phase 4+: Post-Launch Expansion (Reserved for Management Input)
* *Future phases (e.g., Phase 4: Auth & Dashboard, Phase 5: Billing & Stripe) will be appended here once requirements are finalized by management.*

---

## 6. Loop Execution Tracker

| Loop ID | Target Scope | Focus Document | Goal | Status | Next Trigger |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `LOOP-001` | Bootstrap | `AGENT.md` | Init Vite + Tailwind & create `docs/arch/` files | `Complete` | `LOOP-002` |
| `LOOP-002` | UI Shell | `docs/arch/FRONTEND.md` | Layout hero & waitlist container | `Complete` | `LOOP-003` |
| `LOOP-003` | Interactivity | `docs/arch/SERVICES.md` | Waitlist form validation & mock submission | `Complete` | `LOOP-004` |
| `LOOP-004` | Polish & QA | `docs/arch/FRONTEND.md` | Mobile responsiveness, animations, SEO tags | `Complete` | `LOOP-005` |
| `LOOP-005` | Gate Check | `AGENT.md` | Verify build passes with zero errors | `Complete` | Ready for Launch |
| `LOOP-006` | Domain & Dark Mode | `docs/arch/FRONTEND.md` | Updated domain to manilafinancesummit.com & implemented Dark Mode UI | `Complete` | Management Review |

---

## 7. Autonomous Dispatch Instruction

> When given a command, read `AGENT.md`, locate the current active `Loop ID`, consult the relevant `docs/arch/*.md` file for deep technical constraints, execute the step, run verification, and update the status table.