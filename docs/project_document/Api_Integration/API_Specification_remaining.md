---

## Gibbon Integration Endpoints (Continued)

### GET /api/v1/gibbon/students/:id

Gets a specific student from Gibbon LMS.

**Endpoint:** `GET /api/v1/gibbon/students/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `gibbon:read`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Gibbon student ID |

#### Response Schema

**200 OK - Student Retrieved**

```json
{
  "success": true,
  "data": {
    "gibbon_id": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string",
    "student_id": "string (UUID)",
    "sync_status": "synced",
    "synced_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/gibbon/attendance

Syncs attendance from Gibbon LMS.

**Endpoint:** `GET /api/v1/gibbon/attendance`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `gibbon:read`  
**Rate Limit:** 30 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |
| `from_date` | string | - | Start date (ISO 8601) |
| `to_date` | string | - | End date (ISO 8601) |
| `class_id` | string | - | Filter by class ID |

#### Request Example

```http
GET /api/v1/gibbon/attendance?from_date=2024-01-01&to_date=2024-01-31&class_id=class_10
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Attendance Synced**

```json
{
  "success": true,
  "data": [
    {
      "gibbon_id": "string",
      "student_id": "string (UUID)",
      "date": "string (ISO 8601 date)",
      "status": "string (enum: present/absent/late/excused)",
      "synced_at": "string (ISO 8601)"
    }
  ],
  "summary": {
    "total_records": 660,
    "synced": 660,
    "failed": 0
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 660,
    "total_pages": 33
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/gibbon/grades

Syncs grades from Gibbon LMS.

**Endpoint:** `GET /api/v1/gibbon/grades`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `gibbon:read`  
**Rate Limit:** 30 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |
| `term` | string | - | Filter by term |
| `academic_year` | string | - | Filter by academic year |
| `class_id` | string | - | Filter by class ID |

#### Request Example

```http
GET /api/v1/gibbon/grades?term=1&academic_year=2024&class_id=class_10
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Grades Synced**

```json
{
  "success": true,
  "data": [
    {
      "gibbon_id": "string",
      "student_id": "string (UUID)",
      "subject_id": "string",
      "subject_name": "string",
      "marks_obtained": 85,
      "total_marks": 100,
      "synced_at": "string (ISO 8601)"
    }
  ],
  "summary": {
    "total_records": 360,
    "synced": 360,
    "failed": 0
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 360,
    "total_pages": 18
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/gibbon/timetable

Syncs timetable from Gibbon LMS.

**Endpoint:** `GET /api/v1/gibbon/timetable`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `gibbon:read`  
**Rate Limit:** 30 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `class_id` | string | - | Filter by class ID |
| `section` | string | - | Filter by section |
| `academic_year` | string | - | Filter by academic year |
| `term` | string | - | Filter by term |

#### Request Example

```http
GET /api/v1/gibbon/timetable?class_id=class_10&section=A&academic_year=2024
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Timetable Synced**

```json
{
  "success": true,
  "data": {
    "class_id": "string",
    "section": "string",
    "academic_year": "string",
    "schedule": [
      {
        "day": "Monday",
        "periods": [
          {
            "period": 1,
            "start_time": "08:00:00",
            "end_time": "08:45:00",
            "subject": "Mathematics",
            "subject_id": "string",
            "teacher": "John Doe",
            "teacher_id": "string (UUID)",
            "room": "Room 101"
          }
        ]
      }
    ]
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/gibbon/announcements

Syncs announcements from Gibbon LMS.

**Endpoint:** `GET /api/v1/gibbon/announcements`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `gibbon:read`  
**Rate Limit:** 30 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |
| `from_date` | string | - | Start date (ISO 8601) |
| `to_date` | string | - | End date (ISO 8601) |

#### Request Example

```http
GET /api/v1/gibbon/announcements?from_date=2024-01-01&to_date=2024-01-31
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Announcements Synced**

```json
{
  "success": true,
  "data": [
    {
      "gibbon_id": "string",
      "title": "string",
      "content": "string",
      "publish_date": "string (ISO 8601)",
      "expiry_date": "string (ISO 8601)",
      "target_audience": "string",
      "synced_at": "string (ISO 8601)"
    }
  ],
  "summary": {
    "total_announcements": 15,
    "synced": 15,
    "failed": 0
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "total_pages": 1
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### POST /api/v1/gibbon/sync

Triggers full sync from Gibbon LMS.

**Endpoint:** `POST /api/v1/gibbon/sync`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `gibbon:sync`  
**Rate Limit:** 5 requests/hour

#### Request Body Schema

```json
{
  "sync_type": "string (required, enum: full/incremental)",
  "entities": ["string (optional, array of entities to sync)"]
}
```

#### Request Body Example

```json
{
  "sync_type": "full",
  "entities": ["students", "attendance", "grades", "timetable", "announcements"]
}
```

#### Response Schema

**200 OK - Sync Triggered**

```json
{
  "success": true,
  "data": {
    "sync_id": "string (UUID)",
    "sync_type": "full",
    "status": "processing",
    "entities": ["students", "attendance", "grades", "timetable", "announcements"],
    "started_at": "string (ISO 8601)",
    "estimated_completion": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

## Moodle Integration Endpoints

### GET /api/v1/moodle/courses

Lists courses from Moodle LMS.

**Endpoint:** `GET /api/v1/moodle/courses`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `moodle:read`  
**Rate Limit:** 30 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |
| `search` | string | - | Search by course name |
| `category_id` | string | - | Filter by category ID |

#### Request Example

```http
GET /api/v1/moodle/courses?page=1&limit=20
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Courses Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "moodle_id": "number",
      "course_name": "string",
      "short_name": "string",
      "category_id": "string",
      "category_name": "string",
      "enrollment_count": 30,
      "sync_status": "synced",
      "synced_at": "string (ISO 8601)"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "total_pages": 3
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/moodle/courses/:id

Gets course details from Moodle LMS.

**Endpoint:** `GET /api/v1/moodle/courses/:id`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `moodle:read`  
**Rate Limit:** 100 requests/minute

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Moodle course ID |

#### Response Schema

**200 OK - Course Retrieved**

```json
{
  "success": true,
  "data": {
    "moodle_id": "number",
    "course_name": "string",
    "short_name": "string",
    "category_id": "string",
    "category_name": "string",
    "description": "string",
    "enrollment_count": 30,
    "start_date": "string (ISO 8601 date)",
    "end_date": "string (ISO 8601 date)",
    "sync_status": "synced",
    "synced_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/moodle/enrollments

Gets enrollments from Moodle LMS.

**Endpoint:** `GET /api/v1/moodle/enrollments`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `moodle:read`  
**Rate Limit:** 30 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |
| `course_id` | string | - | Filter by course ID |
| `student_id` | string | - | Filter by student ID |

#### Request Example

```http
GET /api/v1/moodle/enrollments?course_id=123
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Enrollments Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "moodle_id": "number",
      "student_id": "string (UUID)",
      "student_name": "string",
      "course_id": "number",
      "course_name": "string",
      "enrollment_date": "string (ISO 8601)",
      "status": "string (enum: active/suspended/completed)",
      "sync_status": "synced",
      "synced_at": "string (ISO 8601)"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/moodle/assignments

Gets assignments from Moodle LMS.

**Endpoint:** `GET /api/v1/moodle/assignments`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `moodle:read`  
**Rate Limit:** 30 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |
| `course_id` | string | - | Filter by course ID |
| `student_id` | string | - | Filter by student ID |

#### Request Example

```http
GET /api/v1/moodle/assignments?course_id=123
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Assignments Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "moodle_id": "number",
      "course_id": "number",
      "course_name": "string",
      "assignment_name": "string",
      "description": "string",
      "due_date": "string (ISO 8601)",
      "submission_count": 28,
      "sync_status": "synced",
      "synced_at": "string (ISO 8601)"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### GET /api/v1/moodle/grades

Gets grades from Moodle LMS.

**Endpoint:** `GET /api/v1/moodle/grades`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `moodle:read`  
**Rate Limit:** 30 requests/minute

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page |
| `course_id` | string | - | Filter by course ID |
| `student_id` | string | - | Filter by student ID |

#### Request Example

```http
GET /api/v1/moodle/grades?course_id=123
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

#### Response Schema

**200 OK - Grades Retrieved**

```json
{
  "success": true,
  "data": [
    {
      "moodle_id": "number",
      "student_id": "string (UUID)",
      "student_name": "string",
      "course_id": "number",
      "course_name": "string",
      "assignment_name": "string",
      "grade": "number",
      "max_grade": "number",
      "percentage": "number",
      "sync_status": "synced",
      "synced_at": "string (ISO 8601)"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 360,
    "total_pages": 18
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### POST /api/v1/moodle/sync-users

Syncs users to Moodle LMS.

**Endpoint:** `POST /api/v1/moodle/sync-users`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `moodle:sync`  
**Rate Limit:** 5 requests/hour

#### Request Body Schema

```json
{
  "sync_type": "string (required, enum: full/incremental)",
  "user_ids": ["string (optional, array of user UUIDs)"]
}
```

#### Request Body Example

```json
{
  "sync_type": "full",
  "user_ids": ["550e8400-e29b-41d4-a716-446655440000"]
}
```

#### Response Schema

**200 OK - Users Synced**

```json
{
  "success": true,
  "data": {
    "sync_id": "string (UUID)",
    "sync_type": "full",
    "total_users": 150,
    "synced": 148,
    "failed": 2,
    "failed_users": ["string (UUID)"],
    "started_at": "string (ISO 8601)",
    "completed_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### POST /api/v1/moodle/sync-enrollments

Syncs enrollments to Moodle LMS.

**Endpoint:** `POST /api/v1/moodle/sync-enrollments`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `moodle:sync`  
**Rate Limit:** 5 requests/hour

#### Request Body Schema

```json
{
  "sync_type": "string (required, enum: full/incremental)",
  "course_id": "string (optional)",
  "student_ids": ["string (optional, array of student UUIDs)"]
}
```

#### Request Body Example

```json
{
  "sync_type": "full",
  "course_id": "123",
  "student_ids": ["550e8400-e29b-41d4-a716-446655440000"]
}
```

#### Response Schema

**200 OK - Enrollments Synced**

```json
{
  "success": true,
  "data": {
    "sync_id": "string (UUID)",
    "sync_type": "full",
    "course_id": "123",
    "total_enrollments": 30,
    "synced": 30,
    "failed": 0,
    "started_at": "string (ISO 8601)",
    "completed_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

### POST /api/v1/moodle/sync-grades

Syncs grades from Moodle LMS.

**Endpoint:** `POST /api/v1/moodle/sync-grades`  
**Authentication:** Required (JWT Bearer)  
**Permissions:** `moodle:sync`  
**Rate Limit:** 5 requests/hour

#### Request Body Schema

```json
{
  "sync_type": "string (required, enum: full/incremental)",
  "course_id": "string (optional)",
  "student_ids": ["string (optional, array of student UUIDs)"]
}
```

#### Request Body Example

```json
{
  "sync_type": "full",
  "course_id": "123",
  "student_ids": ["550e8400-e29b-41d4-a716-446655440000"]
}
```

#### Response Schema

**200 OK - Grades Synced**

```json
{
  "success": true,
  "data": {
    "sync_id": "string (UUID)",
    "sync_type": "full",
    "course_id": "123",
    "total_grades": 360,
    "synced": 360,
    "failed": 0,
    "started_at": "string (ISO 8601)",
    "completed_at": "string (ISO 8601)"
  },
  "meta": {
    "timestamp": "string (ISO 8601)",
    "request_id": "string (UUID)"
  }
}
```

---

## Request/Response Schemas

### User Schema

```json
{
  "id": "string (UUID)",
  "email": "string (email format)",
  "first_name": "string (2-50 characters)",
  "last_name": "string (2-50 characters)",
  "phone": "string (phone format)",
  "role": "string (enum: guest/student/parent/teacher/admin/leadership)",
  "status": "string (enum: active/inactive/suspended)",
  "avatar_url": "string (URL)",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)",
  "last_login": "string (ISO 8601)"
}
```

### Student Schema

```json
{
  "id": "string (UUID)",
  "student_id": "string (unique identifier)",
  "user_id": "string (UUID)",
  "first_name": "string (2-50 characters)",
  "last_name": "string (2-50 characters)",
  "email": "string (email format)",
  "phone": "string (phone format)",
  "date_of_birth": "string (ISO 8601 date)",
  "gender": "string (enum: male/female/other)",
  "blood_group": "string (optional)",
  "class_id": "string",
  "section": "string (enum: A/B/C)",
  "roll_number": "string",
  "admission_date": "string (ISO 8601 date)",
  "status": "string (enum: active/inactive/suspended/graduated)",
  "parent_id": "string (UUID)",
  "avatar_url": "string (URL)",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "country": "string"
  },
  "medical_info": {
    "allergies": ["string"],
    "chronic_conditions": ["string"],
    "medications": ["string"],
    "emergency_notes": "string"
  },
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Teacher Schema

```json
{
  "id": "string (UUID)",
  "user_id": "string (UUID)",
  "employee_id": "string (unique identifier)",
  "first_name": "string (2-50 characters)",
  "last_name": "string (2-50 characters)",
  "email": "string (email format)",
  "phone": "string (phone format)",
  "subjects": [
    {
      "id": "string",
      "name": "string",
      "code": "string"
    }
  ],
  "designation": "string",
  "qualification": "string",
  "specialization": "string",
  "experience_years": "number",
  "joining_date": "string (ISO 8601 date)",
  "status": "string (enum: active/inactive/suspended)",
  "avatar_url": "string (URL)",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "country": "string"
  },
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Parent Schema

```json
{
  "id": "string (UUID)",
  "user_id": "string (UUID)",
  "first_name": "string (2-50 characters)",
  "last_name": "string (2-50 characters)",
  "email": "string (email format)",
  "phone": "string (phone format)",
  "occupation": "string",
  "relation": "string (enum: father/mother/guardian)",
  "avatar_url": "string (URL)",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "country": "string"
  },
  "emergency_contact": {
    "name": "string",
    "phone": "string (phone format)",
    "relationship": "string"
  },
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Attendance Schema

```json
{
  "id": "string (UUID)",
  "student_id": "string (UUID)",
  "date": "string (ISO 8601 date)",
  "status": "string (enum: present/absent/late/excused)",
  "check_in_time": "string (ISO 8601 time)",
  "check_out_time": "string (ISO 8601 time)",
  "notes": "string",
  "marked_by": "string (UUID)",
  "marked_by_name": "string",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Grade Schema

```json
{
  "id": "string (UUID)",
  "student_id": "string (UUID)",
  "subject_id": "string",
  "subject_name": "string",
  "exam_id": "string",
  "exam_name": "string",
  "term": "string",
  "academic_year": "string",
  "marks_obtained": "number",
  "total_marks": "number",
  "percentage": "number (0-100)",
  "grade": "string (enum: A+/A/A-/A/B/B-/B/C/C-/C/D/F)",
  "gpa": "number (0-4.0)",
  "remarks": "string",
  "graded_by": "string (UUID)",
  "graded_by_name": "string",
  "graded_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Islamic Progress Schema

```json
{
  "student_id": "string (UUID)",
  "academic_year": "string",
  "quran_progress": {
    "surahs_completed": "number",
    "total_surahs": 114,
    "verses_memorized": "number",
    "total_verses": 6236,
    "current_surah": "string",
    "current_verse": "number",
    "completion_percentage": "number",
    "last_assessment_date": "string (ISO 8601)",
    "teacher_notes": "string"
  },
  "hafiz_progress": {
    "is_hafiz": "boolean",
    "juz_completed": "number",
    "total_juz": 30,
    "completion_percentage": "number",
    "estimated_completion_date": "string (ISO 8601 date)"
  },
  "tajweed_progress": {
    "level": "string",
    "rules_mastered": "number",
    "total_rules": 20,
    "completion_percentage": "number",
    "last_assessment_score": "number",
    "assessment_date": "string (ISO 8601)"
  },
  "hadith_progress": {
    "hadiths_memorized": "number",
    "total_target": "number",
    "current_collection": "string",
    "current_book": "string",
    "last_assessment_date": "string (ISO 8601)"
  },
  "prayer_attendance": {
    "total_prayers": "number",
    "prayers_attended": "number",
    "attendance_percentage": "number"
  }
}
```

### Invoice Schema

```json
{
  "id": "string (UUID)",
  "invoice_number": "string (unique identifier)",
  "student_id": "string (UUID)",
  "student_name": "string",
  "parent_id": "string (UUID)",
  "parent_name": "string",
  "amount": "number",
  "currency": "string (default: BDT)",
  "due_date": "string (ISO 8601 date)",
  "status": "string (enum: draft/unpaid/partial/paid/overdue/cancelled)",
  "description": "string",
  "line_items": [
    {
      "description": "string",
      "amount": "number",
      "quantity": "number"
    }
  ],
  "payments": [
    {
      "payment_id": "string (UUID)",
      "amount": "number",
      "payment_gateway": "string",
      "transaction_id": "string",
      "paid_at": "string (ISO 8601)"
    }
  ],
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

### Payment Schema

```json
{
  "id": "string (UUID)",
  "invoice_id": "string (UUID)",
  "invoice_number": "string",
  "amount": "number",
  "currency": "string (default: BDT)",
  "status": "string (enum: pending/processing/completed/failed/refunded)",
  "payment_gateway": "string (enum: bkash/nagad/sslcommerz)",
  "transaction_id": "string",
  "payer_account": "string",
  "payer_reference": "string",
  "created_at": "string (ISO 8601)",
  "completed_at": "string (ISO 8601)",
  "refunded_at": "string (ISO 8601)"
}
```

### Notification Schema

```json
{
  "id": "string (UUID)",
  "recipient_id": "string (UUID)",
  "recipient_name": "string",
  "type": "string (enum: email/sms/push)",
  "subject": "string",
  "message": "string",
  "status": "string (enum: sent/delivered/failed/read)",
  "sent_at": "string (ISO 8601)",
  "read_at": "string (ISO 8601)",
  "metadata": {
    "student_id": "string (UUID)",
    "subject_id": "string",
    "grade": "string"
  }
}
```

### Error Response Schema

```json
{
  "success": false,
  "error": {
    "code": "string (error code)",
    "message": "string (human-readable message)",
    "details": {
      "field": "string (field name)",
      "message": "string (detailed error message)",
      "code": "string (validation error code)"
    },
    "request_id": "string (UUID)",
    "timestamp": "string (ISO 8601)"
  }
}
```

### Pagination Response Schema

```json
{
  "pagination": {
    "page": "number (current page number)",
    "limit": "number (items per page)",
    "total": "number (total items)",
    "total_pages": "number (total pages)",
    "has_next": "boolean (has next page)",
    "has_prev": "boolean (has previous page)"
  }
}
```

---

## Authentication Requirements

### JWT Bearer Token Format

The API uses JWT (JSON Web Token) for authentication. Tokens must be included in the `Authorization` header using the Bearer scheme.

**Format:**
```
Authorization: Bearer <access_token>
```

**Example:**
```http
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NDU2Nzg5IiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Token Expiration Times

| Token Type | Expiration Time | Description |
|------------|-----------------|-------------|
| Access Token | 15 minutes (900 seconds) | Used for API requests |
| Refresh Token | 7 days (604800 seconds) | Used to obtain new access tokens |

### Token Refresh Flow

1. **Initial Login:** User provides credentials and receives both access_token and refresh_token
2. **API Requests:** Client uses access_token in Authorization header for API calls
3. **Token Expiration:** When access_token expires (after 15 minutes), API returns 401 Unauthorized
4. **Token Refresh:** Client calls `POST /api/v1/auth/refresh` with refresh_token
5. **New Access Token:** Server returns new access_token
6. **Continue:** Client uses new access_token for subsequent API calls
7. **Refresh Token Expiration:** If refresh_token expires, user must re-authenticate with credentials

### Required Permissions per Endpoint

| Endpoint | Required Permission | Roles |
|----------|---------------------|-------|
| `GET /api/v1/users` | `users:read` | Admin, Leadership |
| `POST /api/v1/users` | `users:write` | Admin |
| `GET /api/v1/students` | `students:read` | Admin, Teacher, Leadership |
| `POST /api/v1/students` | `students:write` | Admin |
| `GET /api/v1/teachers` | `teachers:read` | Admin, Leadership |
| `GET /api/v1/parents/:id` | `parents:read` or `read:own_parent_data` | Admin, Parent (own data) |
| `GET /api/v1/attendance` | `attendance:read` | Admin, Teacher |
| `POST /api/v1/attendance` | `attendance:write` | Admin, Teacher |
| `GET /api/v1/grades` | `grades:read` | Admin, Teacher, Parent (own children), Student (own data) |
| `POST /api/v1/grades` | `grades:write` | Admin, Teacher |
| `GET /api/v1/payments/invoices` | `payments:read` or `read:own_invoices` | Admin, Parent (own invoices) |
| `POST /api/v1/payments/bkash/create` | `payments:write` or `pay:own_invoices` | Admin, Parent (own invoices) |

### Role-Based Access Rules

| Role | Description | Access Level |
|-------|-------------|--------------|
| **Guest** | Public website visitors, no authentication required | Public endpoints only |
| **Student** | Current enrolled students | Own data access, limited read access |
| **Parent** | Parents/guardians of students | Own children data access, payment access |
| **Teacher** | Teaching faculty | Class/grade/attendance management for assigned classes |
| **Admin** | System administrators | Full access to all resources |
| **Leadership** | School principal, board members | Read-only access to reports and analytics |

### Permission Codes

| Permission | Description |
|------------|-------------|
| `users:read` | Read user information |
| `users:write` | Create/update/delete users |
| `students:read` | Read student information |
| `students:write` | Create/update/delete students |
| `teachers:read` | Read teacher information |
| `grades:read` | Read grade information |
| `grades:write` | Enter/update grades |
| `attendance:read` | Read attendance records |
| `attendance:write` | Mark/update attendance |
| `payments:read` | Read payment/invoice information |
| `payments:write` | Create payments/process refunds |
| `notifications:read` | Read notification history |
| `notifications:send` | Send notifications |
| `notifications:write` | Manage notification templates |
| `islamic:read` | Read Islamic education progress |
| `islamic:write` | Record Islamic education progress |
| `gibbon:read` | Read Gibbon LMS data |
| `gibbon:sync` | Trigger Gibbon LMS sync |
| `moodle:read` | Read Moodle LMS data |
| `moodle:sync` | Trigger Moodle LMS sync |
| `read:own_profile` | Read own user profile |
| `read:own_student_data` | Read own student data |
| `read:own_grades` | Read own grades |
| `read:own_attendance` | Read own attendance |
| `read:own_timetable` | Read own timetable |
| `read:own_islamic_progress` | Read own Islamic progress |
| `read:own_notifications` | Read own notifications |
| `read:own_invoices` | Read own invoices |
| `read:own_transactions` | Read own transactions |
| `read:own_children` | Read own children information |
| `read:own_dashboard` | Read own parent dashboard |
| `read:own_parent_data` | Read own parent data |
| `update:own_profile` | Update own user profile |
| `update:own_notifications` | Update own notification status |
| `pay:own_invoices` | Make payments for own invoices |
| `leave:read` | Read leave applications |
| `leave:write` | Submit leave applications |

---

## Example Requests

### Authentication Flow

#### 1. Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "X-Request-ID: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "email": "student@smartacademy.edu",
    "password": "SecurePass123!",
    "remember_me": true
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 900,
    "user": {
      "id": "550e8400-e29b-41d4-a716-4466554400000",
      "email": "student@smartacademy.edu",
      "first_name": "Ahmed",
      "last_name": "Rahman",
      "role": "student",
      "mfa_enabled": true,
      "mfa_verified": false
    }
  },
  "meta": {
    "timestamp": "2024-01-10T10:30:00.000Z",
    "request_id": "550e8400-e29b-41d4-a716-4466554400000"
  }
}
```

#### 2. Verify MFA

```bash
curl -X POST http://localhost:3000/api/v1/auth/verify-mfa \
  -H "Content-Type: application/json" \
  -d '{
    "otp_id": "660e9500-e39c-51e5-b827-557766551111",
    "otp_code": "123456"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 900,
    "user": {
      "id": "550e8400-e29b-41d4-a716-4466554400000",
      "email": "student@smartacademy.edu",
      "first_name": "Ahmed",
      "last_name": "Rahman",
      "role": "student"
    }
  },
  "meta": {
    "timestamp": "2024-01-10T10:31:00.000Z",
    "request_id": "660e9500-e39c-51e5-b827-557766551111"
  }
}
```

#### 3. Refresh Token

```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 900
  },
  "meta": {
    "timestamp": "2024-01-10T11:00:00.000Z",
    "request_id": "770e0600-f40d-61f6-b938-668877552222"
  }
}
```

#### 4. Logout

```bash
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Successfully logged out"
  },
  "meta": {
    "timestamp": "2024-01-10T11:05:00.000Z",
    "request_id": "880e1701-f51e-72f7-a839-779988553333"
  }
}
```

### CRUD Operations

#### 1. Create Student

```bash
curl -X POST http://localhost:3000/api/v1/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "first_name": "Ahmed",
    "last_name": "Rahman",
    "email": "ahmed.rahman@example.com",
    "phone": "+8801712345678",
    "date_of_birth": "2010-05-15",
    "gender": "male",
    "blood_group": "O+",
    "class_id": "class_10",
    "section": "A",
    "roll_number": "15",
    "admission_date": "2024-01-01",
    "parent_id": "550e8400-e29b-41d4-a716-4466554400000",
    "address": {
      "street": "123 Main Street",
      "city": "Dhaka",
      "state": "Dhaka",
      "postal_code": "1000",
      "country": "Bangladesh"
    },
    "medical_info": {
      "allergies": ["Peanuts"],
      "emergency_notes": "No chronic conditions"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "990e0700-f40d-61f6-b938-668877552222",
    "student_id": "STU2024001",
    "user_id": "990e0700-f40d-61f6-b938-668877552222",
    "first_name": "Ahmed",
    "last_name": "Rahman",
    "email": "ahmed.rahman@example.com",
    "class_id": "class_10",
    "section": "A",
    "roll_number": "15",
    "status": "active",
    "created_at": "2024-01-10T10:00:00.000Z"
  },
  "meta": {
    "timestamp": "2024-01-10T10:00:01.000Z",
    "request_id": "a10e0800-f51e-72f7-a839-779988553333"
  }
}
```

#### 2. Read Students with Pagination

```bash
curl -X GET "http://localhost:3000/api/v1/students?page=1&limit=20&class_id=class_10&section=A&status=active" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "990e0700-f40d-61f6-b938-668877552222",
      "student_id": "STU2024001",
      "user_id": "990e0700-f40d-61f6-b938-668877552222",
      "first_name": "Ahmed",
      "last_name": "Rahman",
      "email": "ahmed.rahman@example.com",
      "class_id": "class_10",
      "section": "A",
      "roll_number": "15",
      "status": "active",
      "created_at": "2024-01-10T10:00:00.000Z",
      "updated_at": "2024-01-10T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3,
    "has_next": true,
    "has_prev": false
  },
  "meta": {
    "timestamp": "2024-01-10T10:00:02.000Z",
    "request_id": "b20e1801-f61e-73f8-b949-880099664444"
  }
}
```

#### 3. Update Student

```bash
curl -X PUT http://localhost:3000/api/v1/students/990e0700-f40d-61f6-b938-668877552222 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "first_name": "Ahmed",
    "last_name": "Hossain",
    "phone": "+8801812345678",
    "section": "B"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "990e0700-f40d-61f6-b938-668877552222",
    "student_id": "STU2024001",
    "first_name": "Ahmed",
    "last_name": "Hossain",
    "email": "ahmed.rahman@example.com",
    "class_id": "class_10",
    "section": "B",
    "roll_number": "15",
    "status": "active",
    "updated_at": "2024-01-10T10:30:00.000Z"
  },
  "meta": {
    "timestamp": "2024-01-10T10:30:01.000Z",
    "request_id": "c30e1901-f72f-74f9-ba50-990118775555"
  }
}
```

#### 4. Delete Student

```bash
curl -X DELETE http://localhost:3000/api/v1/students/990e0700-f40d-61f6-b938-668877552222 \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Student deleted successfully",
    "id": "990e0700-f40d-61f6-b938-668877552222"
  },
  "meta": {
    "timestamp": "2024-01-10T10:35:00.000Z",
    "request_id": "d40e2000-f83f-75fa-bb61-001234567890"
  }
}
```

### Filtering and Sorting

#### 1. Filter Students by Class and Section

```bash
curl -X GET "http://localhost:3000/api/v1/students?class_id=class_10&section=A&status=active&sort=last_name:asc" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 2. Filter Grades by Term and Academic Year

