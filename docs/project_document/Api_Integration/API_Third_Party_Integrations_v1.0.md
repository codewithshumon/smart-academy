# Smart Academy Digital Portal - Third-Party Integration Specifications

**Document Title:** Third-Party Integration Specifications
**Document ID:** API_Third_Party_Integrations_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Third-Party Integration Document |

**Reference Documents:**
- Smart Academy API Design Document v1.0
- Smart Academy Technology Stack v1.0
- Gibbon Comprehensive Documentation
- Moodle Comprehensive Documentation

---

## Table of Contents

1. [Integration Overview](#1-integration-overview)
2. [Gibbon API Integration](#2-gibbon-api-integration)
3. [Moodle API Integration](#3-moodle-api-integration)
4. [Payment Gateway Integration](#4-payment-gateway-integration)
5. [SMS Gateway Integration](#5-sms-gateway-integration)
6. [Email Service Integration](#6-email-service-integration)
7. [Video Conferencing Integration](#7-video-conferencing-integration)
8. [Google Workspace Integration](#8-google-workspace-integration)
9. [Security Considerations](#9-security-considerations)
10. [Error Handling & Monitoring](#10-error-handling--monitoring)

---

## 1. Integration Overview

### 1.1 Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SMART ACADEMY INTEGRATION ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    SMART ACADEMY CORE PLATFORM                         │ │
│  │                                                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │                   Integration Service Layer                      │   │ │
│  │  │                                                                   │   │ │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │   │ │
│  │  │  │ Gibbon   │  │ Moodle   │  │ Payment  │  │ Communication    │ │   │ │
│  │  │  │ Adapter  │  │ Adapter  │  │ Adapter  │  │ Adapter          │ │   │ │
│  │  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│       ┌────────────────────────────┼────────────────────────────┐           │
│       │                            │                            │           │
│       ▼                            ▼                            ▼           │
│  ┌─────────────┐  ┌─────────────────────────────┐  ┌─────────────────────┐ │
│  │   GIBBON    │  │      MOODLE LMS             │  │  EXTERNAL SERVICES  │ │
│  │    SMS      │  │                             │  │                     │ │
│  │             │  │  ┌────────┐  ┌────────────┐ │  │  ┌───────────────┐  │ │
│  │  Student    │  │  │ Courses│  │ Gradebook  │ │  │  │ Payment       │  │ │
│  │  Records    │  │  └────────┘  └────────────┘ │  │  │ Gateways      │  │ │
│  │  Attendance │  │  ┌────────┐  ┌────────────┐ │  │  │ - bKash       │  │ │
│  │  Grades     │  │  │ Assign │  │ Enrollment │ │  │  │ - Nagad       │  │ │
│  │  Finance    │  │  └────────┘  └────────────┘ │  │  │ - SSLCommerz  │  │ │
│  │             │  │                             │  │  └───────────────┘  │ │
│  │  MySQL DB   │  │         MySQL DB            │  │                     │ │
│  └─────────────┘  └─────────────────────────────┘  │  ┌───────────────┐  │ │
│                                                     │  │ Communication │  │ │
│                                                     │  │ - SMS Gateway │  │ │
│                                                     │  │ - SendGrid    │  │ │
│                                                     │  │ - AWS SES     │  │ │
│                                                     │  └───────────────┘  │ │
│                                                     │                     │ │
│                                                     │  ┌───────────────┐  │ │
│                                                     │  │ Conferencing  │  │ │
│                                                     │  │ - Zoom        │  │ │
│                                                     │  │ - Google Meet │  │ │
│                                                     │  └───────────────┘  │ │
│                                                     │                     │ │
│                                                     │  ┌───────────────┐  │ │
│                                                     │  │ Google        │  │ │
│                                                     │  │ Workspace     │  │ │
│                                                     │  └───────────────┘  │ │
│                                                     └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Integration Summary

| Integration | Type | Priority | Status |
|-------------|------|----------|--------|
| Gibbon SMS | Database Sync + API | Critical | Planned |
| Moodle LMS | REST API + SSO | Critical | Planned |
| bKash | REST API | High | Planned |
| Nagad | REST API | High | Planned |
| SSLCommerz | REST API | High | Planned |
| SMS Gateway | REST API | High | Planned |
| SendGrid/SES | REST API | High | Planned |
| Zoom | OAuth + REST API | Medium | Planned |
| Google Meet | OAuth + Calendar API | Medium | Planned |
| Google Workspace | OAuth + APIs | Medium | Planned |

---

## 2. Gibbon API Integration

### 2.1 Overview

Gibbon serves as the core Student Management System (SMS) for Smart Academy. Integration involves:
- Database synchronization for student records
- Real-time data exchange via scheduled jobs
- User authentication bridging

### 2.2 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              GIBBON AUTHENTICATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User Login to Smart Academy Portal                             │
│              │                                                   │
│              ▼                                                   │
│  ┌───────────────────────────┐                                  │
│  │ Smart Academy Auth Server │                                  │
│  │                           │                                  │
│  │  1. Validate credentials  │                                  │
│  │  2. Check Gibbon DB       │                                  │
│  │  3. Generate JWT          │                                  │
│  └───────────────────────────┘                                  │
│              │                                                   │
│              ▼                                                   │
│  ┌───────────────────────────┐                                  │
│  │    Gibbon MySQL Database  │                                  │
│  │                           │                                  │
│  │  Query: gibbonPerson      │                                  │
│  │  Verify: passwordHash     │                                  │
│  │  Fetch: user details      │                                  │
│  └───────────────────────────┘                                  │
│              │                                                   │
│              ▼                                                   │
│  Return JWT Token with Gibbon User ID                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Database Synchronization

#### 2.3.1 Sync Configuration

```typescript
// config/gibbon-sync.config.ts
export const gibbonSyncConfig = {
  database: {
    host: process.env.GIBBON_DB_HOST,
    port: parseInt(process.env.GIBBON_DB_PORT || '3306'),
    database: process.env.GIBBON_DB_NAME,
    user: process.env.GIBBON_DB_USER,
    password: process.env.GIBBON_DB_PASSWORD,
    connectionLimit: 10,
  },
  sync: {
    students: {
      schedule: '0 */15 * * * *', // Every 15 minutes
      batchSize: 100,
    },
    attendance: {
      schedule: '0 */5 * * * *', // Every 5 minutes
      batchSize: 500,
    },
    grades: {
      schedule: '0 */30 * * * *', // Every 30 minutes
      batchSize: 200,
    },
    timetables: {
      schedule: '0 0 * * * *', // Every hour
      batchSize: 50,
    },
  },
};
```

#### 2.3.2 Gibbon Table Mappings

| Gibbon Table | Smart Academy Table | Sync Direction |
|--------------|---------------------|----------------|
| `gibbonPerson` | `users` | Gibbon → Smart Academy |
| `gibbonStudent` | `students` | Bidirectional |
| `gibbonFamily` | `families` | Gibbon → Smart Academy |
| `gibbonAttendance` | `attendance_records` | Bidirectional |
| `gibbonMarkbookEntry` | `grade_entries` | Bidirectional |
| `gibbonCourse` | `courses` | Gibbon → Smart Academy |
| `gibbonCourseClass` | `class_sections` | Gibbon → Smart Academy |
| `gibbonTT` | `timetables` | Gibbon → Smart Academy |
| `gibbonFinanceInvoice` | `invoices` | Bidirectional |
| `gibbonFinancePayment` | `payments` | Smart Academy → Gibbon |

#### 2.3.3 Student Sync Query

```sql
-- Fetch students from Gibbon
SELECT
    gp.gibbonPersonID AS gibbon_id,
    gp.surname AS last_name,
    gp.preferredName AS first_name,
    gp.officialName AS official_name,
    gp.dob AS date_of_birth,
    gp.gender,
    gp.email,
    gp.phone1 AS phone,
    gs.gibbonStudentID AS student_gibbon_id,
    gs.dateStart AS enrollment_date,
    gs.status,
    gf.gibbonFormGroupID AS form_group_id,
    gfg.name AS form_group_name,
    gysg.gibbonYearGroupID AS year_group_id,
    gyg.name AS year_group_name
FROM gibbonPerson gp
INNER JOIN gibbonStudentEnrolment gse
    ON gp.gibbonPersonID = gse.gibbonPersonID
INNER JOIN gibbonStudent gs
    ON gp.gibbonPersonID = gs.gibbonPersonID
LEFT JOIN gibbonFormGroup gfg
    ON gse.gibbonFormGroupID = gfg.gibbonFormGroupID
LEFT JOIN gibbonYearGroup gyg
    ON gse.gibbonYearGroupID = gyg.gibbonYearGroupID
WHERE gse.gibbonSchoolYearID = :currentSchoolYear
    AND gp.status = 'Full'
    AND gp.dateStart <= CURDATE()
    AND (gp.dateEnd IS NULL OR gp.dateEnd >= CURDATE())
ORDER BY gp.surname, gp.preferredName;
```

#### 2.3.4 Attendance Sync

```typescript
// services/gibbon/attendance-sync.service.ts
interface GibbonAttendanceRecord {
  gibbonAttendanceLogPersonID: number;
  gibbonPersonID: number;
  date: string;
  type: 'Present' | 'Absent' | 'Late' | 'Left Early';
  reason: string | null;
  timestampTaken: string;
  gibbonPersonIDTaker: number;
}

export async function syncAttendanceFromGibbon(
  date: string
): Promise<SyncResult> {
  const gibbonRecords = await fetchGibbonAttendance(date);

  const transformedRecords = gibbonRecords.map(record => ({
    student_id: mapGibbonToSmartId(record.gibbonPersonID),
    date: record.date,
    status: mapAttendanceStatus(record.type),
    reason: record.reason,
    marked_by: mapGibbonToSmartId(record.gibbonPersonIDTaker),
    marked_at: record.timestampTaken,
    source: 'gibbon',
    gibbon_id: record.gibbonAttendanceLogPersonID,
  }));

  return await upsertAttendanceRecords(transformedRecords);
}

function mapAttendanceStatus(gibbonType: string): string {
  const mapping: Record<string, string> = {
    'Present': 'present',
    'Absent': 'absent',
    'Late': 'late',
    'Left Early': 'left_early',
    'Present - Remote': 'present_remote',
  };
  return mapping[gibbonType] || 'unknown';
}
```

### 2.4 Webhook Configuration

Gibbon supports custom hooks that can trigger on data changes:

```php
// Gibbon Custom Module: Smart Academy Webhook
// modules/SmartAcademySync/hooks/studentUpdate.php

function smartAcademyStudentUpdateHook($gibbonPersonID, $data) {
    $webhookUrl = getSettingByScope('SmartAcademy', 'webhookUrl');
    $apiKey = getSettingByScope('SmartAcademy', 'apiKey');

    $payload = [
        'event' => 'student.updated',
        'timestamp' => date('c'),
        'data' => [
            'gibbon_id' => $gibbonPersonID,
            'changes' => $data,
        ],
    ];

    $ch = curl_init($webhookUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'X-API-Key: ' . $apiKey,
        'X-Webhook-Signature: ' . generateSignature($payload, $apiKey),
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
}
```

---

## 3. Moodle API Integration

### 3.1 Overview

Moodle serves as the Learning Management System (LMS) for Smart Academy, providing:
- Online course delivery
- Assignment submission and grading
- Virtual classroom features
- Learning resources management

### 3.2 SSO Implementation

#### 3.2.1 OAuth 2.0 Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                 MOODLE SSO AUTHENTICATION FLOW                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. User clicks "Go to Learning Portal"                         │
│              │                                                   │
│              ▼                                                   │
│  ┌───────────────────────────────────────┐                      │
│  │      Smart Academy Portal             │                      │
│  │                                        │                      │
│  │  Generate OAuth state token           │                      │
│  │  Store in Redis with user context     │                      │
│  └───────────────────────────────────────┘                      │
│              │                                                   │
│              ▼                                                   │
│  2. Redirect to Moodle OAuth endpoint                           │
│     /login/oauth2/authorize?                                    │
│       client_id=smartacademy&                                   │
│       redirect_uri=https://portal.smartacademy.edu.bd/auth/     │
│         moodle/callback&                                        │
│       state={state_token}&                                      │
│       scope=openid profile email                                │
│              │                                                   │
│              ▼                                                   │
│  ┌───────────────────────────────────────┐                      │
│  │           Moodle LMS                   │                      │
│  │                                        │                      │
│  │  Validate OAuth client                │                      │
│  │  Auto-login if session exists         │                      │
│  │  OR create user from Smart Academy    │                      │
│  └───────────────────────────────────────┘                      │
│              │                                                   │
│              ▼                                                   │
│  3. Redirect back with authorization code                       │
│              │                                                   │
│              ▼                                                   │
│  4. Exchange code for access token                              │
│              │                                                   │
│              ▼                                                   │
│  5. User logged into Moodle                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 3.2.2 SSO Configuration

```typescript
// config/moodle-sso.config.ts
export const moodleSSOConfig = {
  oauth: {
    clientId: process.env.MOODLE_CLIENT_ID,
    clientSecret: process.env.MOODLE_CLIENT_SECRET,
    authorizeUrl: `${process.env.MOODLE_URL}/admin/oauth2callback.php`,
    tokenUrl: `${process.env.MOODLE_URL}/login/token.php`,
    redirectUri: `${process.env.APP_URL}/auth/moodle/callback`,
    scopes: ['read', 'write'],
  },
  webservice: {
    baseUrl: process.env.MOODLE_URL,
    token: process.env.MOODLE_WS_TOKEN,
    service: 'smartacademy_integration',
  },
};
```

### 3.3 Grade Synchronization

#### 3.3.1 Moodle Gradebook API

```typescript
// services/moodle/grade-sync.service.ts
interface MoodleGradeItem {
  itemid: number;
  itemname: string;
  itemtype: string;
  categoryid: number;
  outcomeid: number | null;
  scaleid: number | null;
  grademax: number;
  grademin: number;
}

interface MoodleUserGrade {
  userid: number;
  grade: number;
  str_grade: string;
  feedback: string;
  dategraded: number;
}

export async function fetchMoodleGrades(
  courseId: number,
  userIds: number[]
): Promise<MoodleGradeResponse> {
  const response = await moodleWebService.call('gradereport_user_get_grades_table', {
    courseid: courseId,
    userid: userIds.join(','),
  });

  return response;
}

export async function pushGradeToMoodle(
  gradeData: {
    itemId: number;
    userId: number;
    grade: number;
    feedback?: string;
  }
): Promise<boolean> {
  const response = await moodleWebService.call('core_grades_update_grades', {
    source: 'smartacademy',
    courseid: gradeData.courseId,
    component: 'mod_assign',
    activityid: gradeData.activityId,
    itemnumber: 0,
    grades: [{
      studentid: gradeData.userId,
      grade: gradeData.grade,
      str_feedback: gradeData.feedback || '',
    }],
  });

  return response.success;
}
```

#### 3.3.2 Grade Sync Schedule

```typescript
// jobs/moodle-grade-sync.job.ts
export const moodleGradeSyncJob = {
  name: 'moodle-grade-sync',
  schedule: '0 */30 * * * *', // Every 30 minutes

  async execute(): Promise<void> {
    const activeCourses = await getActiveMoodleCourses();

    for (const course of activeCourses) {
      const enrolledStudents = await getMoodleEnrollments(course.id);
      const grades = await fetchMoodleGrades(course.id, enrolledStudents);

      await syncGradesToSmartAcademy(course.id, grades);
    }
  },
};
```

### 3.4 Course Enrollment

```typescript
// services/moodle/enrollment.service.ts
export async function enrollUserInCourse(
  userId: number,
  courseId: number,
  roleId: number = 5 // Student role
): Promise<EnrollmentResult> {
  const response = await moodleWebService.call('enrol_manual_enrol_users', {
    enrolments: [{
      roleid: roleId,
      userid: userId,
      courseid: courseId,
      timestart: Math.floor(Date.now() / 1000),
      timeend: 0, // No end date
      suspend: 0,
    }],
  });

  return {
    success: !response.exception,
    userId,
    courseId,
    enrolledAt: new Date(),
  };
}

export async function unenrollUserFromCourse(
  userId: number,
  courseId: number
): Promise<boolean> {
  const response = await moodleWebService.call('enrol_manual_unenrol_users', {
    enrolments: [{
      userid: userId,
      courseid: courseId,
    }],
  });

  return !response.exception;
}
```

### 3.5 Moodle Web Service Endpoints

| Function | Moodle API | Description |
|----------|------------|-------------|
| Get Users | `core_user_get_users` | Retrieve user information |
| Create User | `core_user_create_users` | Create new Moodle user |
| Get Courses | `core_course_get_courses` | List courses |
| Get Enrollments | `core_enrol_get_enrolled_users` | List enrolled users |
| Enroll User | `enrol_manual_enrol_users` | Enroll user in course |
| Get Grades | `gradereport_user_get_grades_table` | Get user grades |
| Update Grade | `core_grades_update_grades` | Update grade entry |
| Get Assignments | `mod_assign_get_assignments` | List assignments |
| Get Submissions | `mod_assign_get_submissions` | Get assignment submissions |

---

## 4. Payment Gateway Integration

### 4.1 bKash Integration

#### 4.1.1 Overview

bKash is the leading mobile financial service in Bangladesh. Integration uses their Checkout API.

#### 4.1.2 Configuration

```typescript
// config/bkash.config.ts
export const bkashConfig = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://checkout.pay.bka.sh/v1.2.0-beta'
    : 'https://checkout.sandbox.bka.sh/v1.2.0-beta',
  appKey: process.env.BKASH_APP_KEY,
  appSecret: process.env.BKASH_APP_SECRET,
  username: process.env.BKASH_USERNAME,
  password: process.env.BKASH_PASSWORD,
  callbackUrl: `${process.env.APP_URL}/api/v1/payments/bkash/callback`,
};
```

#### 4.1.3 Authentication Flow

```typescript
// services/payment/bkash.service.ts
interface BkashTokenResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export async function getBkashToken(): Promise<string> {
  // Check cache first
  const cachedToken = await redis.get('bkash:access_token');
  if (cachedToken) return cachedToken;

  const response = await fetch(`${bkashConfig.baseUrl}/checkout/token/grant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': bkashConfig.username,
      'password': bkashConfig.password,
    },
    body: JSON.stringify({
      app_key: bkashConfig.appKey,
      app_secret: bkashConfig.appSecret,
    }),
  });

  const data: BkashTokenResponse = await response.json();

  // Cache token (expires in 1 hour, cache for 55 minutes)
  await redis.setex('bkash:access_token', 3300, data.id_token);

  return data.id_token;
}
```

#### 4.1.4 Create Payment

```typescript
// services/payment/bkash.service.ts
interface BkashCreatePaymentRequest {
  amount: string;
  currency: string;
  intent: 'sale' | 'authorization';
  merchantInvoiceNumber: string;
  callbackURL: string;
}

interface BkashPaymentResponse {
  paymentID: string;
  bkashURL: string;
  callbackURL: string;
  successCallbackURL: string;
  failureCallbackURL: string;
  cancelledCallbackURL: string;
  amount: string;
  intent: string;
  currency: string;
  paymentCreateTime: string;
  transactionStatus: string;
  merchantInvoiceNumber: string;
}

export async function createBkashPayment(
  invoice: Invoice
): Promise<BkashPaymentResponse> {
  const token = await getBkashToken();

  const payload: BkashCreatePaymentRequest = {
    amount: invoice.amount.toString(),
    currency: 'BDT',
    intent: 'sale',
    merchantInvoiceNumber: invoice.id,
    callbackURL: bkashConfig.callbackUrl,
  };

  const response = await fetch(`${bkashConfig.baseUrl}/checkout/payment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
      'X-APP-Key': bkashConfig.appKey,
    },
    body: JSON.stringify(payload),
  });

  const data: BkashPaymentResponse = await response.json();

  // Store payment ID for verification
  await redis.setex(
    `bkash:payment:${data.paymentID}`,
    3600,
    JSON.stringify({ invoiceId: invoice.id, amount: invoice.amount })
  );

  return data;
}
```

#### 4.1.5 Execute Payment (Callback Handler)

```typescript
// services/payment/bkash.service.ts
export async function executeBkashPayment(
  paymentId: string
): Promise<PaymentResult> {
  const token = await getBkashToken();

  const response = await fetch(`${bkashConfig.baseUrl}/checkout/payment/execute/${paymentId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
      'X-APP-Key': bkashConfig.appKey,
    },
  });

  const data = await response.json();

  if (data.transactionStatus === 'Completed') {
    // Get stored invoice info
    const storedData = await redis.get(`bkash:payment:${paymentId}`);
    const { invoiceId } = JSON.parse(storedData);

    // Update payment record
    await updatePaymentStatus({
      invoiceId,
      status: 'completed',
      transactionId: data.trxID,
      paymentMethod: 'bkash',
      gatewayResponse: data,
    });

    return {
      success: true,
      transactionId: data.trxID,
      amount: parseFloat(data.amount),
    };
  }

  return {
    success: false,
    error: data.statusMessage,
  };
}
```

### 4.2 Nagad Integration

#### 4.2.1 Configuration

```typescript
// config/nagad.config.ts
export const nagadConfig = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://api.mynagad.com/api/dfs'
    : 'https://sandbox.mynagad.com:10080/remote-payment-gateway-1.0/api/dfs',
  merchantId: process.env.NAGAD_MERCHANT_ID,
  merchantPrivateKey: process.env.NAGAD_PRIVATE_KEY,
  nagadPublicKey: process.env.NAGAD_PUBLIC_KEY,
  callbackUrl: `${process.env.APP_URL}/api/v1/payments/nagad/callback`,
};
```

#### 4.2.2 Create Payment

```typescript
// services/payment/nagad.service.ts
import crypto from 'crypto';

function generateSignature(data: object, privateKey: string): string {
  const sign = crypto.createSign('SHA256');
  sign.update(JSON.stringify(data));
  return sign.sign(privateKey, 'base64');
}

export async function createNagadPayment(
  invoice: Invoice
): Promise<NagadPaymentResponse> {
  const orderId = `SA-${Date.now()}-${invoice.id}`;
  const dateTime = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);

  const sensitiveData = {
    merchantId: nagadConfig.merchantId,
    orderId,
    dateTime,
    amount: invoice.amount.toString(),
    challenge: generateRandomString(32),
  };

  const encryptedSensitiveData = encryptWithPublicKey(
    JSON.stringify(sensitiveData),
    nagadConfig.nagadPublicKey
  );

  const signature = generateSignature(sensitiveData, nagadConfig.merchantPrivateKey);

  const response = await fetch(
    `${nagadConfig.baseUrl}/check-out/initialize/${nagadConfig.merchantId}/${orderId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-KM-IP-V4': getServerIp(),
        'X-KM-Client-Type': 'PC_WEB',
        'X-KM-Api-Version': 'v-0.2.0',
      },
      body: JSON.stringify({
        dateTime,
        sensitiveData: encryptedSensitiveData,
        signature,
      }),
    }
  );

  return await response.json();
}
```

### 4.3 SSLCommerz Integration

#### 4.3.1 Configuration

```typescript
// config/sslcommerz.config.ts
export const sslcommerzConfig = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://securepay.sslcommerz.com'
    : 'https://sandbox.sslcommerz.com',
  storeId: process.env.SSLCOMMERZ_STORE_ID,
  storePassword: process.env.SSLCOMMERZ_STORE_PASSWORD,
  successUrl: `${process.env.APP_URL}/api/v1/payments/sslcommerz/success`,
  failUrl: `${process.env.APP_URL}/api/v1/payments/sslcommerz/fail`,
  cancelUrl: `${process.env.APP_URL}/api/v1/payments/sslcommerz/cancel`,
  ipnUrl: `${process.env.APP_URL}/api/v1/webhooks/sslcommerz`,
};
```

#### 4.3.2 Initialize Session

```typescript
// services/payment/sslcommerz.service.ts
interface SSLCommerzInitRequest {
  store_id: string;
  store_passwd: string;
  total_amount: number;
  currency: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url: string;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  cus_add1: string;
  cus_city: string;
  cus_country: string;
  product_name: string;
  product_category: string;
  product_profile: string;
  shipping_method: string;
  num_of_item: number;
}

export async function initSSLCommerzPayment(
  invoice: Invoice,
  customer: Customer
): Promise<SSLCommerzResponse> {
  const transactionId = `SMART-${Date.now()}-${invoice.id}`;

  const payload: SSLCommerzInitRequest = {
    store_id: sslcommerzConfig.storeId,
    store_passwd: sslcommerzConfig.storePassword,
    total_amount: invoice.amount,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: sslcommerzConfig.successUrl,
    fail_url: sslcommerzConfig.failUrl,
    cancel_url: sslcommerzConfig.cancelUrl,
    ipn_url: sslcommerzConfig.ipnUrl,
    cus_name: `${customer.firstName} ${customer.lastName}`,
    cus_email: customer.email,
    cus_phone: customer.phone,
    cus_add1: customer.address.street,
    cus_city: customer.address.city,
    cus_country: 'Bangladesh',
    product_name: `Fee Payment - ${invoice.description}`,
    product_category: 'Education',
    product_profile: 'non-physical-goods',
    shipping_method: 'NO',
    num_of_item: 1,
  };

  const response = await fetch(
    `${sslcommerzConfig.baseUrl}/gwprocess/v4/api.php`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(payload as any).toString(),
    }
  );

  const data = await response.json();

  if (data.status === 'SUCCESS') {
    await storeTransactionMapping(transactionId, invoice.id);
    return {
      success: true,
      gatewayUrl: data.GatewayPageURL,
      sessionKey: data.sessionkey,
    };
  }

  throw new PaymentError('SSLCommerz initialization failed', data);
}
```

### 4.4 Payment Gateway Selection Logic

```typescript
// services/payment/payment-gateway.service.ts
export async function processPayment(
  invoice: Invoice,
  paymentMethod: PaymentMethod,
  customer: Customer
): Promise<PaymentInitResult> {
  switch (paymentMethod) {
    case 'bkash':
      return await createBkashPayment(invoice);

    case 'nagad':
      return await createNagadPayment(invoice);

    case 'card':
    case 'internet_banking':
      return await initSSLCommerzPayment(invoice, customer);

    default:
      throw new Error(`Unsupported payment method: ${paymentMethod}`);
  }
}
```

---

## 5. SMS Gateway Integration

### 5.1 Overview

Smart Academy integrates with Bangladesh SMS gateways for:
- OTP verification
- Attendance notifications
- Fee reminders
- Emergency alerts

### 5.2 Supported Providers

| Provider | API Type | Priority |
|----------|----------|----------|
| BulkSMSBD | REST API | Primary |
| SSL Wireless | REST API | Secondary |
| Infobip | REST API | Fallback |

### 5.3 SMS Service Implementation

```typescript
// services/sms/sms.service.ts
interface SMSConfig {
  provider: 'bulksmsbd' | 'sslwireless' | 'infobip';
  apiKey: string;
  senderId: string;
  baseUrl: string;
}

interface SMSRequest {
  to: string | string[];
  message: string;
  type?: 'text' | 'unicode';
}

export class SMSService {
  private config: SMSConfig;

  constructor(config: SMSConfig) {
    this.config = config;
  }

  async send(request: SMSRequest): Promise<SMSResult> {
    const phones = Array.isArray(request.to) ? request.to : [request.to];
    const normalizedPhones = phones.map(this.normalizePhone);

    try {
      switch (this.config.provider) {
        case 'bulksmsbd':
          return await this.sendViaBulkSMSBD(normalizedPhones, request.message);
        case 'sslwireless':
          return await this.sendViaSSLWireless(normalizedPhones, request.message);
        case 'infobip':
          return await this.sendViaInfobip(normalizedPhones, request.message);
      }
    } catch (error) {
      // Fallback to next provider
      return await this.sendWithFallback(normalizedPhones, request.message);
    }
  }

  private normalizePhone(phone: string): string {
    // Remove non-digits
    let cleaned = phone.replace(/\D/g, '');

    // Handle Bangladesh numbers
    if (cleaned.startsWith('0')) {
      cleaned = '88' + cleaned;
    } else if (!cleaned.startsWith('88')) {
      cleaned = '88' + cleaned;
    }

    return cleaned;
  }

  private async sendViaBulkSMSBD(
    phones: string[],
    message: string
  ): Promise<SMSResult> {
    const response = await fetch(`${this.config.baseUrl}/api/smsapi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.config.apiKey,
        senderid: this.config.senderId,
        number: phones.join(','),
        message,
        type: 'text',
      }),
    });

    const data = await response.json();

    return {
      success: data.response_code === 202,
      messageId: data.message_id,
      cost: data.cost,
    };
  }
}
```

### 5.4 SMS Templates

```typescript
// config/sms-templates.ts
export const smsTemplates = {
  otp: {
    en: 'Your Smart Academy OTP is: {otp}. Valid for 5 minutes.',
    bn: 'আপনার Smart Academy OTP: {otp}. ৫ মিনিট বৈধ।',
  },
  attendanceAbsent: {
    en: 'Dear Parent, Your child {studentName} was absent today ({date}) at Smart Academy.',
    bn: 'প্রিয় অভিভাবক, আপনার সন্তান {studentName} আজ ({date}) Smart Academy-তে অনুপস্থিত ছিল।',
  },
  feeReminder: {
    en: 'Dear Parent, Fee of BDT {amount} for {studentName} is due on {dueDate}. Please pay to avoid late charges.',
    bn: 'প্রিয় অভিভাবক, {studentName} এর {amount} টাকা ফি {dueDate} তারিখে দেয়। বিলম্ব চার্জ এড়াতে অনুগ্রহ করে পরিশোধ করুন।',
  },
  gradePublished: {
    en: 'Grades for {subject} have been published. Login to Smart Academy portal to view.',
    bn: '{subject} এর ফলাফল প্রকাশিত হয়েছে। দেখতে Smart Academy পোর্টালে লগইন করুন।',
  },
};
```

---

## 6. Email Service Integration

### 6.1 Overview

Smart Academy supports multiple email providers with automatic failover:
- **Primary:** SendGrid (high deliverability)
- **Secondary:** AWS SES (cost-effective for bulk)
- **Development:** Mailtrap (testing)

### 6.2 SendGrid Integration

```typescript
// services/email/sendgrid.service.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailRequest {
  to: string | string[];
  subject: string;
  template?: string;
  templateData?: Record<string, any>;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
}

