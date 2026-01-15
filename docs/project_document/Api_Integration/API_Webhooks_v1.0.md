# Smart Academy Digital Portal - Webhook Documentation

**Document Title:** Webhook Documentation
**Document ID:** API_Webhooks_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Webhook Documentation |

**Reference Documents:**
- Smart Academy API Design Document v1.0
- Smart Academy Third-Party Integration Document v1.0
- Smart Academy Security Guidelines

---

## Table of Contents

1. [Webhook Overview](#1-webhook-overview)
2. [Webhook Event Types](#2-webhook-event-types)
3. [Payload Formats](#3-payload-formats)
4. [Security (Signature Verification)](#4-security-signature-verification)
5. [Retry Logic](#5-retry-logic)
6. [Event Handling Guidelines](#6-event-handling-guidelines)
7. [Webhook Management](#7-webhook-management)
8. [Testing & Debugging](#8-testing--debugging)
9. [Best Practices](#9-best-practices)

---

## 1. Webhook Overview

### 1.1 Introduction

Webhooks are HTTP callbacks that notify external systems when specific events occur in the Smart Academy platform. They enable real-time, event-driven integrations without the need for polling.

### 1.2 Webhook Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        WEBHOOK ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    SMART ACADEMY PLATFORM                            │    │
│  │                                                                       │    │
│  │  ┌─────────────┐      ┌─────────────────┐      ┌─────────────────┐  │    │
│  │  │   Event     │      │    Webhook      │      │    Webhook      │  │    │
│  │  │   Emitter   │─────▶│    Processor    │─────▶│    Dispatcher   │  │    │
│  │  │             │      │                 │      │                 │  │    │
│  │  │ - Student   │      │ - Event Queue   │      │ - HTTP Client   │  │    │
│  │  │ - Grade     │      │ - Payload Build │      │ - Retry Logic   │  │    │
│  │  │ - Payment   │      │ - Signature Gen │      │ - Dead Letter Q │  │    │
│  │  └─────────────┘      └─────────────────┘      └─────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                      │                                       │
│                                      ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        EXTERNAL ENDPOINTS                            │    │
│  │                                                                       │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │    │
│  │  │   Parent    │  │  External   │  │   Third     │  │   Custom    │ │    │
│  │  │   App       │  │   CRM       │  │   Party     │  │   System    │ │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Webhook Endpoints

| Direction | Endpoint | Description |
|-----------|----------|-------------|
| **Outgoing** | Customer-defined | Events sent FROM Smart Academy |
| **Incoming** | `/api/v1/webhooks/payment` | Payment gateway callbacks |
| **Incoming** | `/api/v1/webhooks/sms` | SMS delivery reports |
| **Incoming** | `/api/v1/webhooks/email` | Email delivery/bounce reports |
| **Incoming** | `/api/v1/webhooks/gibbon` | Gibbon sync events |

### 1.4 Supported HTTP Methods

| Method | Usage |
|--------|-------|
| `POST` | All webhook deliveries (recommended) |
| `GET` | Verification challenges only |

---

## 2. Webhook Event Types

### 2.1 Event Categories

```
SMART ACADEMY WEBHOOK EVENTS
│
├── STUDENT EVENTS (student.*)
│   ├── student.created
│   ├── student.updated
│   ├── student.deleted
│   ├── student.enrolled
│   ├── student.transferred
│   └── student.graduated
│
├── ATTENDANCE EVENTS (attendance.*)
│   ├── attendance.marked
│   ├── attendance.updated
│   ├── attendance.absent
│   └── attendance.late
│
├── GRADE EVENTS (grade.*)
│   ├── grade.created
│   ├── grade.updated
│   ├── grade.published
│   └── grade.report_generated
│
├── PAYMENT EVENTS (payment.*)
│   ├── payment.initiated
│   ├── payment.completed
│   ├── payment.failed
│   ├── payment.refunded
│   └── payment.reminder_sent
│
├── FEE EVENTS (fee.*)
│   ├── fee.invoice_created
│   ├── fee.invoice_paid
│   ├── fee.overdue
│   └── fee.scholarship_applied
│
├── NOTIFICATION EVENTS (notification.*)
│   ├── notification.sent
│   ├── notification.delivered
│   ├── notification.failed
│   └── notification.read
│
├── ISLAMIC EDUCATION EVENTS (islamic.*)
│   ├── islamic.quran_progress_updated
│   ├── islamic.surah_completed
│   ├── islamic.milestone_achieved
│   └── islamic.hadith_assessment_completed
│
├── USER EVENTS (user.*)
│   ├── user.created
│   ├── user.updated
│   ├── user.password_changed
│   ├── user.login
│   └── user.logout
│
├── CLASS EVENTS (class.*)
│   ├── class.created
│   ├── class.updated
│   ├── class.schedule_changed
│   └── class.teacher_assigned
│
└── SYSTEM EVENTS (system.*)
    ├── system.maintenance_scheduled
    ├── system.backup_completed
    └── system.sync_completed
```

### 2.2 Event Type Details

#### 2.2.1 Student Events

| Event | Trigger | Priority |
|-------|---------|----------|
| `student.created` | New student registered | High |
| `student.updated` | Student profile updated | Medium |
| `student.deleted` | Student record deleted | High |
| `student.enrolled` | Student enrolled in class | High |
| `student.transferred` | Student transferred to another class | High |
| `student.graduated` | Student completed graduation | Medium |

#### 2.2.2 Attendance Events

| Event | Trigger | Priority |
|-------|---------|----------|
| `attendance.marked` | Daily attendance recorded | High |
| `attendance.updated` | Attendance record modified | Medium |
| `attendance.absent` | Student marked absent | Critical |
| `attendance.late` | Student marked late | High |

#### 2.2.3 Payment Events

| Event | Trigger | Priority |
|-------|---------|----------|
| `payment.initiated` | Payment process started | Medium |
| `payment.completed` | Payment successful | Critical |
| `payment.failed` | Payment failed | Critical |
| `payment.refunded` | Refund processed | High |
| `payment.reminder_sent` | Payment reminder sent | Low |

#### 2.2.4 Grade Events

| Event | Trigger | Priority |
|-------|---------|----------|
| `grade.created` | New grade entry | Medium |
| `grade.updated` | Grade modified | Medium |
| `grade.published` | Grades published to parents | High |
| `grade.report_generated` | Report card generated | Medium |

---

## 3. Payload Formats

### 3.1 Standard Webhook Payload Structure

```json
{
  "id": "evt_abc123xyz789",
  "type": "student.created",
  "api_version": "2026-01-01",
  "created_at": "2026-01-10T09:30:00Z",
  "data": {
    "object": "student",
    "id": "stu_001",
    "attributes": {
      // Event-specific data
    },
    "previous_attributes": {
      // For update events only
    }
  },
  "metadata": {
    "source": "web_portal",
    "actor": {
      "type": "user",
      "id": "usr_admin001"
    },
    "request_id": "req_xyz123"
  }
}
```

### 3.2 Event-Specific Payloads

#### 3.2.1 student.created

```json
{
  "id": "evt_stu_created_001",
  "type": "student.created",
  "api_version": "2026-01-01",
  "created_at": "2026-01-10T09:30:00Z",
  "data": {
    "object": "student",
    "id": "stu_001",
    "attributes": {
      "student_id": "SA-2026-0001",
      "first_name": "Ahmed",
      "last_name": "Rahman",
      "email": "ahmed.rahman@example.com",
      "date_of_birth": "2015-05-15",
      "gender": "male",
      "class": {
        "id": "cls_5a",
        "name": "Class 5A"
      },
      "parent": {
        "id": "par_001",
        "name": "Karim Rahman",
        "email": "karim@example.com",
        "phone": "+8801700000000"
      },
      "enrollment_date": "2026-01-10",
      "status": "active"
    }
  },
  "metadata": {
    "source": "admin_portal",
    "actor": {
      "type": "user",
      "id": "usr_admin001",
      "name": "Admin User"
    }
  }
}
```

#### 3.2.2 attendance.marked

```json
{
  "id": "evt_att_marked_001",
  "type": "attendance.marked",
  "api_version": "2026-01-01",
  "created_at": "2026-01-10T08:15:00Z",
  "data": {
    "object": "attendance_record",
    "id": "att_001",
    "attributes": {
      "class": {
        "id": "cls_5a",
        "name": "Class 5A"
      },
      "date": "2026-01-10",
      "summary": {
        "total_students": 35,
        "present": 32,
        "absent": 2,
        "late": 1
      },
      "records": [
        {
          "student_id": "stu_001",
          "student_name": "Ahmed Rahman",
          "status": "present",
          "time": "07:55:00"
        },
        {
          "student_id": "stu_002",
          "student_name": "Fatima Islam",
          "status": "absent",
          "reason": "Sick"
        }
      ],
      "marked_by": {
        "id": "usr_teacher001",
        "name": "Teacher Name"
      }
    }
  }
}
```

#### 3.2.3 attendance.absent (Critical Alert)

```json
{
  "id": "evt_att_absent_001",
  "type": "attendance.absent",
  "api_version": "2026-01-01",
  "created_at": "2026-01-10T08:30:00Z",
  "data": {
    "object": "attendance_alert",
    "id": "alert_001",
    "attributes": {
      "student": {
        "id": "stu_002",
        "name": "Fatima Islam",
        "class": "Class 5A",
        "roll_number": 15
      },
      "date": "2026-01-10",
      "reason": "Not provided",
      "excused": false,
      "parent_notified": true,
      "notification_methods": ["sms", "email", "push"],
      "parent_contact": {
        "name": "Abdul Islam",
        "phone": "+8801800000000",
        "email": "abdul@example.com"
      }
    }
  },
  "metadata": {
    "urgency": "high",
    "auto_generated": true
  }
}
```

#### 3.2.4 payment.completed

```json
{
  "id": "evt_pay_completed_001",
  "type": "payment.completed",
  "api_version": "2026-01-01",
  "created_at": "2026-01-10T10:45:00Z",
  "data": {
    "object": "payment",
    "id": "pay_001",
    "attributes": {
      "amount": 5250,
      "currency": "BDT",
      "status": "completed",
      "payment_method": "bkash",
      "transaction_id": "TXN123456789",
      "invoice": {
        "id": "inv_001",
        "type": "tuition_fee",
        "description": "January 2026 Tuition Fee",
        "due_date": "2026-01-10"
      },
      "student": {
        "id": "stu_001",
        "name": "Ahmed Rahman",
        "class": "Class 5A"
      },
      "payer": {
        "id": "par_001",
        "name": "Karim Rahman",
        "phone": "+8801700000000"
      },
      "receipt_url": "https://cdn.smartacademy.edu.bd/receipts/pay_001.pdf",
      "paid_at": "2026-01-10T10:45:00Z"
    }
  }
}
```

#### 3.2.5 grade.published

```json
{
  "id": "evt_grade_pub_001",
  "type": "grade.published",
  "api_version": "2026-01-01",
  "created_at": "2026-01-10T14:00:00Z",
  "data": {
    "object": "grade_publication",
    "id": "gp_001",
    "attributes": {
      "class": {
        "id": "cls_5a",
        "name": "Class 5A"
      },
      "subject": {
        "id": "subj_math",
        "name": "Mathematics"
      },
      "assessment": {
        "type": "class_test",
        "name": "Chapter 5 Test",
        "date": "2026-01-08",
        "total_marks": 20
      },
      "statistics": {
        "class_average": 16.5,
        "highest": 20,
        "lowest": 8,
        "students_graded": 35
      },
      "published_by": {
        "id": "usr_teacher001",
        "name": "Teacher Name"
      },
      "notification_sent": true,
      "notification_channels": ["email", "push", "in_app"]
    }
  }
}
```

#### 3.2.6 islamic.quran_progress_updated

```json
{
  "id": "evt_quran_prog_001",
  "type": "islamic.quran_progress_updated",
  "api_version": "2026-01-01",
  "created_at": "2026-01-10T11:30:00Z",
  "data": {
    "object": "quran_progress",
    "id": "qp_001",
    "attributes": {
      "student": {
        "id": "stu_001",
        "name": "Ahmed Rahman",
        "class": "Class 5A"
      },
      "surah": {
        "number": 48,
        "name": "Al-Fath",
        "name_arabic": "الفتح"
      },
      "progress": {
        "verses_memorized": 18,
        "total_verses": 29,
        "percentage": 62.07,
        "verses_added": 3
      },
      "assessment": {
        "tajweed_score": 90,
        "fluency_score": 88,
        "overall_score": 89
      },
      "teacher": {
        "id": "usr_islamic001",
        "name": "Maulana Abdullah"
      },
      "notes": "Good progress, memorized verses 16-18 today"
    }
  }
}
```

#### 3.2.7 islamic.surah_completed (Milestone)

```json
{
  "id": "evt_surah_complete_001",
  "type": "islamic.surah_completed",
  "api_version": "2026-01-01",
  "created_at": "2026-01-10T12:00:00Z",
  "data": {
    "object": "surah_completion",
    "id": "sc_001",
    "attributes": {
      "student": {
        "id": "stu_001",
        "name": "Ahmed Rahman",
        "class": "Class 5A"
      },
      "surah": {
        "number": 47,
        "name": "Muhammad",
        "name_arabic": "محمد",
        "total_verses": 38
      },
      "completion_details": {
        "started_date": "2025-11-01",
        "completed_date": "2026-01-10",
        "days_taken": 70,
        "final_assessment_score": 95
      },
      "certificate": {
        "generated": true,
        "url": "https://cdn.smartacademy.edu.bd/certificates/quran/stu_001_surah_47.pdf"
      },
      "total_surahs_completed": 47,
      "overall_quran_progress": 41.23,
      "next_surah": {
        "number": 48,
        "name": "Al-Fath"
      }
    }
  },
  "metadata": {
    "celebration": true,
    "parent_notification": true,
    "announcement": true
  }
}
```

---

## 4. Security (Signature Verification)

### 4.1 HMAC-SHA256 Signature

All outgoing webhooks include a cryptographic signature for verification:

```http
POST /your-webhook-endpoint HTTP/1.1
Content-Type: application/json
X-Webhook-ID: evt_abc123xyz789
X-Webhook-Timestamp: 1704880200
X-Webhook-Signature: sha256=abc123def456...
X-Webhook-Version: v1
```

### 4.2 Signature Generation

```typescript
// How Smart Academy generates the signature
function generateWebhookSignature(
  payload: string,
  timestamp: number,
  secret: string
): string {
  const signaturePayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signaturePayload, 'utf8')
    .digest('hex');

  return `sha256=${signature}`;
}
```

### 4.3 Signature Verification (Receiver)

```typescript
// How to verify the webhook signature
function verifyWebhookSignature(
  payload: string,
  timestamp: string,
  receivedSignature: string,
  secret: string
): boolean {
  // Check timestamp to prevent replay attacks (5 minute tolerance)
  const timestampMs = parseInt(timestamp) * 1000;
  const now = Date.now();
  const tolerance = 5 * 60 * 1000; // 5 minutes

  if (Math.abs(now - timestampMs) > tolerance) {
    throw new Error('Webhook timestamp expired');
  }

  // Generate expected signature
  const signaturePayload = `${timestamp}.${payload}`;
  const expectedSignature = `sha256=${crypto
    .createHmac('sha256', secret)
    .update(signaturePayload, 'utf8')
    .digest('hex')}`;

  // Constant-time comparison
  return crypto.timingSafeEqual(
    Buffer.from(receivedSignature),
    Buffer.from(expectedSignature)
  );
}

// Example usage
app.post('/webhook', async (req, res) => {
  const payload = JSON.stringify(req.body);
  const timestamp = req.headers['x-webhook-timestamp'];
  const signature = req.headers['x-webhook-signature'];

  try {
    const isValid = verifyWebhookSignature(
      payload,
      timestamp,
      signature,
      process.env.WEBHOOK_SECRET
    );

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Process webhook
    await processWebhook(req.body);

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
```

### 4.4 IP Whitelisting (Optional)

For additional security, webhook requests originate from these IP addresses:

```
Production:
  - 103.xxx.xxx.xxx/32
  - 103.xxx.xxx.xxx/32

Staging:
  - 103.xxx.xxx.xxx/32
```

### 4.5 Webhook Secret Management

```typescript
// Webhook secrets are unique per endpoint
interface WebhookEndpoint {
  id: string;
  url: string;
  secret: string; // 32-byte random string
  events: string[];
  active: boolean;
  created_at: Date;
}

// Generate new webhook secret
function generateWebhookSecret(): string {
  return crypto.randomBytes(32).toString('hex');
}
```

---

## 5. Retry Logic

### 5.1 Retry Policy

Smart Academy automatically retries failed webhook deliveries:

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEBHOOK RETRY SCHEDULE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Attempt 1: Immediate                                           │
│       │                                                          │
│       ├── Success (2xx) ──▶ Done                                │
│       │                                                          │
│       └── Failure ──▶ Retry Queue                               │
│                           │                                      │
│  Attempt 2: After 1 minute                                      │
│       │                                                          │
│       ├── Success ──▶ Done                                      │
│       │                                                          │
│       └── Failure ──▶ Retry Queue                               │
│                           │                                      │
│  Attempt 3: After 5 minutes                                     │
│       │                                                          │
│       ├── Success ──▶ Done                                      │
│       │                                                          │
│       └── Failure ──▶ Retry Queue                               │
│                           │                                      │
│  Attempt 4: After 30 minutes                                    │
│       │                                                          │
│       ├── Success ──▶ Done                                      │
│       │                                                          │
│       └── Failure ──▶ Retry Queue                               │
│                           │                                      │
│  Attempt 5: After 2 hours                                       │
│       │                                                          │
│       ├── Success ──▶ Done                                      │
│       │                                                          │
│       └── Failure ──▶ Retry Queue                               │
│                           │                                      │
│  Attempt 6: After 8 hours                                       │
│       │                                                          │
│       ├── Success ──▶ Done                                      │
│       │                                                          │
│       └── Failure ──▶ Dead Letter Queue                         │
│                           │                                      │
│                           ▼                                      │
│                    Alert Admin                                   │
│                    Mark endpoint as failing                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Retry Configuration

| Attempt | Delay | Total Time |
|---------|-------|------------|
| 1 | Immediate | 0 |
| 2 | 1 minute | 1 minute |
| 3 | 5 minutes | 6 minutes |
| 4 | 30 minutes | 36 minutes |
| 5 | 2 hours | 2h 36m |
| 6 | 8 hours | 10h 36m |

### 5.3 Success/Failure Criteria

**Success:**
- HTTP status code 2xx (200, 201, 202, 204)

**Failure (Will Retry):**
- HTTP status code 5xx
- Connection timeout (30 seconds)
- Connection refused
- DNS resolution failure

**Permanent Failure (No Retry):**
- HTTP status code 4xx (except 408, 429)
- SSL/TLS certificate errors
- Response indicates permanent failure

### 5.4 Rate Limiting Response

If you return HTTP 429 (Too Many Requests), include `Retry-After` header:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
Content-Type: application/json

{
  "error": "rate_limited",
  "retry_after": 60
}
```

---

## 6. Event Handling Guidelines

### 6.1 Idempotency

All webhook handlers must be idempotent. The same event may be delivered multiple times.

```typescript
// Store processed event IDs to prevent duplicate processing
async function handleWebhook(event: WebhookEvent): Promise<void> {
  // Check if already processed
  const processed = await redis.get(`webhook:processed:${event.id}`);
  if (processed) {
    console.log(`Event ${event.id} already processed, skipping`);
    return;
  }

  try {
    // Process the event
    await processEvent(event);

    // Mark as processed (TTL: 7 days)
    await redis.setex(`webhook:processed:${event.id}`, 604800, '1');
  } catch (error) {
    console.error(`Error processing event ${event.id}:`, error);
    throw error;
  }
}
```

### 6.2 Asynchronous Processing

Always respond quickly (< 5 seconds) and process asynchronously:

```typescript
// CORRECT: Queue for async processing
app.post('/webhook', async (req, res) => {
  const isValid = verifyWebhookSignature(req);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Acknowledge immediately
  res.status(200).json({ received: true });

  // Queue for background processing
  await webhookQueue.add('process-webhook', {
    event: req.body,
    receivedAt: Date.now(),
  });
});

// WRONG: Synchronous processing
app.post('/webhook', async (req, res) => {
  // This may timeout!
  await sendEmail(req.body.data);
  await updateDatabase(req.body.data);
  await notifyExternalSystem(req.body.data);

  res.status(200).json({ received: true });
});
```

### 6.3 Event Ordering

Events are delivered in approximate order but strict ordering is not guaranteed. Use `created_at` timestamp for ordering:

```typescript
async function handleStudentEvents(events: WebhookEvent[]): Promise<void> {
  // Sort by timestamp
  const sortedEvents = events.sort((a, b) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  for (const event of sortedEvents) {
    await processEvent(event);
  }
}
```

### 6.4 Error Handling

```typescript
async function processWebhookEvent(event: WebhookEvent): Promise<void> {
  const handlers: Record<string, (data: any) => Promise<void>> = {
    'student.created': handleStudentCreated,
    'student.updated': handleStudentUpdated,
    'attendance.marked': handleAttendanceMarked,
    'payment.completed': handlePaymentCompleted,
    // ... more handlers
  };

  const handler = handlers[event.type];
  if (!handler) {
    console.warn(`Unhandled event type: ${event.type}`);
    return; // Don't throw, just log
  }

  try {
    await handler(event.data);
  } catch (error) {
    // Log error for debugging
    console.error(`Error handling ${event.type}:`, error);

    // Report to monitoring
    reportWebhookError(event, error);

    // Re-throw if you want Smart Academy to retry
    throw error;
  }
}
```

---

## 7. Webhook Management

### 7.1 Registering Webhook Endpoints

```http
POST /api/v1/webhooks/endpoints
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "url": "https://your-server.com/webhooks/smart-academy",
  "events": [
    "student.created",
    "student.updated",
    "attendance.absent",
    "payment.completed",
    "grade.published"
  ],
  "description": "Main integration endpoint"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "wh_endpoint_001",
    "url": "https://your-server.com/webhooks/smart-academy",
    "secret": "whsec_abc123xyz789...",
    "events": [
      "student.created",
      "student.updated",
      "attendance.absent",
      "payment.completed",
      "grade.published"
    ],
    "status": "active",
    "created_at": "2026-01-10T10:00:00Z"
  }
}
```

### 7.2 Listing Webhook Endpoints

```http
GET /api/v1/webhooks/endpoints
Authorization: Bearer <admin_token>
```

### 7.3 Updating Webhook Endpoint

```http
PUT /api/v1/webhooks/endpoints/{endpoint_id}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "url": "https://new-server.com/webhooks",
  "events": ["student.created", "payment.completed"],
  "status": "active"
}
```

### 7.4 Deleting Webhook Endpoint

```http
DELETE /api/v1/webhooks/endpoints/{endpoint_id}
Authorization: Bearer <admin_token>
```

### 7.5 Rotating Webhook Secret

```http
POST /api/v1/webhooks/endpoints/{endpoint_id}/rotate-secret
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "old_secret_expires_at": "2026-01-11T10:00:00Z",
    "new_secret": "whsec_new123xyz..."
  }
}
```

### 7.6 Viewing Webhook Delivery Logs

```http
GET /api/v1/webhooks/endpoints/{endpoint_id}/deliveries
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "del_001",
      "event_id": "evt_abc123",
      "event_type": "student.created",
      "status": "delivered",
      "http_status": 200,
      "response_time_ms": 150,
      "attempts": 1,
      "created_at": "2026-01-10T09:30:00Z",
      "delivered_at": "2026-01-10T09:30:00Z"
    },
    {
      "id": "del_002",
      "event_id": "evt_def456",
      "event_type": "payment.completed",
      "status": "failed",
      "http_status": 500,
      "error": "Internal Server Error",
      "attempts": 3,
      "next_retry_at": "2026-01-10T10:00:00Z",
      "created_at": "2026-01-10T09:45:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total_count": 150
  }
}
```

---

## 8. Testing & Debugging

### 8.1 Test Webhook Endpoint

Send a test event to verify endpoint configuration:

```http
POST /api/v1/webhooks/endpoints/{endpoint_id}/test
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "event_type": "student.created"
}
```

### 8.2 Replay Failed Webhook

Replay a specific failed delivery:

```http
POST /api/v1/webhooks/deliveries/{delivery_id}/retry
Authorization: Bearer <admin_token>
```

### 8.3 Webhook CLI Testing

```bash
# Using cURL to simulate webhook
curl -X POST https://your-endpoint.com/webhooks \
  -H "Content-Type: application/json" \
  -H "X-Webhook-ID: evt_test_001" \
  -H "X-Webhook-Timestamp: $(date +%s)" \
  -H "X-Webhook-Signature: sha256=test_signature" \
  -d '{
    "id": "evt_test_001",
    "type": "student.created",
    "created_at": "2026-01-10T10:00:00Z",
    "data": {
      "object": "student",
      "id": "stu_test_001",
      "attributes": {
        "first_name": "Test",
        "last_name": "Student"
      }
    }
  }'
```

### 8.4 Local Development with ngrok

```bash
# Start ngrok tunnel
ngrok http 3000

# Register ngrok URL as webhook endpoint
# https://abc123.ngrok.io/webhooks
```

---

## 9. Best Practices

### 9.1 Do's

| Practice | Description |
|----------|-------------|
| Return 2xx quickly | Acknowledge within 5 seconds |
| Process asynchronously | Queue events for background processing |
| Verify signatures | Always validate webhook signatures |
| Handle duplicates | Implement idempotency |
| Log everything | Log all webhook deliveries for debugging |
| Set up monitoring | Alert on high failure rates |
| Use HTTPS | Only accept webhooks over HTTPS |

### 9.2 Don'ts

| Anti-Pattern | Why |
|--------------|-----|
| Synchronous processing | Causes timeouts and retries |
| Ignoring signatures | Security vulnerability |
| No idempotency | Duplicate processing |
| No logging | Hard to debug issues |
| Blocking responses | Triggers unnecessary retries |

### 9.3 Sample Webhook Handler (Node.js/Express)

```typescript
import express from 'express';
import crypto from 'crypto';
import { Queue } from 'bullmq';

const app = express();
const webhookQueue = new Queue('webhooks');

// Raw body parser for signature verification
app.use('/webhooks', express.raw({ type: 'application/json' }));

app.post('/webhooks/smart-academy', async (req, res) => {
  const rawBody = req.body.toString();
  const timestamp = req.headers['x-webhook-timestamp'] as string;
  const signature = req.headers['x-webhook-signature'] as string;
  const eventId = req.headers['x-webhook-id'] as string;

  // 1. Verify signature
  try {
    if (!verifySignature(rawBody, timestamp, signature)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  // 2. Check for duplicate
  const isDuplicate = await checkDuplicate(eventId);
  if (isDuplicate) {
    return res.status(200).json({ received: true, duplicate: true });
  }

  // 3. Acknowledge immediately
  res.status(200).json({ received: true });

  // 4. Queue for async processing
  const event = JSON.parse(rawBody);
  await webhookQueue.add(event.type, {
    event,
    receivedAt: Date.now(),
  });

  // 5. Mark as received
  await markEventReceived(eventId);
});

function verifySignature(
  payload: string,
  timestamp: string,
  signature: string
): boolean {
  const secret = process.env.WEBHOOK_SECRET!;
  const tolerance = 5 * 60 * 1000; // 5 minutes

  const timestampMs = parseInt(timestamp) * 1000;
  if (Math.abs(Date.now() - timestampMs) > tolerance) {
    throw new Error('Timestamp expired');
  }

  const expected = `sha256=${crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest('hex')}`;

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// Background worker
const worker = new Worker('webhooks', async (job) => {
  const { event } = job.data;

  switch (event.type) {
    case 'student.created':
      await handleStudentCreated(event.data);
      break;
    case 'attendance.absent':
      await handleAttendanceAbsent(event.data);
      break;
    case 'payment.completed':
      await handlePaymentCompleted(event.data);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
});
```

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 10, 2026 | Development Team | Initial Webhook Documentation |

---

## References

- [Webhook Best Practices Guide](https://inventivehq.com/blog/webhook-best-practices-guide)
- [Stripe Webhooks Implementation](https://www.hooklistener.com/learn/stripe-webhooks-implementation)
- [Event-Driven Architecture with Webhooks](https://apidog.com/blog/comprehensive-guide-to-webhooks-and-eda/)
- [Webhook Signature Verification](https://apidog.com/blog/webhook-signature-verification/)
- [Smart Academy API Design Document v1.0](./API_Design_Document_v1.0.md)

---

*End of Webhook Documentation*