```bash
curl -X GET "http://localhost:3000/api/v1/grades?term=1&academic_year=2024&class_id=class_10" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 3. Filter Payments by Status

```bash
curl -X GET "http://localhost:3000/api/v1/payments/invoices?status=unpaid&from_date=2024-01-01&to_date=2024-01-31" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Error Handling

#### 1. Handle 401 Unauthorized - Token Expired

```bash
curl -X GET http://localhost:3000/api/v1/students \
  -H "Authorization: Bearer expired_token_here"
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "AUTH_UNAUTHENTICATED",
    "message": "Authentication required",
    "request_id": "string (UUID)",
    "timestamp": "2024-01-10T10:00:00.000Z"
  }
}
```

**Action:** Refresh token and retry request

#### 2. Handle 403 Forbidden - Insufficient Permissions

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer student_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "new.user@smartacademy.edu",
    "password": "SecurePass123!",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "AUTHZ_INSUFFICIENT_PERMISSIONS",
    "message": "You do not have permission to access this resource",
    "details": {
      "required_permission": "users:write",
      "user_permissions": ["read:profile"]
    },
    "request_id": "string (UUID)",
    "timestamp": "2024-01-10T10:00:00.000Z"
  }
}
```

**Action:** Check user permissions and contact administrator if needed

#### 3. Handle 404 Not Found

```bash
curl -X GET http://localhost:3000/api/v1/students/99999999-9999-9999-9999-9999 \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Student not found",
    "request_id": "string (UUID)",
    "timestamp": "2024-01-10T10:00:00.000Z"
  }
}
```

**Action:** Verify resource ID and try again with correct ID

#### 4. Handle 422 Validation Error

```bash
curl -X POST http://localhost:3000/api/v1/students \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "A",
    "last_name": "",
    "email": "invalid-email",
    "phone": "+8801712345678"
  }'
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for one or more fields",
    "details": [
      {
        "field": "email",
        "message": "Email must be a valid email address",
        "code": "VALIDATION_EMAIL_FORMAT"
      },
      {
        "field": "last_name",
        "message": "Last name is required",
        "code": "VALIDATION_REQUIRED_FIELD"
      }
    ],
    "request_id": "string (UUID)",
    "timestamp": "2024-01-10T10:00:00.000Z"
  }
}
```

**Action:** Correct the validation errors and retry request

#### 5. Handle 429 Rate Limit Exceeded

```bash
curl -X POST http://localhost:3000/api/v1/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "student@smartacademy.edu"}'
```

**Response:**
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 3600

{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many password reset attempts. Please try again later."
  }
}
```

