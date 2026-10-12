# Backend Architecture Specification

## 1. Overview & Strategy

While the pre-launch phase operates primarily as a client-side Vite application, a solid backend architecture ensures seamless transition to production serverless or containerized runtimes.

---

## 2. Target Runtimes

- **Phase 0-2 (Current/Mock Phase)**: Client-side storage adapter & simulated network delay (deterministic mock).
- **Production Target**: Serverless Edge Function (Vercel Serverless / Cloudflare Workers / Node.js Express microservice).

---

## 3. API Contract: Waitlist Submission

### 3.1 Endpoint Specification

`POST /api/waitlist`

#### Request Headers
- `Content-Type: application/json`
- `Accept: application/json`

#### Request Payload
```json
{
  "email": "user@example.com",
  "source": "landing_page",
  "referrer": "direct",
  "metadata": {
    "timestamp": "2026-10-12T09:44:00Z",
    "userAgent": "Mozilla/5.0..."
  }
}
```

#### Validation Rules
1. `email`: Required, valid RFC 5322 email string, max length 254 characters.
2. `source`: Optional string, default `"landing_page"`.
3. Honeypot check: `hp_field` must be empty (bot protection).

#### Response Schemas

**Success (`201 Created` or `200 OK`)**:
```json
{
  "status": "success",
  "data": {
    "id": "wl_98234ab12",
    "email": "user@example.com",
    "position": 1248,
    "createdAt": "2026-10-12T09:44:00Z"
  },
  "message": "Successfully registered for early access."
}
```

**Conflict / Already Registered (`409 Conflict`)**:
```json
{
  "status": "error",
  "code": "DUPLICATE_ENTRY",
  "message": "This email is already on the waitlist."
}
```

**Invalid Input (`422 Unprocessable Entity`)**:
```json
{
  "status": "error",
  "code": "VALIDATION_FAILED",
  "message": "Please provide a valid email address.",
  "errors": {
    "email": ["Invalid email format"]
  }
}
```

---

## 4. Persistence Architecture

### 4.1 Mock Adapter (`LocalPersistenceAdapter`)
- Stored in browser `localStorage` under `mifis_waitlist_entries`.
- Simulated network latency: 400ms – 800ms.
- Enforces duplicate detection and timestamp tracking.

### 4.2 Production Persistence Targets
- Relational: PostgreSQL (via Supabase or Neon) with table `waitlist_leads` (`id`, `email`, `created_at`, `status`, `ip_hash`).
- Document/KV: Cloudflare KV or Redis for high-throughput rate-limited queues.

---

## 5. Security & Rate Limiting

- **Rate Limiting**: Sliding window of 5 requests per IP per minute.
- **Bot Mitigation**: Hidden honeypot field + submission latency verification (>1000ms from page render).
- **Data Privacy**: Emails hashed or sanitized; compliance with standard opt-in regulations.
