# External Services & Integrations Architecture

## 1. Overview

This document specifies integrations with external platforms, CRM connectors, analytics engines, and webhook pipelines for capturing and dispatching lead data.

---

## 2. Integration Adapters Strategy

To maintain decoupling, all service communication is mediated through a unified interface:

```typescript
export interface WaitlistServiceAdapter {
  submitLead(payload: WaitlistSubmission): Promise<SubmissionResult>;
}
```

### Supported Adapters

1. **`MockServiceAdapter` (Default in Dev / Pre-launch)**:
   - Simulates API dispatch with artificial delay.
   - Saves records to localStorage or console telemetry.
   - Supports failure simulation for UI error testing.

2. **`WebhookServiceAdapter`**:
   - Dispatches standard JSON POST payload to a configurable webhook URL (e.g. Make.com, Zapier, n8n, Slack notification webhook).
   - Configurable HMAC signature headers for tamper resistance.

3. **`EmailMarketingAdapter`**:
   - Resend / ConvertKit / Mailchimp API integration.
   - Automatically tags subscriber with `tag: "early-adopter"` and sends double opt-in confirmation.

---

## 3. Analytics & Telemetry

- **Privacy-first Analytics**: Support Plausible / Umami / Google Analytics 4.
- **Tracked Events**:
  - `page_view`: Landing page loaded.
  - `waitlist_focus`: User focused the email input field.
  - `waitlist_attempt`: User clicked submit.
  - `waitlist_success`: Successful response received.
  - `waitlist_error`: Validation or network error encountered.

---

## 4. Webhook Payload Schema

When dispatching leads to external endpoints:

```json
{
  "event": "lead.created",
  "timestamp": 1776000000,
  "lead": {
    "id": "wl_98234ab12",
    "email": "lead@example.com",
    "position": 1248,
    "source": "landing_page"
  }
}
```