**Action:** Wait for the duration specified in Retry-After header before retrying

#### 6. Handle 500 Internal Server Error

```bash
curl -X GET http://localhost:3000/api/v1/students \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "SYSTEM_ERROR",
    "message": "An unexpected error occurred",
    "request_id": "string (UUID)",
    "timestamp": "2024-01-10T10:00:00.000Z"
  }
}
```

**Action:** Retry the request after a short delay. If the error persists, contact support with the request_id.

---

## Appendix

### HTTP Status Code Reference

| Status Code | Name | Description |
|-------------|------|-------------|
| **200** | OK | Request succeeded |
| **201** | Created | Resource created successfully |
| **204** | No Content | Request succeeded but no content returned |
| **400** | Bad Request | Invalid request parameters or malformed request body |
| **401** | Unauthorized | Authentication required or invalid credentials |
| **403** | Forbidden | Insufficient permissions to access resource |
| **404** | Not Found | Resource not found |
| **409** | Conflict | Resource already exists or conflicts with existing data |
| **410** | Gone | Resource no longer available |
| **413** | Payload Too Large | Request body exceeds size limit |
| **415** | Unsupported Media Type | Request content type not supported |
| **422** | Unprocessable Entity | Semantic errors in request (validation errors) |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Server error (check request_id and contact support) |
| **502** | Bad Gateway | Invalid response from upstream server |
| **503** | Service Unavailable | Service temporarily unavailable |
| **504** | Gateway Timeout | Upstream server timeout |