export async function sendEmail(request: EmailRequest): Promise<EmailResult> {
  const msg: sgMail.MailDataRequired = {
    to: request.to,
    from: {
      email: 'noreply@smartacademy.edu.bd',
      name: 'Smart Academy',
    },
    subject: request.subject,
    ...(request.template
      ? {
          templateId: request.template,
          dynamicTemplateData: request.templateData,
        }
      : {
          html: request.html,
          text: request.text,
        }),
    attachments: request.attachments,
  };

  try {
    const [response] = await sgMail.send(msg);
    return {
      success: response.statusCode === 202,
      messageId: response.headers['x-message-id'],
    };
  } catch (error) {
    console.error('SendGrid error:', error);
    // Fallback to AWS SES
    return await sendViaAWSSES(request);
  }
}
```

### 6.3 AWS SES Integration

```typescript
// services/email/ses.service.ts
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function sendViaAWSSES(request: EmailRequest): Promise<EmailResult> {
  const command = new SendEmailCommand({
    Source: 'Smart Academy <noreply@smartacademy.edu.bd>',
    Destination: {
      ToAddresses: Array.isArray(request.to) ? request.to : [request.to],
    },
    Message: {
      Subject: {
        Data: request.subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: request.html,
          Charset: 'UTF-8',
        },
        Text: {
          Data: request.text,
          Charset: 'UTF-8',
        },
      },
    },
  });

  const response = await sesClient.send(command);

  return {
    success: true,
    messageId: response.MessageId,
  };
}
```

### 6.4 Email Templates

```typescript
// config/email-templates.ts
export const emailTemplates = {
  sendgrid: {
    welcome: 'd-xxxxxxxxxxxxx',
    passwordReset: 'd-xxxxxxxxxxxxx',
    feeInvoice: 'd-xxxxxxxxxxxxx',
    gradeReport: 'd-xxxxxxxxxxxxx',
    attendanceReport: 'd-xxxxxxxxxxxxx',
    parentNotification: 'd-xxxxxxxxxxxxx',
  },
};
```

---

## 7. Video Conferencing Integration

### 7.1 Zoom Integration

#### 7.1.1 OAuth Configuration

```typescript
// config/zoom.config.ts
export const zoomConfig = {
  clientId: process.env.ZOOM_CLIENT_ID,
  clientSecret: process.env.ZOOM_CLIENT_SECRET,
  redirectUri: `${process.env.APP_URL}/auth/zoom/callback`,
  webhookSecretToken: process.env.ZOOM_WEBHOOK_SECRET,
};
```

#### 7.1.2 Create Meeting

```typescript
// services/video/zoom.service.ts
interface ZoomMeetingRequest {
  topic: string;
  type: 1 | 2 | 3 | 8; // 1=instant, 2=scheduled, 3=recurring no fixed, 8=recurring fixed
  start_time?: string;
  duration?: number;
  timezone?: string;
  password?: string;
  settings?: ZoomMeetingSettings;
}

