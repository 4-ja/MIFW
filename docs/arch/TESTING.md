# Testing Architecture & Verification Protocols

## 1. Testing Philosophy & Tiers

The project follows an atomic verification gate strategy aligned with Loop Engineering. Every iteration must be verifiable and repeatable.

```
       ▲
      / \     E2E (Playwright - Critical User Flows)
     /   \    Component Integration (Vitest + Testing Library)
    /     \   Unit Tests (Pure utility & validator functions)
   /_______\  Static Verification (TypeScript strict compiler + linter)
```

---

## 2. Test Suites & Focus Areas

### 2.1 Static Verification Gate
- `tsc -b`: Type safety check across application and configs.
- `npm run lint`: oxlint or ESLint for syntax, unreachable code, and unused variables.

### 2.2 Unit & Module Tests
- **Email Validator**:
  - Valid RFC formats accepted.
  - Common typos rejected (`user@.com`, `user@domain`, empty string).
  - Trimming leading/trailing whitespace.
- **State Store**:
  - Transition flow: `IDLE` -> `SUBMITTING` -> `SUCCESS` or `ERROR`.
  - Resets on retry or modal dismiss.

### 2.3 Component & Accessibility Testing
- Inputs have accessible labels or aria-attributes.
- Contrast ratios pass WCAG AA standards.
- Form operates with keyboard-only navigation (Tab, Enter, Escape).

---

## 3. QA Checklist for Release Gates

- [ ] `npm run build` exits with code 0 without warnings or errors.
- [ ] Viewport checks:
  - [ ] Mobile portrait (375px width).
  - [ ] Tablet (768px width).
  - [ ] Desktop (1280px+ width).
- [ ] Form submission feedback states clearly visible on all screen sizes.
- [ ] SEO metadata, viewport meta, title, and favicon loaded properly.