### Common Error Codes

| Error Code | Description | HTTP Status |
|------------|-------------|--------------|
| `VALIDATION_ERROR` | Request validation failed | 400 |
| `VALIDATION_REQUIRED_FIELD` | Required field is missing | 400 |
| `VALIDATION_EMAIL_FORMAT` | Invalid email format | 400 |
| `VALIDATION_MIN_LENGTH` | Value below minimum length | 400 |
| `VALIDATION_MAX_LENGTH` | Value exceeds maximum length | 400 |
| `VALIDATION_PASSWORD_MISMATCH` | Password confirmation does not match | 400 |
| `AUTH_UNAUTHENTICATED` | Authentication required | 401 |
| `AUTH_INVALID_CREDENTIALS` | Invalid email or password | 401 |
| `AUTH_INVALID_TOKEN` | Invalid or expired token | 401 |
| `AUTH_MFA_REQUIRED` | Multi-factor authentication required | 422 |
| `AUTH_INVALID_OTP` | Invalid verification code | 400 |
| `AUTH_OTP_ATTEMPTS_EXCEEDED` | Maximum OTP attempts exceeded | 400 |
| `AUTH_OTP_EXPIRED` | Verification code expired | 410 |
| `REFRESH_TOKEN_INVALID` | Invalid or expired refresh token | 401 |
| `REFRESH_TOKEN_MISSING` | Refresh token is required | 422 |
| `AUTHZ_INSUFFICIENT_PERMISSIONS` | Insufficient permissions | 403 |
| `AUTHZ_FORBIDDEN` | Action not allowed | 403 |
| `RESOURCE_NOT_FOUND` | Resource not found | 404 |
| `RESOURCE_CONFLICT` | Resource already exists | 409 |
| `RATE_LIMIT_EXCEEDED` | Rate limit exceeded | 429 |
| `SYSTEM_ERROR` | Internal server error | 500 |