export async function createZoomMeeting(
  hostUserId: string,
  request: ZoomMeetingRequest
): Promise<ZoomMeetingResponse> {
  const accessToken = await getZoomAccessToken(hostUserId);

  const response = await fetch(
    `https://api.zoom.us/v2/users/${hostUserId}/meetings`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        topic: request.topic,
        type: request.type,
        start_time: request.start_time,
        duration: request.duration || 60,
        timezone: request.timezone || 'Asia/Dhaka',
        password: request.password || generateMeetingPassword(),
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          waiting_room: true,
          ...request.settings,
        },
      }),
    }
  );

  return await response.json();
}
```

### 7.2 Google Meet Integration

#### 7.2.1 Calendar API Integration

```typescript
// services/video/google-meet.service.ts
import { google } from 'googleapis';

const calendar = google.calendar('v3');

export async function createGoogleMeetEvent(
  auth: any,
  event: {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    attendees: string[];
  }
): Promise<GoogleMeetResponse> {
  const calendarEvent = {
    summary: event.title,
    description: event.description,
    start: {
      dateTime: event.startTime.toISOString(),
      timeZone: 'Asia/Dhaka',
    },
    end: {
      dateTime: event.endTime.toISOString(),
      timeZone: 'Asia/Dhaka',
    },
    attendees: event.attendees.map(email => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: `smartacademy-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  const response = await calendar.events.insert({
    auth,
    calendarId: 'primary',
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: calendarEvent,
  });

  return {
    eventId: response.data.id,
    meetLink: response.data.hangoutLink,
    htmlLink: response.data.htmlLink,
  };
}
```

---

## 8. Google Workspace Integration

### 8.1 Overview

Google Workspace integration enables:
- Single Sign-On (SSO) for teachers and staff
- Google Classroom integration
- Google Drive for document storage
- Google Calendar for scheduling

### 8.2 OAuth Configuration

```typescript
// config/google.config.ts
export const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: `${process.env.APP_URL}/auth/google/callback`,
  scopes: [
    'openid',
    'profile',
    'email',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/classroom.courses.readonly',
    'https://www.googleapis.com/auth/classroom.rosters.readonly',
  ],
};
```

### 8.3 SSO Implementation

```typescript
// services/auth/google-sso.service.ts
import { OAuth2Client } from 'google-auth-library';

const oauth2Client = new OAuth2Client(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirectUri
);

export function getGoogleAuthUrl(state: string): string {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: googleConfig.scopes,
    state,
    prompt: 'consent',
    hd: 'smartacademy.edu.bd', // Restrict to school domain
  });
}

export async function handleGoogleCallback(
  code: string
): Promise<GoogleUser> {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const ticket = await oauth2Client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: googleConfig.clientId,
  });

  const payload = ticket.getPayload();

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    hd: payload.hd, // Hosted domain
    tokens: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: tokens.expiry_date,
    },
  };
}
```

---

## 9. Security Considerations

### 9.1 API Key Management

```typescript
// services/security/api-key.service.ts
export const apiKeySecurityConfig = {
  // Rotate API keys every 90 days
  rotationPeriodDays: 90,

  // Store encrypted in database
  encryption: {
    algorithm: 'aes-256-gcm',
    keyDerivation: 'scrypt',
  },

  // Environment variable naming convention
  envVarPrefix: {
    production: 'PROD_',
    staging: 'STAGING_',
    development: 'DEV_',
  },
};
```

### 9.2 Webhook Signature Verification

```typescript
// middleware/webhook-verification.middleware.ts
import crypto from 'crypto';

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
  algorithm: string = 'sha256'
): boolean {
  const expectedSignature = crypto
    .createHmac(algorithm, secret)
    .update(payload, 'utf8')
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Usage in webhook handler
export async function bkashWebhookHandler(req: Request): Promise<Response> {
  const signature = req.headers.get('X-Webhook-Signature');
  const payload = await req.text();

  if (!verifyWebhookSignature(payload, signature, bkashConfig.webhookSecret)) {
    return new Response('Invalid signature', { status: 401 });
  }

  // Process webhook...
}
```

### 9.3 Rate Limiting for External APIs

```typescript
// services/rate-limiter.service.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export const externalApiLimits = {
  bkash: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
  }),
  sslcommerz: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, '1 m'),
  }),
  sms: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, '1 h'), // 1000 per hour
  }),
};
```

---

## 10. Error Handling & Monitoring

### 10.1 Integration Health Checks

```typescript
// services/health/integration-health.service.ts
interface IntegrationHealthStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency?: number;
  lastChecked: Date;
  error?: string;
}

export async function checkAllIntegrations(): Promise<IntegrationHealthStatus[]> {
  const checks = await Promise.allSettled([
    checkGibbonHealth(),
    checkMoodleHealth(),
    checkBkashHealth(),
    checkSMSGatewayHealth(),
    checkEmailServiceHealth(),
  ]);

  return checks.map((result, index) => {
    const names = ['Gibbon', 'Moodle', 'bKash', 'SMS Gateway', 'Email Service'];

    if (result.status === 'fulfilled') {
      return result.value;
    }

    return {
      name: names[index],
      status: 'unhealthy',
      error: result.reason.message,
      lastChecked: new Date(),
    };
  });
}
```

### 10.2 Integration Error Logging

```typescript
// services/logging/integration-logger.ts
import pino from 'pino';

export const integrationLogger = pino({
  name: 'smart-academy-integrations',
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
});

export function logIntegrationError(
  integration: string,
  operation: string,
  error: Error,
  context?: Record<string, any>
): void {
  integrationLogger.error({
    integration,
    operation,
    error: {
      message: error.message,
      stack: error.stack,
    },
    context,
    timestamp: new Date().toISOString(),
  });

  // Send to monitoring service (e.g., Sentry)
  captureException(error, {
    tags: { integration, operation },
    extra: context,
  });
}
```

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 10, 2026 | Development Team | Initial Third-Party Integration Document |

---

## References

- [bKash Developer Portal](https://developer.bkash.com/)
- [SSLCommerz Documentation](https://developer.sslcommerz.com/doc/v4/)
- [Nagad Developer Documentation](https://developer.mynagad.com/)
- [Moodle Web Services Documentation](https://docs.moodle.org/dev/Web_services)
- [Gibbon Documentation](https://docs.gibbonedu.org/)
- [SendGrid API Reference](https://docs.sendgrid.com/api-reference)
- [AWS SES Developer Guide](https://docs.aws.amazon.com/ses/)
- [Zoom API Documentation](https://developers.zoom.us/docs/api/)
- [Google Workspace APIs](https://developers.google.com/workspace)

---

*End of Third-Party Integration Specifications Document*
