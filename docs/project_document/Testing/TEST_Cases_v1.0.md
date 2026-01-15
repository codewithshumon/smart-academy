# Smart Academy Digital Portal - Test Cases Document

| Document Information | |
|---------------------|------------------|
| **Title** | Test Cases Document |
| **Version** | 1.0 |
| **Date** | 2026-01-10 |
| **Author** | Smart Academy Development Team |
| **Status** | Draft |
| **Project** | Smart Academy Digital Portal |

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 Purpose
   - 1.2 Scope
   - 1.3 References
2. [Test Case Template](#2-test-case-template)
3. [Authentication Tests](#3-authentication-tests)
   - 3.1 Login Tests
   - 3.2 Logout Tests
   - 3.3 Password Reset Tests
   - 3.4 MFA Tests
   - 3.5 SSO Tests
4. [Student Management Tests](#4-student-management-tests)
   - 4.1 Create Student Tests
   - 4.2 Read Student Tests
   - 4.3 Update Student Tests
   - 4.4 Delete Student Tests
   - 4.5 Search and Filter Tests
5. [Attendance Tests](#5-attendance-tests)
   - 5.1 Mark Attendance Tests
   - 5.2 Attendance Calculation Tests
   - 5.3 Attendance Report Tests
   - 5.4 Attendance Notification Tests
6. [Grading Tests](#6-grading-tests)
   - 6.1 Grade Entry Tests
   - 6.2 Grade Calculation Tests
   - 6.3 GPA Calculation Tests
   - 6.4 Report Card Tests
7. [Payment Tests](#7-payment-tests)
   - 7.1 Payment Initiation Tests
   - 7.2 Payment Processing Tests
   - 7.3 Payment Callback Tests
   - 7.4 Refund Tests
8. [Communication Tests](#8-communication-tests)
   - 8.1 Notification Tests
   - 8.2 Preference Tests
   - 8.3 Broadcasting Tests
9. [Islamic Education Tests](#9-islamic-education-tests)
   - 9.1 Quran Progress Tests
   - 9.2 Tajweed Tests
   - 9.3 Prayer Times Tests
10. [Expected Results Summary](#10-expected-results-summary)
11. [Test Data Requirements](#11-test-data-requirements)

---

## 1. Introduction

### 1.1 Purpose

This Test Cases document provides comprehensive test cases for the Smart Academy Digital Portal project. Each test case includes detailed steps, expected results, and acceptance criteria to ensure thorough validation of all system functionality.

### 1.2 Scope

This document covers test cases for all major modules:

- Authentication and Authorization
- Student Management
- Attendance Module
- Grade Management
- Islamic Education
- Payment Processing
- Communication
- Reporting and Analytics

### 1.3 References

| Document | Description |
|----------|-------------|
| [Test Strategy Document](TEST_Strategy_v1.0.md) | Overall testing approach and methodology |
| [Test Plan Document](TEST_Plan_v1.0.md) | Detailed test schedule and resources |
| [Functional Requirements](../RFQ/REQ_Functional_Requirements_v1.0.md) | Detailed functional specifications |
| [API Specification](../Api_Integration/API_Specification_v1.0.md) | API endpoint specifications |

---

## 2. Test Case Template

### Standard Test Case Format

| Field | Description |
|-------|-------------|
| **Test Case ID** | Unique identifier (e.g., TC-AUTH-001) |
| **Title** | Brief description of the test |
| **Description** | Detailed explanation of what is being tested |
| **Module** | System module being tested |
| **Priority** | P1 (Critical), P2 (High), P3 (Medium), P4 (Low) |
| **Type** | Unit, Integration, E2E, Performance, Security, Accessibility |
| **Preconditions** | Conditions that must be met before test execution |
| **Test Data** | Data required for test execution |
| **Test Steps** | Step-by-step instructions |
| **Expected Result** | Expected outcome of the test |
| **Actual Result** | Actual outcome (filled during execution) |
| **Status** | Pass, Fail, Blocked, Not Executed |
| **Defect ID** | Reference to defect if test fails |
| **Notes** | Additional comments or observations |

### Example Test Case

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-001 |
| **Title** | Verify user can login with valid credentials |
| **Description** | Test that a user can successfully login to the system using valid email and password |
| **Module** | Authentication |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | User account exists with valid credentials |
| **Test Data** | Email: test@smartacademy.edu, Password: Test@123 |
| **Test Steps** | 1. Navigate to login page<br>2. Enter valid email<br>3. Enter valid password<br>4. Click login button |
| **Expected Result** | User is redirected to dashboard and authenticated session is created |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

## 3. Authentication Tests

### 3.1 Login Tests

#### TC-AUTH-001: Verify user can login with valid credentials

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-001 |
| **Title** | Verify user can login with valid credentials |
| **Description** | Test that a user can successfully login to the system using valid email and password |
| **Module** | Authentication |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | User account exists with valid credentials |
| **Test Data** | Email: test@smartacademy.edu, Password: Test@123 |
| **Test Steps** | 1. Navigate to login page<br>2. Enter valid email<br>3. Enter valid password<br>4. Click login button |
| **Expected Result** | User is redirected to dashboard and authenticated session is created |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-002: Verify login fails with invalid credentials

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-002 |
| **Title** | Verify login fails with invalid credentials |
| **Description** | Test that login fails when invalid email or password is provided |
| **Module** | Authentication |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | User account exists |
| **Test Data** | Email: test@smartacademy.edu, Password: WrongPassword |
| **Test Steps** | 1. Navigate to login page<br>2. Enter valid email<br>3. Enter invalid password<br>4. Click login button |
| **Expected Result** | Error message "Invalid email or password" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-003: Verify login fails with non-existent email

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-003 |
| **Title** | Verify login fails with non-existent email |
| **Description** | Test that login fails when email does not exist in the system |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | None |
| **Test Data** | Email: nonexistent@smartacademy.edu, Password: AnyPassword |
| **Test Steps** | 1. Navigate to login page<br>2. Enter non-existent email<br>3. Enter any password<br>4. Click login button |
| **Expected Result** | Error message "Invalid email or password" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-004: Verify login fails with empty fields

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-004 |
| **Title** | Verify login fails with empty fields |
| **Description** | Test that login fails when email or password fields are empty |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | None |
| **Test Data** | Email: (empty), Password: (empty) |
| **Test Steps** | 1. Navigate to login page<br>2. Leave email field empty<br>3. Leave password field empty<br>4. Click login button |
| **Expected Result | Validation errors "Email is required" and "Password is required" are displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-005: Verify login fails with invalid email format

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-005 |
| **Title** | Verify login fails with invalid email format |
| **Description** | Test that login fails when email format is invalid |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | None |
| **Test Data** | Email: invalidemail, Password: AnyPassword |
| **Test Steps** | 1. Navigate to login page<br>2. Enter invalid email format<br>3. Enter any password<br>4. Click login button |
| **Expected Result** | Validation error "Invalid email format" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 3.2 Logout Tests

#### TC-AUTH-010: Verify user can logout successfully

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-010 |
| **Title** | Verify user can logout successfully |
| **Description** | Test that a user can successfully logout from the system |
| **Module** | Authentication |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | User is logged in |
| **Test Data** | N/A |
| **Test Steps** | 1. Login with valid credentials<br>2. Navigate to dashboard<br>3. Click logout button<br>4. Confirm logout if prompted |
| **Expected Result** | User is redirected to login page and session is terminated |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-011: Verify session expires after timeout

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-011 |
| **Title** | Verify session expires after timeout |
| **Description** | Test that user session expires after configured timeout period |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | User is logged in |
| **Test Data** | N/A |
| **Test Steps** | 1. Login with valid credentials<br>2. Wait for session timeout (e.g., 30 minutes)<br>3. Attempt to navigate to a protected page |
| **Expected Result** | User is redirected to login page with session expired message |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-012: Verify logout clears all session data

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-012 |
| **Title** | Verify logout clears all session data |
| **Description** | Test that logout clears all session data including cookies and local storage |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | User is logged in |
| **Test Data** | N/A |
| **Test Steps** | 1. Login with valid credentials<br>2. Check browser storage (cookies, localStorage)<br>3. Click logout button<br>4. Check browser storage again |
| **Expected Result** | All session data is cleared from browser storage |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 3.3 Password Reset Tests

#### TC-AUTH-020: Verify user can request password reset

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-020 |
| **Title** | Verify user can request password reset |
| **Description** | Test that a user can request a password reset email |
| **Module** | Authentication |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | User account exists |
| **Test Data** | Email: test@smartacademy.edu |
| **Test Steps** | 1. Navigate to login page<br>2. Click "Forgot Password" link<br>3. Enter registered email<br>4. Click "Send Reset Link" button |
| **Expected Result** | Success message "Password reset link sent to your email" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-021: Verify password reset fails with non-existent email

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-021 |
| **Title** | Verify password reset fails with non-existent email |
| **Description** | Test that password reset fails when email does not exist |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | None |
| **Test Data** | Email: nonexistent@smartacademy.edu |
| **Test Steps** | 1. Navigate to login page<br>2. Click "Forgot Password" link<br>3. Enter non-existent email<br>4. Click "Send Reset Link" button |
| **Expected Result** | Error message "Email not found" is displayed (or generic message for security) |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-022: Verify user can reset password with valid token

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-022 |
| **Title** | Verify user can reset password with valid token |
| **Description** | Test that a user can reset password using valid reset token from email |
| **Module** | Authentication |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Password reset email received with valid token |
| **Test Data** | New Password: NewTest@123, Confirm Password: NewTest@123 |
| **Test Steps** | 1. Click password reset link from email<br>2. Enter new password<br>3. Enter confirm password<br>4. Click "Reset Password" button |
| **Expected Result** | Success message "Password reset successfully" is displayed and user can login with new password |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-023: Verify password reset fails with mismatched passwords

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-023 |
| **Title** | Verify password reset fails with mismatched passwords |
| **Description** | Test that password reset fails when passwords do not match |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Password reset email received with valid token |
| **Test Data** | New Password: NewTest@123, Confirm Password: Different@123 |
| **Test Steps** | 1. Click password reset link from email<br>2. Enter new password<br>3. Enter different confirm password<br>4. Click "Reset Password" button |
| **Expected Result** | Validation error "Passwords do not match" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-024: Verify password reset fails with weak password

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-024 |
| **Title** | Verify password reset fails with weak password |
| **Description** | Test that password reset fails when new password does not meet strength requirements |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Password reset email received with valid token |
| **Test Data** | New Password: weak, Confirm Password: weak |
| **Test Steps** | 1. Click password reset link from email<br>2. Enter weak password<br>3. Click "Reset Password" button |
| **Expected Result** | Validation error "Password must be at least 8 characters and include uppercase, lowercase, number, and special character" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 3.4 MFA Tests

#### TC-AUTH-030: Verify MFA code is sent after login

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-030 |
| **Title** | Verify MFA code is sent after login |
| **Description** | Test that MFA code is sent to user's registered device after successful login |
| **Module** | Authentication |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | User has MFA enabled |
| **Test Data** | Email: mfauser@smartacademy.edu, Password: Test@123 |
| **Test Steps** | 1. Navigate to login page<br>2. Enter valid email and password<br>3. Click login button<br>4. Check registered device for MFA code |
| **Expected Result** | MFA code is sent to user's registered device and MFA verification page is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-031: Verify user can login with valid MFA code

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-031 |
| **Title** | Verify user can login with valid MFA code |
| **Description** | Test that user can complete login by entering valid MFA code |
| **Module** | Authentication |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | User has received MFA code |
| **Test Data** | MFA Code: 123456 |
| **Test Steps** | 1. Enter valid MFA code<br>2. Click "Verify" button |
| **Expected Result** | User is redirected to dashboard and authenticated session is created |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-032: Verify login fails with invalid MFA code

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-032 |
| **Title** | Verify login fails with invalid MFA code |
| **Description** | Test that login fails when invalid MFA code is entered |
| **Module** | Authentication |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | User is on MFA verification page |
| **Test Data** | MFA Code: 000000 |
| **Test Steps** | 1. Enter invalid MFA code<br>2. Click "Verify" button |
| **Expected Result** | Error message "Invalid MFA code" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-033: Verify MFA code expires after timeout

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-033 |
| **Title** | Verify MFA code expires after timeout |
| **Description** | Test that MFA code expires after configured timeout period |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | User has received MFA code |
| **Test Data** | N/A |
| **Test Steps** | 1. Wait for MFA code to expire (e.g., 5 minutes)<br>2. Enter expired MFA code<br>3. Click "Verify" button |
| **Expected Result** | Error message "MFA code has expired" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 3.5 SSO Tests

#### TC-AUTH-040: Verify user can login via SSO

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-040 |
| **Title** | Verify user can login via SSO |
| **Description** | Test that a user can login using Single Sign-On (Google/Microsoft) |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | User has SSO account linked |
| **Test Data** | N/A |
| **Test Steps** | 1. Navigate to login page<br>2. Click "Login with Google" button<br>3. Complete Google authentication<br>4. Grant permissions if prompted |
| **Expected Result** | User is redirected to dashboard and authenticated session is created |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-AUTH-041: Verify SSO creates new user account if not exists

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-AUTH-041 |
| **Title** | Verify SSO creates new user account if not exists |
| **Description** | Test that SSO creates a new user account if user does not exist in the system |
| **Module** | Authentication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | User does not have an account in the system |
| **Test Data** | N/A |
| **Test Steps** | 1. Navigate to login page<br>2. Click "Login with Google" button<br>3. Complete Google authentication with new account<br>4. Complete profile setup if required |
| **Expected Result** | New user account is created and user is redirected to dashboard |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

## 4. Student Management Tests

### 4.1 Create Student Tests

#### TC-STU-001: Verify admin can create new student

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-001 |
| **Title** | Verify admin can create new student |
| **Description** | Test that an admin can create a new student record |
| **Module** | Student Management |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in |
| **Test Data** | Name: Ahmed Rahman, Class: Class 5, Section: A, Roll Number: 25, Date of Birth: 2013-05-15 |
| **Test Steps** | 1. Navigate to Students page<br>2. Click "Add Student" button<br>3. Fill student details form<br>4. Upload required documents<br>5. Click "Save" button |
| **Expected Result** | Student is created successfully and confirmation message is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-STU-002: Verify student creation fails with duplicate roll number

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-002 |
| **Title** | Verify student creation fails with duplicate roll number |
| **Description** | Test that student creation fails when roll number already exists in the same class and section |
| **Module** | Student Management |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, student with roll number 25 exists in Class 5-A |
| **Test Data** | Name: New Student, Class: Class 5, Section: A, Roll Number: 25 |
| **Test Steps** | 1. Navigate to Students page<br>2. Click "Add Student" button<br>3. Fill student details with duplicate roll number<br>4. Click "Save" button |
| **Expected Result** | Error message "Roll number already exists in this class and section" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-STU-003: Verify student creation fails with invalid date of birth

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-003 |
| **Title** | Verify student creation fails with invalid date of birth |
| **Description** | Test that student creation fails when date of birth is invalid or in the future |
| **Module** | Student Management |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in |
| **Test Data** | Date of Birth: 2030-01-01 |
| **Test Steps** | 1. Navigate to Students page<br>2. Click "Add Student" button<br>3. Fill student details with future date of birth<br>4. Click "Save" button |
| **Expected Result** | Validation error "Date of birth cannot be in the future" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-STU-004: Verify student creation requires mandatory fields

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-004 |
| **Title** | Verify student creation requires mandatory fields |
| **Description** | Test that student creation fails when mandatory fields are missing |
| **Module** | Student Management |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in |
| **Test Data** | Name: (empty), Class: (empty), Section: (empty), Roll Number: (empty) |
| **Test Steps** | 1. Navigate to Students page<br>2. Click "Add Student" button<br>3. Leave mandatory fields empty<br>4. Click "Save" button |
| **Expected Result** | Validation errors for all mandatory fields are displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 4.2 Read Student Tests

#### TC-STU-010: Verify admin can view student list

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-010 |
| **Title** | Verify admin can view student list |
| **Description** | Test that an admin can view the list of all students |
| **Module** | Student Management |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, students exist in the system |
| **Test Data** | N/A |
| **Test Steps** | 1. Navigate to Students page<br>2. Verify student list is displayed |
| **Expected Result** | Student list is displayed with all student information |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-STU-011: Verify admin can view student details

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-011 |
| **Title** | Verify admin can view student details |
| **Description** | Test that an admin can view detailed information about a specific student |
| **Module** | Student Management |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, student exists |
| **Test Data** | Student ID: 123 |
| **Test Steps** | 1. Navigate to Students page<br>2. Click on a student from the list<br>3. Verify student details are displayed |
| **Expected Result** | Student details page is displayed with complete student information |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-STU-012: Verify student list can be filtered by class

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-012 |
| **Title** | Verify student list can be filtered by class |
| **Description** | Test that student list can be filtered by class |
| **Module** | Student Management |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, students exist in multiple classes |
| **Test Data** | Class: Class 5 |
| **Test Steps** | 1. Navigate to Students page<br>2. Select "Class 5" from class filter<br>3. Click "Apply Filter" button |
| **Expected Result** | Only students from Class 5 are displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-STU-013: Verify student list can be searched by name

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-013 |
| **Title** | Verify student list can be searched by name |
| **Description** | Test that student list can be searched by student name |
| **Module** | Student Management |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, students exist |
| **Test Data** | Search term: Ahmed |
| **Test Steps** | 1. Navigate to Students page<br>2. Enter "Ahmed" in search box<br>3. Click "Search" button |
| **Expected Result** | Only students with name containing "Ahmed" are displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 4.3 Update Student Tests

#### TC-STU-020: Verify admin can update student information

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-020 |
| **Title** | Verify admin can update student information |
| **Description** | Test that an admin can update student information |
| **Module** | Student Management |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, student exists |
| **Test Data** | Updated Name: Ahmed Rahman Updated |
| **Test Steps** | 1. Navigate to Students page<br>2. Click on a student from the list<br>3. Click "Edit" button<br>4. Update student information<br>5. Click "Save" button |
| **Expected Result** | Student information is updated successfully and confirmation message is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-STU-021: Verify student update fails with invalid data

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-021 |
| **Title** | Verify student update fails with invalid data |
| **Description** | Test that student update fails when invalid data is provided |
| **Module** | Student Management |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, student exists |
| **Test Data** | Date of Birth: 2030-01-01 |
| **Test Steps** | 1. Navigate to Students page<br>2. Click on a student from the list<br>3. Click "Edit" button<br>4. Update date of birth to future date<br>5. Click "Save" button |
| **Expected Result** | Validation error "Date of birth cannot be in the future" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 4.4 Delete Student Tests

#### TC-STU-030: Verify admin can delete student

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-030 |
| **Title** | Verify admin can delete student |
| **Description** | Test that an admin can delete a student record |
| **Module** | Student Management |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, student exists |
| **Test Data** | Student ID: 123 |
| **Test Steps** | 1. Navigate to Students page<br>2. Click on a student from the list<br>3. Click "Delete" button<br>4. Confirm deletion |
| **Expected Result** | Student is deleted successfully and confirmation message is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-STU-031: Verify student deletion cascades to related records

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-031 |
| **Title** | Verify student deletion cascades to related records |
| **Description** | Test that deleting a student also deletes related records (attendance, grades, etc.) |
| **Module** | Student Management |
| **Priority** | P2 |
| **Type** | Integration |
| **Preconditions** | Admin is logged in, student exists with attendance and grade records |
| **Test Data** | Student ID: 123 |
| **Test Steps** | 1. Navigate to Students page<br>2. Click on a student from the list<br>3. Click "Delete" button<br>4. Confirm deletion<br>5. Verify attendance and grade records are deleted |
| **Expected Result** | Student and all related records are deleted successfully |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 4.5 Search and Filter Tests

#### TC-STU-040: Verify student list supports multiple filters

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-040 |
| **Title** | Verify student list supports multiple filters |
| **Description** | Test that student list can be filtered by multiple criteria simultaneously |
| **Module** | Student Management |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, students exist |
| **Test Data** | Class: Class 5, Section: A, Gender: Male |
| **Test Steps** | 1. Navigate to Students page<br>2. Select "Class 5" from class filter<br>3. Select "A" from section filter<br>4. Select "Male" from gender filter<br>5. Click "Apply Filter" button |
| **Expected Result** | Only students matching all filter criteria are displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-STU-041: Verify student list pagination works correctly

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-STU-041 |
| **Title** | Verify student list pagination works correctly |
| **Description** | Test that student list pagination works correctly |
| **Module** | Student Management |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, more than 50 students exist |
| **Test Data** | N/A |
| **Test Steps** | 1. Navigate to Students page<br>2. Verify first page shows 50 students<br>3. Click "Next" button<br>4. Verify next page shows next 50 students<br>5. Click "Previous" button |
| **Expected Result** | Pagination works correctly and displays appropriate students on each page |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

## 5. Attendance Tests

### 5.1 Mark Attendance Tests

#### TC-ATT-001: Verify teacher can mark attendance for class

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-001 |
| **Title** | Verify teacher can mark attendance for class |
| **Description** | Test that a teacher can mark attendance for all students in a class |
| **Module** | Attendance |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in, class has students |
| **Test Data** | Class: Class 5, Section: A, Date: 2026-01-10 |
| **Test Steps** | 1. Navigate to Attendance page<br>2. Select class and section<br>3. Select date<br>4. Click "Load Students" button<br>5. Mark attendance for each student<br>6. Click "Submit" button |
| **Expected Result** | Attendance is saved successfully and confirmation message is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-ATT-002: Verify attendance cannot be marked twice for same date

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-002 |
| **Title** | Verify attendance cannot be marked twice for same date |
| **Description** | Test that attendance cannot be marked twice for the same class and date |
| **Module** | Attendance |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in, attendance already marked for Class 5-A on 2026-01-10 |
| **Test Data** | Class: Class 5, Section: A, Date: 2026-01-10 |
| **Test Steps** | 1. Navigate to Attendance page<br>2. Select class and section<br>3. Select date with existing attendance<br>4. Click "Load Students" button |
| **Expected Result** | Message "Attendance already marked for this date" is displayed with option to edit |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-ATT-003: Verify attendance can be edited after submission

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-003 |
| **Title** | Verify attendance can be edited after submission |
| **Description** | Test that attendance can be edited after submission within allowed time period |
| **Module** | Attendance |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in, attendance marked for Class 5-A on 2026-01-10 |
| **Test Data** | Class: Class 5, Section: A, Date: 2026-01-10 |
| **Test Steps** | 1. Navigate to Attendance page<br>2. Select class and section<br>3. Select date with existing attendance<br>4. Click "Edit" button<br>5. Update attendance for a student<br>6. Click "Save" button |
| **Expected Result** | Attendance is updated successfully and confirmation message is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-ATT-004: Verify bulk attendance marking works

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-004 |
| **Title** | Verify bulk attendance marking works |
| **Description** | Test that attendance can be marked in bulk (all present, all absent) |
| **Module** | Attendance |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in, class has students |
| **Test Data** | Class: Class 5, Section: A, Date: 2026-01-10 |
| **Test Steps** | 1. Navigate to Attendance page<br>2. Select class and section<br>3. Select date<br>4. Click "Load Students" button<br>5. Click "Mark All Present" button<br>6. Click "Submit" button |
| **Expected Result** | All students are marked as present and attendance is saved successfully |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 5.2 Attendance Calculation Tests

#### TC-ATT-010: Verify attendance percentage is calculated correctly

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-010 |
| **Title** | Verify attendance percentage is calculated correctly |
| **Description** | Test that attendance percentage is calculated correctly for a student |
| **Module** | Attendance |
| **Priority** | P1 |
| **Type** | Integration |
| **Preconditions** | Student has attendance records |
| **Test Data** | Student ID: 123, Total days: 30, Present: 27, Absent: 3 |
| **Test Steps** | 1. Navigate to Student Details page<br>2. Check attendance section<br>3. Verify attendance percentage |
| **Expected Result** | Attendance percentage is displayed as 90% (27/30 * 100) |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-ATT-011: Verify attendance calculation includes all attendance types

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-011 |
| **Title** | Verify attendance calculation includes all attendance types |
| **Description** | Test that attendance calculation includes present, absent, late, and leave |
| **Module** | Attendance |
| **Priority** | P2 |
| **Type** | Integration |
| **Preconditions** | Student has attendance records with various types |
| **Test Data** | Student ID: 123, Present: 20, Late: 5, Leave: 3, Absent: 2 |
| **Test Steps** | 1. Navigate to Student Details page<br>2. Check attendance section<br>3. Verify attendance breakdown |
| **Expected Result** | Attendance breakdown shows: Present: 20, Late: 5, Leave: 3, Absent: 2 |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 5.3 Attendance Report Tests

#### TC-ATT-020: Verify attendance report can be generated

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-020 |
| **Title** | Verify attendance report can be generated |
| **Description** | Test that attendance report can be generated for a class and date range |
| **Module** | Attendance |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in, attendance records exist |
| **Test Data** | Class: Class 5, Section: A, Start Date: 2026-01-01, End Date: 2026-01-31 |
| **Test Steps** | 1. Navigate to Attendance Reports page<br>2. Select class and section<br>3. Select date range<br>4. Click "Generate Report" button |
| **Expected Result** | Attendance report is generated with all students and their attendance for the period |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-ATT-021: Verify attendance report can be exported to PDF

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-021 |
| **Title** | Verify attendance report can be exported to PDF |
| **Description** | Test that attendance report can be exported to PDF format |
| **Module** | Attendance |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Attendance report is generated |
| **Test Data** | N/A |
| **Test Steps** | 1. Generate attendance report<br>2. Click "Export PDF" button<br>3. Verify PDF is downloaded |
| **Expected Result** | PDF file is downloaded with attendance report data |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-ATT-022: Verify attendance report can be exported to Excel

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-022 |
| **Title** | Verify attendance report can be exported to Excel |
| **Description** | Test that attendance report can be exported to Excel format |
| **Module** | Attendance |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Attendance report is generated |
| **Test Data** | N/A |
| **Test Steps** | 1. Generate attendance report<br>2. Click "Export Excel" button<br>3. Verify Excel file is downloaded |
| **Expected Result** | Excel file is downloaded with attendance report data |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 5.4 Attendance Notification Tests

#### TC-ATT-030: Verify notification is sent when attendance is below threshold

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ATT-030 |
| **Title** | Verify notification is sent when attendance is below threshold |
| **Description** | Test that notification is sent to parents when student attendance falls below threshold |
| **Module** | Attendance |
| **Priority** | P2 |
| **Type** | Integration |
| **Preconditions** | Student attendance falls below threshold (e.g., 75%) |
| **Test Data** | Student ID: 123, Attendance: 70% |
| **Test Steps** | 1. Mark attendance for student<br>2. Verify attendance drops below threshold<br>3. Check parent notification |
| **Expected Result** | SMS/Email notification is sent to parent about low attendance |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

## 6. Grading Tests

### 6.1 Grade Entry Tests

#### TC-GRD-001: Verify teacher can enter grades for students

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-001 |
| **Title** | Verify teacher can enter grades for students |
| **Description** | Test that a teacher can enter grades for all students in a class for a subject |
| **Module** | Grading |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in, class has students |
| **Test Data** | Class: Class 5, Section: A, Subject: Mathematics, Exam: Midterm |
| **Test Steps** | 1. Navigate to Grading page<br>2. Select class, section, subject, and exam<br>3. Click "Load Students" button<br>4. Enter grades for each student<br>5. Click "Save" button |
| **Expected Result** | Grades are saved successfully and confirmation message is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-GRD-002: Verify grade entry validates marks range

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-002 |
| **Title** | Verify grade entry validates marks range |
| **Description** | Test that grade entry validates marks are within valid range (0-100) |
| **Module** | Grading |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in |
| **Test Data** | Marks: 105 |
| **Test Steps** | 1. Navigate to Grading page<br>2. Select class, section, subject, and exam<br>3. Click "Load Students" button<br>4. Enter marks greater than 100<br>5. Click "Save" button |
| **Expected Result** | Validation error "Marks must be between 0 and 100" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-GRD-003: Verify grades cannot be entered twice for same exam

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-003 |
| **Title** | Verify grades cannot be entered twice for same exam |
| **Description** | Test that grades cannot be entered twice for the same class, subject, and exam |
| **Module** | Grading |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in, grades already entered for Class 5-A Mathematics Midterm |
| **Test Data** | Class: Class 5, Section: A, Subject: Mathematics, Exam: Midterm |
| **Test Steps** | 1. Navigate to Grading page<br>2. Select class, section, subject, and exam with existing grades<br>3. Click "Load Students" button |
| **Expected Result** | Message "Grades already entered for this exam" is displayed with option to edit |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 6.2 Grade Calculation Tests

#### TC-GRD-010: Verify grade is calculated correctly from marks

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-010 |
| **Title** | Verify grade is calculated correctly from marks |
| **Description** | Test that grade is calculated correctly from marks according to grading scale |
| **Module** | Grading |
| **Priority** | P1 |
| **Type** | Integration |
| **Preconditions** | Marks are entered for student |
| **Test Data** | Marks: 85 |
| **Test Steps** | 1. Enter marks for student<br>2. Verify calculated grade |
| **Expected Result** | Grade is displayed as "A+" (80-100 = A+) |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-GRD-011: Verify all grades are calculated correctly

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-011 |
| **Title** | Verify all grades are calculated correctly |
| **Description** | Test that all grades are calculated correctly according to grading scale |
| **Module** | Grading |
| **Priority** | P1 |
| **Type** | Integration |
| **Preconditions** | N/A |
| **Test Data** | Various marks: 95, 85, 75, 65, 55, 45, 35, 25 |
| **Test Steps** | 1. Enter marks for each value<br>2. Verify calculated grade for each |
| **Expected Result** | Grades: 95=A+, 85=A+, 75=A-, 65=B+, 55=B, 45=C, 35=D, 25=F |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 6.3 GPA Calculation Tests

#### TC-GRD-020: Verify GPA is calculated correctly for student

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-020 |
| **Title** | Verify GPA is calculated correctly for student |
| **Description** | Test that GPA is calculated correctly from grades for all subjects |
| **Module** | Grading |
| **Priority** | P1 |
| **Type** | Integration |
| **Preconditions** | Grades are entered for all subjects |
| **Test Data** | Grades: Mathematics=A+, English=A, Science=A-, Bengali=B+ |
| **Test Steps** | 1. Navigate to Student Details page<br>2. Check GPA section<br>3. Verify calculated GPA |
| **Expected Result** | GPA is calculated correctly based on grade points (A+=5.0, A=4.75, A-=4.5, B+=4.25) |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-GRD-021: Verify GPA calculation handles failed subjects

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-021 |
| **Title** | Verify GPA calculation handles failed subjects |
| **Description** | Test that GPA calculation correctly handles failed subjects (F grade) |
| **Module** | Grading |
| **Priority** | P2 |
| **Type** | Integration |
| **Preconditions** | Grades are entered including failed subjects |
| **Test Data** | Grades: Mathematics=A+, English=A, Science=F, Bengali=B+ |
| **Test Steps** | 1. Navigate to Student Details page<br>2. Check GPA section<br>3. Verify calculated GPA |
| **Expected Result** | GPA is calculated correctly with F grade contributing 0.0 points |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 6.4 Report Card Tests

#### TC-GRD-030: Verify report card can be generated for student

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-030 |
| **Title** | Verify report card can be generated for student |
| **Description** | Test that report card can be generated for a student for a term |
| **Module** | Grading |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in, grades are entered for all subjects |
| **Test Data** | Student ID: 123, Term: Midterm 2026 |
| **Test Steps** | 1. Navigate to Report Cards page<br>2. Select student and term<br>3. Click "Generate Report Card" button |
| **Expected Result** | Report card is generated with all subjects, grades, and GPA |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-GRD-031: Verify report card can be exported to PDF

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-031 |
| **Title** | Verify report card can be exported to PDF |
| **Description** | Test that report card can be exported to PDF format |
| **Module** | Grading |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Report card is generated |
| **Test Data** | N/A |
| **Test Steps** | 1. Generate report card<br>2. Click "Export PDF" button<br>3. Verify PDF is downloaded |
| **Expected Result** | PDF file is downloaded with report card data |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-GRD-032: Verify report card includes all required information

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-GRD-032 |
| **Title** | Verify report card includes all required information |
| **Description** | Test that report card includes all required information |
| **Module** | Grading |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Report card is generated |
| **Test Data** | N/A |
| **Test Steps** | 1. Generate report card<br>2. Verify report card includes:<br>   - Student information<br>   - School information<br>   - Term information<br>   - Subject-wise grades<br>   - GPA<br>   - Attendance<br>   - Remarks |
| **Expected Result** | Report card includes all required information |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

## 7. Payment Tests

### 7.1 Payment Initiation Tests

#### TC-PAY-001: Verify parent can initiate payment for fees

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-PAY-001 |
| **Title** | Verify parent can initiate payment for fees |
| **Description** | Test that a parent can initiate payment for student fees |
| **Module** | Payment |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Parent is logged in, fees are due |
| **Test Data** | Student ID: 123, Fee Amount: 5,000 BDT |
| **Test Steps** | 1. Navigate to Fees page<br>2. View due fees<br>3. Click "Pay Now" button<br>4. Select payment method (bKash/Nagad/SSLCommerz)<br>5. Click "Continue" button |
| **Expected Result** | Payment is initiated and user is redirected to payment gateway |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-PAY-002: Verify payment initiation fails with invalid amount

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-PAY-002 |
| **Title** | Verify payment initiation fails with invalid amount |
| **Description** | Test that payment initiation fails when amount is invalid |
| **Module** | Payment |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Parent is logged in |
| **Test Data** | Amount: -100 |
| **Test Steps** | 1. Navigate to Fees page<br>2. Enter invalid amount<br>3. Click "Pay Now" button |
| **Expected Result** | Validation error "Invalid amount" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 7.2 Payment Processing Tests

#### TC-PAY-010: Verify payment is processed successfully via bKash

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-PAY-010 |
| **Title** | Verify payment is processed successfully via bKash |
| **Description** | Test that payment is processed successfully via bKash payment gateway |
| **Module** | Payment |
| **Priority** | P1 |
| **Type** | E2E |
| **Preconditions** | Payment is initiated via bKash |
| **Test Data** | bKash Number: 01712345678, PIN: 12345 |
| **Test Steps** | 1. Enter bKash number<br>2. Click "Pay Now" button<br>3. Enter PIN on bKash page<br>4. Confirm payment |
| **Expected Result** | Payment is processed successfully and user is redirected to success page |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-PAY-011: Verify payment fails with insufficient balance

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-PAY-011 |
| **Title** | Verify payment fails with insufficient balance |
| **Description** | Test that payment fails when account has insufficient balance |
| **Module** | Payment |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Payment is initiated |
| **Test Data** | Account with insufficient balance |
| **Test Steps** | 1. Enter payment details<br>2. Click "Pay Now" button<br>3. Verify payment fails |
| **Expected Result** | Error message "Insufficient balance" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 7.3 Payment Callback Tests

#### TC-PAY-020: Verify payment callback updates payment status

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-PAY-020 |
| **Title** | Verify payment callback updates payment status |
| **Description** | Test that payment callback from gateway updates payment status correctly |
| **Module** | Payment |
| **Priority** | P1 |
| **Type** | Integration |
| **Preconditions** | Payment is initiated |
| **Test Data** | Payment ID: PAY123, Status: success |
| **Test Steps** | 1. Simulate payment callback from gateway<br>2. Verify payment status is updated<br>3. Verify fee status is updated |
| **Expected Result** | Payment status is updated to "Paid" and fee status is updated to "Paid" |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-PAY-021: Verify failed payment callback updates status

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-PAY-021 |
| **Title** | Verify failed payment callback updates status |
| **Description** | Test that failed payment callback updates payment status correctly |
| **Module** | Payment |
| **Priority** | P2 |
| **Type** | Integration |
| **Preconditions** | Payment is initiated |
| **Test Data** | Payment ID: PAY123, Status: failed |
| **Test Steps** | 1. Simulate failed payment callback from gateway<br>2. Verify payment status is updated |
| **Expected Result** | Payment status is updated to "Failed" |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 7.4 Refund Tests

#### TC-PAY-030: Verify refund can be initiated for payment

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-PAY-030 |
| **Title** | Verify refund can be initiated for payment |
| **Description** | Test that refund can be initiated for a payment |
| **Module** | Payment |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, payment exists with status "Paid" |
| **Test Data** | Payment ID: PAY123, Refund Amount: 5,000 BDT |
| **Test Steps** | 1. Navigate to Payments page<br>2. Select payment<br>3. Click "Refund" button<br>4. Enter refund amount<br>5. Click "Submit" button |
| **Expected Result** | Refund is initiated and confirmation message is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-PAY-031: Verify refund cannot exceed payment amount

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-PAY-031 |
| **Title** | Verify refund cannot exceed payment amount |
| **Description** | Test that refund cannot exceed original payment amount |
| **Module** | Payment |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in, payment exists with amount 5,000 BDT |
| **Test Data** | Payment ID: PAY123, Refund Amount: 10,000 BDT |
| **Test Steps** | 1. Navigate to Payments page<br>2. Select payment<br>3. Click "Refund" button<br>4. Enter refund amount exceeding payment<br>5. Click "Submit" button |
| **Expected Result** | Validation error "Refund amount cannot exceed payment amount" is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

## 8. Communication Tests

### 8.1 Notification Tests

#### TC-COM-001: Verify SMS notification is sent for attendance

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-COM-001 |
| **Title** | Verify SMS notification is sent for attendance |
| **Description** | Test that SMS notification is sent to parent when attendance is marked |
| **Module** | Communication |
| **Priority** | P2 |
| **Type** | Integration |
| **Preconditions** | Attendance is marked for student |
| **Test Data** | Student ID: 123, Parent Phone: +8801712345678 |
| **Test Steps** | 1. Mark attendance for student<br>2. Verify SMS is sent to parent |
| **Expected Result** | SMS notification is sent to parent with attendance information |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-COM-002: Verify email notification is sent for grades

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-COM-002 |
| **Title** | Verify email notification is sent for grades |
| **Description** | Test that email notification is sent to parent when grades are published |
| **Module** | Communication |
| **Priority** | P2 |
| **Type** | Integration |
| **Preconditions** | Grades are published for student |
| **Test Data** | Student ID: 123, Parent Email: parent@example.com |
| **Test Steps** | 1. Publish grades for student<br>2. Verify email is sent to parent |
| **Expected Result** | Email notification is sent to parent with grade information |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-COM-003: Verify push notification is sent for announcements

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-COM-003 |
| **Title** | Verify push notification is sent for announcements |
| **Description** | Test that push notification is sent to users for announcements |
| **Module** | Communication |
| **Priority** | P2 |
| **Type** | Integration |
| **Preconditions** | Announcement is created |
| **Test Data** | Announcement: School closed tomorrow |
| **Test Steps** | 1. Create announcement<br>2. Verify push notification is sent |
| **Expected Result** | Push notification is sent to all users with announcement |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 8.2 Preference Tests

#### TC-COM-010: Verify user can set notification preferences

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-COM-010 |
| **Title** | Verify user can set notification preferences |
| **Description** | Test that a user can set their notification preferences |
| **Module** | Communication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | User is logged in |
| **Test Data** | SMS: Enabled, Email: Enabled, Push: Disabled |
| **Test Steps** | 1. Navigate to Settings page<br>2. Navigate to Notification Preferences<br>3. Set preferences<br>4. Click "Save" button |
| **Expected Result** | Notification preferences are saved successfully |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-COM-011: Verify notifications respect user preferences

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-COM-011 |
| **Title** | Verify notifications respect user preferences |
| **Description** | Test that notifications are sent only according to user preferences |
| **Module** | Communication |
| **Priority** | P2 |
| **Type** | Integration |
| **Preconditions** | User has set notification preferences (SMS: Enabled, Email: Disabled) |
| **Test Data** | N/A |
| **Test Steps** | 1. Trigger notification event<br>2. Verify SMS is sent<br>3. Verify email is not sent |
| **Expected Result** | SMS is sent, email is not sent according to preferences |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 8.3 Broadcasting Tests

#### TC-COM-020: Verify admin can broadcast message to all parents

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-COM-020 |
| **Title** | Verify admin can broadcast message to all parents |
| **Description** | Test that an admin can broadcast a message to all parents |
| **Module** | Communication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in |
| **Test Data** | Message: School will be closed tomorrow due to weather |
| **Test Steps** | 1. Navigate to Broadcast page<br>2. Select target audience: All Parents<br>3. Enter message<br>4. Click "Send" button |
| **Expected Result** | Message is sent to all parents and confirmation is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-COM-021: Verify admin can broadcast message to specific class

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-COM-021 |
| **Title** | Verify admin can broadcast message to specific class |
| **Description** | Test that an admin can broadcast a message to parents of a specific class |
| **Module** | Communication |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Admin is logged in |
| **Test Data** | Class: Class 5, Message: Class 5 parent meeting tomorrow |
| **Test Steps** | 1. Navigate to Broadcast page<br>2. Select target audience: Class 5 Parents<br>3. Enter message<br>4. Click "Send" button |
| **Expected Result** | Message is sent to Class 5 parents only and confirmation is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

## 9. Islamic Education Tests

### 9.1 Quran Progress Tests

#### TC-ISL-001: Verify teacher can record Quran progress

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ISL-001 |
| **Title** | Verify teacher can record Quran progress |
| **Description** | Test that a teacher can record Quran memorization progress for a student |
| **Module** | Islamic Education |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in |
| **Test Data** | Student ID: 123, Surah: Al-Baqarah, Verse: 1-10, Status: Memorized |
| **Test Steps** | 1. Navigate to Quran Progress page<br>2. Select student<br>3. Enter surah and verse range<br>4. Select status<br>5. Click "Save" button |
| **Expected Result** | Quran progress is recorded successfully and confirmation message is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

#### TC-ISL-002: Verify Quran progress is displayed correctly

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ISL-002 |
| **Title** | Verify Quran progress is displayed correctly |
| **Description** | Test that Quran progress is displayed correctly for a student |
| **Module** | Islamic Education |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Quran progress records exist for student |
| **Test Data** | Student ID: 123 |
| **Test Steps** | 1. Navigate to Student Details page<br>2. Navigate to Quran Progress section<br>3. Verify progress is displayed |
| **Expected Result** | Quran progress is displayed with surah, verses, and status |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 9.2 Tajweed Tests

#### TC-ISL-010: Verify teacher can record Tajweed assessment

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ISL-010 |
| **Title** | Verify teacher can record Tajweed assessment |
| **Description** | Test that a teacher can record Tajweed assessment for a student |
| **Module** | Islamic Education |
| **Priority** | P2 |
| **Type** | E2E |
| **Preconditions** | Teacher is logged in |
| **Test Data** | Student ID: 123, Level: Intermediate, Score: 85, Remarks: Good progress |
| **Test Steps** | 1. Navigate to Tajweed Assessment page<br>2. Select student<br>3. Select level<br>4. Enter score and remarks<br>5. Click "Save" button |
| **Expected Result** | Tajweed assessment is recorded successfully and confirmation message is displayed |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

### 9.3 Prayer Times Tests

#### TC-ISL-020: Verify prayer times are displayed correctly

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-ISL-020 |
| **Title** | Verify prayer times are displayed correctly |
| **Description** | Test that Islamic prayer times are displayed correctly based on location |
| **Module** | Islamic Education |
| **Priority** | P3 |
| **Type** | E2E |
| **Preconditions** | User is logged in, location is set |
| **Test Data** | Location: Lakshmipur, Bangladesh |
| **Test Steps** | 1. Navigate to Prayer Times page<br>2. Verify prayer times are displayed<br>3. Verify times are accurate for location |
| **Expected Result** | Prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) are displayed correctly for the location |
| **Actual Result** | |
| **Status** | |
| **Defect ID** | |
| **Notes** | |

---

## 10. Expected Results Summary

### Test Case Summary by Module

| Module | Total Test Cases | P1 | P2 | P3 | P4 |
|--------|------------------|----|----|----|----|
| **Authentication** | 13 | 6 | 5 | 2 | 0 |
| **Student Management** | 12 | 5 | 7 | 0 | 0 |
| **Attendance** | 11 | 5 | 6 | 0 | 0 |
| **Grading** | 12 | 6 | 6 | 0 | 0 |
| **Payment** | 11 | 4 | 7 | 0 | 0 |
| **Communication** | 11 | 0 | 11 | 0 | 0 |
| **Islamic Education** | 5 | 0 | 4 | 1 | 0 |
| **Total** | **75** | **26** | **46** | **3** | **0** |

### Expected Pass Rate

| Test Type | Expected Pass Rate |
|-----------|-------------------|
| **Unit Tests** | 100% |
| **Integration Tests** | 95% |
| **E2E Tests** | 90% |
| **Performance Tests** | 100% (after optimization) |
| **Security Tests** | 100% (after fixes) |
| **Accessibility Tests** | 100% (after fixes) |

### Critical Test Cases (P1)

The following test cases are critical and must pass before release:

1. TC-AUTH-001: Verify user can login with valid credentials
2. TC-AUTH-010: Verify user can logout successfully
3. TC-AUTH-020: Verify user can request password reset
4. TC-AUTH-022: Verify user can reset password with valid token
5. TC-AUTH-030: Verify MFA code is sent after login
6. TC-AUTH-031: Verify user can login with valid MFA code
7. TC-STU-001: Verify admin can create new student
8. TC-STU-010: Verify admin can view student list
9. TC-STU-011: Verify admin can view student details
10. TC-STU-020: Verify admin can update student information
11. TC-STU-030: Verify admin can delete student
12. TC-ATT-001: Verify teacher can mark attendance for class
13. TC-ATT-010: Verify attendance percentage is calculated correctly
14. TC-ATT-020: Verify attendance report can be generated
15. TC-GRD-001: Verify teacher can enter grades for students
16. TC-GRD-010: Verify grade is calculated correctly from marks
17. TC-GRD-011: Verify all grades are calculated correctly
18. TC-GRD-020: Verify GPA is calculated correctly for student
19. TC-GRD-030: Verify report card can be generated for student
20. TC-GRD-032: Verify report card includes all required information
21. TC-PAY-001: Verify parent can initiate payment for fees
22. TC-PAY-010: Verify payment is processed successfully via bKash
23. TC-PAY-020: Verify payment callback updates payment status

---

## 11. Test Data Requirements

### Test Data Categories

#### 1. User Accounts

| Role | Quantity | Description |
|------|----------|-------------|
| **Admin** | 2 | Full system access |
| **Teacher** | 5 | Limited to assigned classes |
| **Parent** | 20 | Access to their children's data |
| **Student** | 100 | Various classes and sections |
| **Accountant** | 1 | Payment and fee management |

#### 2. Student Records

| Class | Section | Students | Description |
|-------|---------|----------|-------------|
| **Class 1** | A, B | 30 each | Early childhood students |
| **Class 2** | A, B | 30 each | Primary students |
| **Class 3** | A, B | 30 each | Primary students |
| **Class 4** | A, B | 30 each | Upper primary students |
| **Class 5** | A, B | 30 each | Upper primary students |
| **Class 6** | A, B | 30 each | Secondary students |
| **Class 7** | A, B | 30 each | Secondary students |
| **Class 8** | A, B | 30 each | Secondary students |
| **Class 9** | A, B | 30 each | SSC students |
| **Class 10** | A, B | 30 each | SSC students |

**Total Students**: 600

#### 3. Attendance Records

| Type | Quantity | Description |
|------|----------|-------------|
| **Daily Attendance** | 600 students × 180 days | Full academic year |
| **Attendance Types** | Present, Absent, Late, Leave | Various scenarios |
| **Low Attendance** | 20 students | Below 75% threshold |

#### 4. Grade Records

| Term | Subjects | Students | Description |
|------|----------|----------|-------------|
| **Midterm** | 8 subjects | 600 students | Midterm exam grades |
| **Final** | 8 subjects | 600 students | Final exam grades |
| **Failed Students** | 10 students | Various subjects | For GPA testing |

**Subjects**: Mathematics, English, Bengali, Science, Social Studies, Islamic Studies, Arabic, ICT

#### 5. Payment Records

| Status | Quantity | Description |
|--------|----------|-------------|
| **Paid** | 500 | Successful payments |
| **Pending** | 50 | Pending payments |
| **Failed** | 20 | Failed payments |
| **Refunded** | 30 | Refunded payments |

**Payment Methods**: bKash, Nagad, SSLCommerz, Cash

#### 6. Communication Records

| Type | Quantity | Description |
|------|----------|-------------|
| **SMS Sent** | 1000 | Attendance and grade notifications |
| **Email Sent** | 500 | Grade reports and announcements |
| **Push Notifications** | 200 | General announcements |

#### 7. Islamic Education Records

| Type | Quantity | Description |
|------|----------|-------------|
| **Quran Progress** | 600 students | Various surahs and verses |
| **Tajweed Assessment** | 600 students | Various levels and scores |
| **Prayer Times** | Daily | For location testing |

### Test Data Generation Scripts

#### Student Data Generation

```typescript
// scripts/generate-student-data.ts
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10']
const sections = ['A', 'B']
const genders = ['Male', 'Female']

async function generateStudents() {
  for (const className of classes) {
    for (const section of sections) {
      for (let i = 1; i <= 30; i++) {
        const gender = faker.helpers.arrayElement(genders)
        const firstName = faker.person.firstName(gender === 'Male' ? 'male' : 'female')
        const lastName = faker.person.lastName()

        await prisma.student.create({
          data: {
            name: `${firstName} ${lastName}`,
            class: className,
            section: section,
            rollNumber: `${i.toString().padStart(2, '0')}`,
            gender: gender,
            dateOfBirth: faker.date.birthdate({ min: 6, max: 18, mode: 'age' }),
            bloodGroup: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            religion: 'Islam',
            fatherName: faker.person.fullName('male'),
            fatherPhone: faker.phone.number('+8801#########'),
            motherName: faker.person.fullName('female'),
            address: faker.location.streetAddress(),
            city: 'Lakshmipur',
            district: 'Lakshmipur',
            admissionDate: faker.date.past({ years: 1 }),
          },
        })
      }
    }
  }
}

generateStudents()
  .then(() => console.log('Students generated successfully'))
  .catch((error) => console.error(error))
  .finally(() => prisma.$disconnect())
```

#### User Account Generation

```typescript
// scripts/generate-user-accounts.ts
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function generateUsers() {
  // Admin users
  for (let i = 1; i <= 2; i++) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10)
    await prisma.user.create({
      data: {
        email: `admin${i}@smartacademy.edu`,
        passwordHash: hashedPassword,
        role: 'ADMIN',
        name: `Admin User ${i}`,
        phone: `+88017123456${i.toString().padStart(2, '0')}`,
      },
    })
  }

  // Teacher users
  for (let i = 1; i <= 5; i++) {
    const hashedPassword = await bcrypt.hash('Teacher@123', 10)
    await prisma.user.create({
      data: {
        email: `teacher${i}@smartacademy.edu`,
        passwordHash: hashedPassword,
        role: 'TEACHER',
        name: `Teacher User ${i}`,
        phone: `+88017123457${i.toString().padStart(2, '0')}`,
      },
    })
  }

  // Parent users
  for (let i = 1; i <= 20; i++) {
    const hashedPassword = await bcrypt.hash('Parent@123', 10)
    await prisma.user.create({
      data: {
        email: `parent${i}@smartacademy.edu`,
        passwordHash: hashedPassword,
        role: 'PARENT',
        name: `Parent User ${i}`,
        phone: `+88017123458${i.toString().padStart(2, '0')}`,
      },
    })
  }
}

generateUsers()
  .then(() => console.log('Users generated successfully'))
  .catch((error) => console.error(error))
  .finally(() => prisma.$disconnect())
```

---

## Document Control

### Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Smart Academy Development Team | Initial version |

### Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Lead | | | |
| Development Lead | | | |
| QA Lead | | | |

### References

- [Test Strategy Document](TEST_Strategy_v1.0.md)
- [Test Plan Document](TEST_Plan_v1.0.md)
- [Functional Requirements](../RFQ/REQ_Functional_Requirements_v1.0.md)
- [API Specification](../Api_Integration/API_Specification_v1.0.md)

---

**End of Test Cases Document**