### Data Type Reference

| Type | Format | Description |
|------|---------|-------------|
| **UUID** | `string (UUID format)` | Unique identifier for resources |
| **Email** | `string (email format)` | Email address format: local@domain.tld |
| **Phone** | `string (phone format)` | Phone number with country code: +8801712345678 |
| **ISO 8601 Date** | `string (ISO 8601)` | Date and time format: 2024-01-10T10:30:00.000Z |
| **ISO 8601 Time** | `string (ISO 8601)` | Time format: 10:30:00.000Z |
| **Integer** | `number` | Whole number: 1, 42, 100 |
| **Float** | `number` | Decimal number: 3.14, 85.5 |
| **Boolean** | `boolean` | true or false |
| **Enum** | `string` | Predefined set of values: male/female/other |
| **Array** | `array` | Ordered list of values: ["item1", "item2"] |
| **Object** | `object` | Key-value pairs: {"key": "value"} |

### Glossary

| Term | Definition |
|-------|------------|
| **API** | Application Programming Interface - A set of rules for building and interacting with software |
| **JWT** | JSON Web Token - A compact URL-safe means of representing claims between two parties |
| **RBAC** | Role-Based Access Control - Method of restricting access based on user roles |
| **MFA** | Multi-Factor Authentication - Security system requiring multiple forms of verification |
| **OTP** | One-Time Password - Temporary password valid for single use |
| **REST** | Representational State Transfer - Architectural style for APIs |
| **CRUD** | Create, Read, Update, Delete - Basic operations for data management |
| **Pagination** | Process of dividing large datasets into smaller chunks (pages) |
| **Rate Limiting** | Technique to limit the number of requests a client can make |
| **Webhook** | HTTP callback - HTTP POST that occurs when something happens |
| **Endpoint** | A specific URL where an API can access the resources it provides |
| **Payload** | The data contained in an HTTP request or response body |
| **Schema** | Structure definition for data format and validation rules |
| **Middleware** | Software that handles requests and responses between client and server |
| **Token Bucket** | Rate limiting algorithm using a counter that decrements with each request |
| **Idempotency** | Property of API operations that making multiple identical requests has same effect as single request |
| **Cache-Control** | HTTP directive for caching mechanisms |
| **CORS** | Cross-Origin Resource Sharing - Security feature allowing requests from different origins |
| **SSL/TLS** | Secure Sockets Layer/Transport Layer Security - Protocol for encrypted communication |

---

**Document End**

For questions or issues related to this API specification, please contact the development team at: [dev@smartacademy.edu](mailto:dev@smartacademy.edu)

**Document Version:** 1.0  
**Last Updated:** 2026-01-10
