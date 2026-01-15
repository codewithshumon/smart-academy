# Smart Academy Digital Portal - Sprint/Iteration Planning Document

**Document Title:** Sprint/Iteration Planning Template
**Document ID:** PM_Sprint_Planning_Template_v1.0
**Version:** 1.0
**Date:** January 10, 2026
**Project Name:** Smart Academy Digital Web Portal Development
**Prepared By:** Solo Full-Stack Developer
**Development Environment:** Linux OS | VSCode IDE | Vite | HMR | Local Database

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | January 10, 2026 | Development Team | Initial Sprint Planning Template |

---

## Table of Contents

1. [Sprint Overview](#1-sprint-overview)
2. [Sprint Backlog Template](#2-sprint-backlog-template)
3. [User Story Format and Examples](#3-user-story-format-and-examples)
4. [Story Point Estimation Guidelines](#4-story-point-estimation-guidelines)
5. [Acceptance Criteria Template](#5-acceptance-criteria-template)
6. [Definition of Done (DoD)](#6-definition-of-done-dod)
7. [Sprint Velocity Tracking](#7-sprint-velocity-tracking)
8. [Burndown Chart Template](#8-burndown-chart-template)
9. [Sprint Ceremonies for Solo Developer](#9-sprint-ceremonies-for-solo-developer)
10. [Sprint Templates](#10-sprint-templates)

---

## 1. Sprint Overview

### 1.1 Sprint Configuration

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Sprint Duration** | 2 weeks | Optimal for solo developer rhythm |
| **Working Days** | 10 days | Standard work week |
| **Available Hours** | 64 hours | 8 hours/day × 8 productive days |
| **Planning Buffer** | 20% | Account for unexpected issues |
| **Net Capacity** | ~51 hours | Effective development time |

### 1.2 Sprint Calendar

| Day | Activity |
|-----|----------|
| Day 1 (Monday) | Sprint Planning (2 hrs), Development |
| Day 2-4 | Development |
| Day 5 (Friday) | Development, Mid-sprint review |
| Day 6-9 | Development |
| Day 10 (Friday) | Sprint Review, Retrospective, Documentation |

### 1.3 Sprint Naming Convention

```
Sprint-[Year]-[Number]: [Theme]

Example: Sprint-2026-05: Public Website Core
```

---

## 2. Sprint Backlog Template

### 2.1 Sprint Backlog Structure

```markdown
# Sprint Backlog - Sprint [Number]

## Sprint Information
- **Sprint Number:** [N]
- **Sprint Name:** [Theme/Focus]
- **Start Date:** [YYYY-MM-DD]
- **End Date:** [YYYY-MM-DD]
- **Sprint Goal:** [Clear, measurable goal]

## Sprint Metrics
- **Planned Story Points:** [X]
- **Capacity (Hours):** [X]
- **Velocity Target:** [X] (based on previous sprints)

## User Stories

### High Priority (Must Complete)

| ID | User Story | Points | Status | Notes |
|----|------------|--------|--------|-------|
| US-001 | As a [role], I want [feature] so that [benefit] | 5 | Todo | |
| US-002 | As a [role], I want [feature] so that [benefit] | 3 | In Progress | |

### Medium Priority (Should Complete)

| ID | User Story | Points | Status | Notes |
|----|------------|--------|--------|-------|
| US-003 | As a [role], I want [feature] so that [benefit] | 3 | Todo | |

### Low Priority (Nice to Have)

| ID | User Story | Points | Status | Notes |
|----|------------|--------|--------|-------|
| US-004 | As a [role], I want [feature] so that [benefit] | 2 | Todo | |

## Technical Tasks

| ID | Task | Story | Hours | Status |
|----|------|-------|-------|--------|
| TK-001 | [Task description] | US-001 | 4 | Todo |
| TK-002 | [Task description] | US-001 | 2 | Todo |

## Bugs/Defects

| ID | Bug Description | Severity | Status |
|----|-----------------|----------|--------|
| BG-001 | [Description] | High | Todo |

## Sprint Notes
[Any relevant notes or dependencies]
```

### 2.2 Example Sprint Backlog

```markdown
# Sprint Backlog - Sprint 7

## Sprint Information
- **Sprint Number:** 7
- **Sprint Name:** Islamic Module Part 1
- **Start Date:** 2026-03-16
- **End Date:** 2026-03-27
- **Sprint Goal:** Complete Quran memorization tracking with basic Tajweed assessment

## Sprint Metrics
- **Planned Story Points:** 21
- **Capacity (Hours):** 51
- **Velocity Target:** 18-22 (based on previous 3 sprints)

## User Stories

### High Priority (Must Complete)

| ID | User Story | Points | Status | Notes |
|----|------------|--------|--------|-------|
| US-071 | As a teacher, I want to record a student's Quran memorization progress so that I can track their Hifz journey | 5 | In Progress | Core feature |
| US-072 | As a parent, I want to view my child's Quran progress so that I can support their memorization at home | 3 | Todo | Depends on US-071 |
| US-073 | As a teacher, I want to conduct Tajweed assessments so that I can evaluate recitation quality | 5 | Todo | |

### Medium Priority (Should Complete)

| ID | User Story | Points | Status | Notes |
|----|------------|--------|--------|-------|
| US-074 | As a student, I want to see my memorization milestones so that I feel motivated | 3 | Todo | |
| US-075 | As an admin, I want to generate Hifz progress reports so that I can monitor overall Islamic education | 3 | Todo | |

### Low Priority (Nice to Have)

| ID | User Story | Points | Status | Notes |
|----|------------|--------|--------|-------|
| US-076 | As a student, I want to receive memorization badges so that I'm rewarded for progress | 2 | Todo | Gamification |

## Technical Tasks

| ID | Task | Story | Hours | Status |
|----|------|-------|-------|--------|
| TK-071 | Create QuranProgress database schema | US-071 | 3 | Done |
| TK-072 | Build Quran progress API endpoints | US-071 | 6 | In Progress |
| TK-073 | Create progress entry form component | US-071 | 4 | Todo |
| TK-074 | Build parent dashboard progress view | US-072 | 4 | Todo |
| TK-075 | Create Tajweed assessment schema | US-073 | 2 | Todo |
| TK-076 | Build Tajweed assessment UI | US-073 | 6 | Todo |

## Bugs/Defects

| ID | Bug Description | Severity | Status |
|----|-----------------|----------|--------|
| BG-015 | Login timeout not working correctly | Medium | Todo |
```

---

## 3. User Story Format and Examples

### 3.1 User Story Template

```markdown
# User Story: [ID]

## Title
[Short descriptive title]

## Story Statement
As a [role],
I want [feature/capability],
So that [benefit/value].

## Details
[Additional context or requirements]

## Acceptance Criteria
Given [context]
When [action]
Then [expected result]

## Technical Notes
- [Implementation considerations]
- [Dependencies]
- [API endpoints needed]

## Design Reference
- [Link to mockup/wireframe if available]

## Story Points: [X]
## Priority: [High/Medium/Low]
## Epic: [Parent epic name]
```

### 3.2 User Story Examples by Role

#### Student User Stories

```markdown
# US-101: Student Dashboard

## Story Statement
As a student,
I want to see my daily class schedule on my dashboard,
So that I can plan my day and never miss a class.

## Acceptance Criteria
Given I am a logged-in student
When I access my dashboard
Then I should see today's classes with times, subjects, and teachers

Given I am viewing my schedule
When I click on a class
Then I should see class details including room number and any notes

## Technical Notes
- Fetch from Gibbon timetable API
- Cache schedule for offline mobile access
- Support Bengali and English display

## Story Points: 3
## Priority: High
## Epic: Student Portal
```

```markdown
# US-102: Quran Progress Tracking

## Story Statement
As a student,
I want to view my Quran memorization progress,
So that I can see how far I've come in my Hifz journey.

## Acceptance Criteria
Given I am a logged-in student
When I access my Islamic progress page
Then I should see a visual representation of Surahs I've memorized

Given I am viewing my progress
When I tap on a Surah
Then I should see verse-by-verse completion status

Given I have memorized a complete Juz
When I view my progress
Then I should see a celebration badge for that Juz

## Technical Notes
- Use visual Quran map component
- Store progress in PostgreSQL Islamic module
- Support offline viewing

## Story Points: 5
## Priority: High
## Epic: Islamic Education Module
```

#### Parent User Stories

```markdown
# US-201: Child Academic Overview

## Story Statement
As a parent,
I want to see an overview of my child's academic performance,
So that I can monitor their progress and identify areas needing support.

## Acceptance Criteria
Given I am a logged-in parent
When I access my dashboard
Then I should see overall grades, attendance percentage, and recent activity

Given I am viewing the overview
When I click on "Grades"
Then I should see detailed subject-wise grades and trends

Given my child receives a new grade
When I open the app
Then I should see a notification about the new grade

## Technical Notes
- Aggregate data from Gibbon and Moodle
- Calculate grade trends over time
- Push notification on new grades

## Story Points: 5
## Priority: High
## Epic: Parent Portal
```

```markdown
# US-202: Fee Payment

## Story Statement
As a parent,
I want to pay my child's school fees online,
So that I don't have to visit the school for payment.

## Acceptance Criteria
Given I am a logged-in parent
When I access the fee section
Then I should see outstanding balance and fee breakdown

Given I have an outstanding balance
When I click "Pay Now"
Then I should be able to choose bKash, Nagad, or card payment

Given I complete a payment
When the transaction is successful
Then I should receive a digital receipt immediately

Given a payment fails
When I return to the app
Then I should see the failed transaction and retry option

## Technical Notes
- Integrate bKash, Nagad, SSLCommerz
- Generate PDF receipts
- Store transaction history

## Story Points: 8
## Priority: Critical
## Epic: Payment System
```

#### Teacher User Stories

```markdown
# US-301: Attendance Marking

## Story Statement
As a teacher,
I want to quickly mark attendance for my class,
So that I can complete administrative tasks efficiently and return to teaching.

## Acceptance Criteria
Given I am a logged-in teacher
When I access my current class
Then I should see a student list with quick attendance buttons

Given I am marking attendance
When I tap a student's status
Then I should be able to mark Present, Absent, Late, or Excused

Given I complete attendance
When I submit
Then parents should receive automatic absence notifications

## Technical Notes
- Use Gibbon attendance API
- Implement bulk marking for efficiency
- Send notifications via SMS/push

## Story Points: 3
## Priority: High
## Epic: Teacher Portal
```

```markdown
# US-302: Grade Entry

## Story Statement
As a teacher,
I want to enter grades for assessments,
So that students and parents can see academic progress.

## Acceptance Criteria
Given I am a logged-in teacher
When I access my gradebook
Then I should see all my classes with grade columns for assessments

Given I am entering grades
When I click a cell
Then I should be able to enter a grade with optional comments

Given I save grades
When parents/students view progress
Then they should see updated grades within 5 minutes

## Technical Notes
- Sync with Gibbon markbook
- Support percentage and letter grades
- Optional rubric-based grading

## Story Points: 5
## Priority: High
## Epic: Teacher Portal
```

#### Admin User Stories

```markdown
# US-401: Analytics Dashboard

## Story Statement
As an administrator,
I want to see key school metrics at a glance,
So that I can make informed decisions about school operations.

## Acceptance Criteria
Given I am a logged-in admin
When I access the dashboard
Then I should see KPIs: enrollment, attendance %, fee collection, etc.

Given I am viewing a metric
When I click on it
Then I should see detailed breakdown and trends

Given I need a custom view
When I configure dashboard widgets
Then my preferences should be saved

## Technical Notes
- Aggregate from Gibbon, Moodle, custom modules
- Real-time or near-real-time data
- Export to PDF/Excel

## Story Points: 8
## Priority: High
## Epic: Admin Dashboard
```

---

## 4. Story Point Estimation Guidelines

### 4.1 Fibonacci Scale

| Points | Effort Level | Description | Example |
|--------|--------------|-------------|---------|
| 1 | Trivial | Simple change, < 2 hours | Fix typo, update text |
| 2 | Small | Straightforward, 2-4 hours | Add form field, simple component |
| 3 | Medium-Small | Standard task, 4-8 hours | New API endpoint, simple feature |
| 5 | Medium | Moderate complexity, 1-2 days | Complete form with validation |
| 8 | Large | Complex feature, 2-3 days | Integration with external service |
| 13 | Very Large | Major feature, 3-5 days | Complete module |
| 21 | Epic | Should be broken down | Full subsystem |

### 4.2 Estimation Factors

When estimating, consider:

| Factor | Low Complexity | High Complexity |
|--------|---------------|-----------------|
| **Known vs Unknown** | Done before | First time |
| **Dependencies** | None | Multiple external |
| **Testing** | Straightforward | Complex scenarios |
| **UI Complexity** | Simple form | Rich interactive |
| **Data Model** | Simple CRUD | Complex relations |
| **Integration** | Internal only | External APIs |

### 4.3 Reference Stories

Use these as baselines for estimation:

| Reference Story | Points | Why |
|-----------------|--------|-----|
| Add a new text field to existing form | 1 | Simple UI change, minimal testing |
| Create CRUD API for single entity | 3 | Standard pattern, moderate testing |
| Implement login with JWT | 5 | Security considerations, multiple endpoints |
| Integrate bKash payment | 8 | External API, error handling, testing |
| Build complete admin dashboard widget | 5 | UI + API + data aggregation |
| Create Islamic progress tracking module | 13 | Multiple components, complex UI |

### 4.4 Solo Developer Adjustments

As a solo developer:

- **Add 20% buffer** for self-review time
- **Add 10%** for documentation
- **Consider context switching** if multiple priorities
- **Account for learning curve** on new technologies

**Velocity Calculation:**

```
Typical Solo Developer Velocity = 18-25 story points per 2-week sprint

Calculation:
- Available hours: 64 (8 hours × 8 days)
- Productive hours: 51 (80% efficiency)
- Average hours per point: 2-3 hours
- Velocity range: 51/3 to 51/2 = 17-25 points
```

---

## 5. Acceptance Criteria Template

### 5.1 Given-When-Then Format

```markdown
## Acceptance Criteria for [User Story ID]

### Scenario 1: [Scenario Name]
**Given** [initial context/state]
**When** [action is taken]
**Then** [expected outcome]

### Scenario 2: [Scenario Name]
**Given** [initial context/state]
**When** [action is taken]
**Then** [expected outcome]

### Edge Cases
- [Edge case 1 and expected behavior]
- [Edge case 2 and expected behavior]

### Non-Functional Requirements
- Performance: [requirement]
- Accessibility: [requirement]
- Security: [requirement]
```

### 5.2 Example: Fee Payment Acceptance Criteria

```markdown
## Acceptance Criteria for US-202: Fee Payment

### Scenario 1: View Outstanding Balance
**Given** I am logged in as a parent with outstanding fees
**When** I navigate to the Fees section
**Then** I should see:
  - Total outstanding amount in BDT
  - Breakdown by fee type (tuition, transport, etc.)
  - Due date for each fee
  - Payment history link

### Scenario 2: Successful bKash Payment
**Given** I have an outstanding balance
**And** I have selected bKash as payment method
**When** I complete the bKash authentication and confirm payment
**Then**:
  - Payment should be processed
  - I should receive a success confirmation
  - A PDF receipt should be generated
  - My balance should update immediately
  - I should receive SMS confirmation

### Scenario 3: Failed Payment
**Given** I am making a payment
**When** the payment fails (network error, insufficient balance, etc.)
**Then**:
  - I should see a clear error message
  - The transaction should be logged as "Failed"
  - I should be able to retry
  - No amount should be deducted from my account

### Scenario 4: Partial Payment
**Given** I have a large outstanding balance
**When** I choose to make a partial payment
**Then**:
  - I should be able to enter a custom amount
  - Minimum payment amount should be enforced (500 BDT)
  - Remaining balance should be clearly shown

### Edge Cases
- If internet disconnects mid-payment: Transaction should timeout and show retry option
- If same payment attempted twice: Prevent duplicate payments
- If viewing during payment gateway maintenance: Show appropriate message

### Non-Functional Requirements
- **Performance:** Payment page loads within 3 seconds
- **Accessibility:** Screen reader compatible, keyboard navigable
- **Security:** PCI-DSS compliant, no card data stored locally
- **Language:** Available in English and Bengali
```

### 5.3 Checklist Format (Alternative)

```markdown
## Acceptance Criteria Checklist for [Story ID]

### Functional Requirements
- [ ] User can [action 1]
- [ ] System displays [information]
- [ ] User receives [notification/feedback]
- [ ] Data is saved to [location]

### Validation Rules
- [ ] [Field] must be [constraint]
- [ ] [Field] cannot be [constraint]
- [ ] [Action] requires [permission/role]

### Error Handling
- [ ] If [error condition], show [message]
- [ ] If [network failure], [behavior]

### Integration
- [ ] Syncs with [system]
- [ ] Updates [external service]

### UI/UX
- [ ] Mobile responsive
- [ ] Bengali language support
- [ ] Loading states shown
- [ ] Success/error feedback clear
```

---

## 6. Definition of Done (DoD)

### 6.1 Development DoD Checklist

A user story is **DONE** when all applicable items are checked:

```markdown
## Definition of Done Checklist

### Code Quality
- [ ] Code compiles without errors
- [ ] Code follows project coding standards
- [ ] Code passes ESLint/Prettier checks
- [ ] No console.log statements in production code
- [ ] No TODO comments without linked issues
- [ ] Complex logic is commented

### Testing
- [ ] Unit tests written (80%+ coverage for new code)
- [ ] Unit tests pass
- [ ] Integration tests written (where applicable)
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Edge cases tested

### Security
- [ ] No sensitive data exposed
- [ ] Input validation implemented
- [ ] Authentication/authorization verified
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast verified (WCAG AA)
- [ ] Focus states visible
- [ ] Alt text for images

### Localization
- [ ] English text complete
- [ ] Bengali translations added
- [ ] RTL support for Arabic content (if applicable)
- [ ] Date/number formats localized

### Documentation
- [ ] Code documentation updated
- [ ] API documentation updated (if API changed)
- [ ] README updated (if setup changed)
- [ ] User-facing help text added

### Review
- [ ] Self-review completed (checklist below)
- [ ] Code committed with meaningful message
- [ ] PR created (if applicable)
- [ ] All automated checks pass

### Deployment
- [ ] Feature works in staging environment
- [ ] No regressions in existing features
- [ ] Database migrations work
- [ ] Environment variables documented
```

### 6.2 Self-Review Checklist

Before marking a story as Done, complete this self-review:

```markdown
## Self-Review Checklist

### Code Review Questions
1. [ ] Would I understand this code in 6 months?
2. [ ] Are function/variable names descriptive?
3. [ ] Is there any duplicated code?
4. [ ] Are there any magic numbers/strings?
5. [ ] Is error handling comprehensive?
6. [ ] Are types properly defined (TypeScript)?

### Architecture Questions
1. [ ] Does this follow the project's architecture patterns?
2. [ ] Is the component/module single-responsibility?
3. [ ] Are dependencies properly injected?
4. [ ] Is state managed appropriately?

### Performance Questions
1. [ ] Are there any unnecessary re-renders?
2. [ ] Are API calls optimized (caching, batching)?
3. [ ] Are images optimized?
4. [ ] Is code splitting used where appropriate?

### Security Questions
1. [ ] Is user input sanitized?
2. [ ] Are API endpoints protected?
3. [ ] Is sensitive data encrypted?
4. [ ] Are CORS settings correct?
```

### 6.3 Feature DoD (Epic Level)

For complete features/epics:

```markdown
## Feature Definition of Done

### Functionality
- [ ] All user stories in the feature are Done
- [ ] Feature works end-to-end
- [ ] Feature works on all target devices
- [ ] Feature works on all target browsers

### Quality
- [ ] No open critical/high bugs
- [ ] Performance meets requirements
- [ ] Security review completed
- [ ] Accessibility audit passed

### Documentation
- [ ] User documentation complete
- [ ] Training materials created
- [ ] API documentation complete
- [ ] Architecture documentation updated

### Stakeholder
- [ ] Demo to stakeholders completed
- [ ] Stakeholder acceptance obtained
- [ ] Feedback incorporated
```

---

## 7. Sprint Velocity Tracking

### 7.1 Velocity Tracking Template

```markdown
# Velocity Tracking - Smart Academy Portal

## Sprint Velocity History

| Sprint | Planned | Completed | Velocity | Trend |
|--------|---------|-----------|----------|-------|
| Sprint 1 | 18 | 15 | 15 | - |
| Sprint 2 | 18 | 18 | 18 | ↑ |
| Sprint 3 | 20 | 17 | 17 | ↓ |
| Sprint 4 | 18 | 20 | 20 | ↑ |
| Sprint 5 | 20 | 19 | 19 | ↓ |
| Sprint 6 | 21 | 21 | 21 | ↑ |

## Rolling Average Velocity

- **Last 3 Sprints:** (20 + 19 + 21) / 3 = **20 points**
- **Last 5 Sprints:** (17 + 20 + 19 + 21 + ...) / 5 = **19 points**
- **All Time Average:** **18.3 points**

## Velocity Chart

```
Points
  25 |
  20 |          *       *   *
  15 |  *   *       *
  10 |
   5 |
   0 +---------------------------
      S1  S2  S3  S4  S5  S6
```

## Planning Recommendations

Based on velocity history:
- **Conservative planning:** 17-18 points
- **Normal planning:** 19-20 points
- **Stretch goal:** 21-22 points

## Velocity Influencing Factors

| Sprint | Notes on Velocity |
|--------|-------------------|
| Sprint 1 | Initial sprint, learning curve |
| Sprint 3 | Holiday week, reduced capacity |
| Sprint 4 | Familiar technology, smooth progress |
| Sprint 6 | Well-defined stories, good estimates |
```

### 7.2 Velocity Calculation

```
Sprint Velocity = Sum of Story Points for COMPLETED stories

Note: Only count stories that meet Definition of Done.
Do not count:
- Stories still in progress
- Stories partially completed
- Stories moved to next sprint
```

### 7.3 Capacity vs Velocity

```markdown
## Capacity Tracking

### Sprint [N] Capacity

| Factor | Planned | Actual |
|--------|---------|--------|
| Working Days | 10 | 10 |
| Hours per Day | 6 | 5.5 |
| Total Hours | 60 | 55 |
| Time Off | 0 | 4 hrs |
| Meetings | 6 hrs | 8 hrs |
| Net Capacity | 54 hrs | 43 hrs |

### Capacity to Velocity Ratio
- Historical: ~2.5 hours per story point
- This Sprint: 43 hrs / 17 SP = 2.5 hrs/SP

### Capacity Adjustment for Next Sprint
If planned time off: Reduce planned velocity by proportional amount
```

---

## 8. Burndown Chart Template

### 8.1 Sprint Burndown Template

```markdown
# Sprint [N] Burndown Chart

## Sprint Data

| Day | Date | Ideal Remaining | Actual Remaining | Daily Completed |
|-----|------|-----------------|------------------|-----------------|
| 0 | Mar 16 | 21 | 21 | 0 |
| 1 | Mar 17 | 18.9 | 21 | 0 |
| 2 | Mar 18 | 16.8 | 18 | 3 |
| 3 | Mar 19 | 14.7 | 15 | 3 |
| 4 | Mar 20 | 12.6 | 13 | 2 |
| 5 | Mar 23 | 10.5 | 10 | 3 |
| 6 | Mar 24 | 8.4 | 8 | 2 |
| 7 | Mar 25 | 6.3 | 5 | 3 |
| 8 | Mar 26 | 4.2 | 3 | 2 |
| 9 | Mar 27 | 2.1 | 0 | 3 |
| 10 | Mar 28 | 0 | 0 | 0 |

## Burndown Chart (ASCII)

```
Story Points Remaining
21 |*
   | \*
18 |  \  *
   |   \   *
15 |    \    *
   |     \
12 |      \    *
   |       \     *
 9 |        \
   |         \   *
 6 |          \    *
   |           \
 3 |            \    *
   |             \     *
 0 +----*----*----*----*----*----*----*----*----*----*
   D0   D1   D2   D3   D4   D5   D6   D7   D8   D9  D10

Legend:
\ = Ideal burndown line
* = Actual remaining
```

## Analysis

### Sprint Health Indicators

| Indicator | Status | Notes |
|-----------|--------|-------|
| On Track | ✅ | Actual below ideal line |
| Scope Creep | ⚠️ | Added 2 points mid-sprint |
| Blockers | ✅ | None currently |

### Daily Standup Notes

| Day | Progress | Blockers | Plan |
|-----|----------|----------|------|
| D2 | Completed US-071 | None | Start US-072 |
| D5 | Completed US-072, US-073 | API delay | Work on UI |
```

### 8.2 Release Burndown

```markdown
# Release Burndown - Phase 3 (Core Development)

## Release Scope: 84 Story Points
## Duration: Sprints 4-9 (12 weeks)

| Sprint | Starting Scope | Completed | Ending Scope | Added |
|--------|---------------|-----------|--------------|-------|
| Sprint 4 | 84 | 18 | 66 | 0 |
| Sprint 5 | 66 | 19 | 47 | 0 |
| Sprint 6 | 47 | 21 | 26 | 0 |
| Sprint 7 | 26 | 20 | 6 | 0 |
| Sprint 8 | 6 | 6 | 0 | 0 |

## Release Burndown Chart

```
Story Points
84 |*
70 |  \*
   |    \
56 |      \*
   |        \
42 |          \*
   |            \
28 |              \*
   |                \
14 |                  \*
   |                    \
 0 +----+----+----+----+----+----*
   S4   S5   S6   S7   S8   S9

Projected completion: Sprint 8 ✅
```
```

---

## 9. Sprint Ceremonies for Solo Developer

### 9.1 Adapted Scrum Ceremonies

As a solo developer, traditional Scrum ceremonies are adapted:

| Ceremony | Traditional | Solo Adaptation | Duration |
|----------|-------------|-----------------|----------|
| Sprint Planning | Team meeting | Self-planning session | 2 hours |
| Daily Standup | Team sync | Personal journal/log | 10 min |
| Sprint Review | Stakeholder demo | Record demo + notes | 1 hour |
| Retrospective | Team reflection | Written reflection | 30 min |
| Backlog Grooming | Team refinement | Story detailing | 1 hour/week |

### 9.2 Sprint Planning (Solo)

```markdown
# Sprint Planning Session - Sprint [N]

**Date:** [Date]
**Duration:** 2 hours

## Agenda

### Part 1: Review (30 min)
- [ ] Review previous sprint results
- [ ] Check velocity trend
- [ ] Note lessons learned

### Part 2: Goal Setting (15 min)
- [ ] Define sprint goal
- [ ] Identify key deliverables
- [ ] Set success criteria

### Part 3: Story Selection (45 min)
- [ ] Review product backlog
- [ ] Select stories based on:
  - Priority from stakeholders
  - Technical dependencies
  - Capacity available
- [ ] Verify stories are ready (DoR)

### Part 4: Task Breakdown (30 min)
- [ ] Break stories into tasks
- [ ] Estimate task hours
- [ ] Identify risks/blockers

## Outputs
- [ ] Sprint backlog document created
- [ ] Sprint board set up (GitHub Projects/Trello)
- [ ] Calendar blocked for focused work
```

### 9.3 Daily Log (Solo Standup)

```markdown
# Daily Development Log

## Date: [YYYY-MM-DD]
## Sprint: [N] - Day [X]/10

### Yesterday
- Completed: [Tasks/stories]
- Committed: [Commit references]

### Today
- Planning to work on: [Tasks]
- Focus time blocked: [Hours]

### Blockers
- [Any blockers or concerns]

### Notes
- [Observations, decisions, ideas]

### Metrics
- Hours worked: [X]
- Story points completed: [X]
- Mood/energy: [1-5]
```

### 9.4 Sprint Review (Solo)

```markdown
# Sprint Review - Sprint [N]

**Date:** [Date]
**Sprint Goal:** [Goal]
**Goal Met:** [Yes/No/Partial]

## Completed Work

### User Stories Completed
| ID | Story | Points | Demo Notes |
|----|-------|--------|------------|
| US-001 | [Title] | 5 | [What to show] |

### Technical Accomplishments
- [Achievement 1]
- [Achievement 2]

## Demo Recording
- [ ] Record demo video (Loom/OBS)
- [ ] Share with stakeholders
- [ ] Collect feedback

## Incomplete Work

| ID | Story | Reason | Next Sprint |
|----|-------|--------|-------------|
| US-002 | [Title] | [Why incomplete] | [Yes/No] |

## Stakeholder Feedback
- [Feedback from principal]
- [Feedback from admin staff]

## Metrics

| Metric | Planned | Actual |
|--------|---------|--------|
| Story Points | 21 | 19 |
| Bugs Fixed | 3 | 4 |
| Technical Debt | 2 | 1 |
```

### 9.5 Sprint Retrospective (Solo)

```markdown
# Sprint Retrospective - Sprint [N]

**Date:** [Date]
**Sprint:** [N]
**Velocity:** [X] points

## What Went Well 🎉
1. [Positive observation]
2. [Positive observation]
3. [Positive observation]

## What Could Be Improved 🔧
1. [Area for improvement]
2. [Area for improvement]
3. [Area for improvement]

## Action Items for Next Sprint
| Action | Priority | Target |
|--------|----------|--------|
| [Action 1] | High | Sprint N+1 |
| [Action 2] | Medium | Sprint N+1 |

## Experiment to Try
- [New technique or tool to experiment with]

## Personal Wellness Check
- Energy level: [1-5]
- Work-life balance: [1-5]
- Technical satisfaction: [1-5]
- Progress satisfaction: [1-5]

## Notes
[Any other reflections]
```

---

## 10. Sprint Templates

### 10.1 Sprint Creation Checklist

```markdown
# New Sprint Setup Checklist

## Pre-Sprint (Day before)
- [ ] Complete previous sprint review and retro
- [ ] Review and update product backlog
- [ ] Confirm stakeholder priorities
- [ ] Check for external dependencies

## Sprint Start (Day 1)
- [ ] Create sprint backlog document
- [ ] Set up sprint in project management tool
- [ ] Define sprint goal
- [ ] Break down stories into tasks
- [ ] Commit to sprint scope
- [ ] Block focus time in calendar

## During Sprint
- [ ] Daily log updates
- [ ] Regular commits
- [ ] Update story status
- [ ] Track blockers immediately

## Sprint End (Day 10)
- [ ] Complete all testing
- [ ] Update documentation
- [ ] Prepare demo
- [ ] Conduct review and retro
- [ ] Archive sprint artifacts
```

### 10.2 GitHub Project Board Columns

```
| Backlog | Ready | In Progress | Review | Done |
|---------|-------|-------------|--------|------|
```

**Column Definitions:**

- **Backlog:** Stories not yet ready for sprint
- **Ready:** Stories ready for development (meet DoR)
- **In Progress:** Currently being worked on
- **Review:** Code complete, in self-review/testing
- **Done:** Meets Definition of Done

### 10.3 Sprint Report Template

```markdown
# Sprint [N] Report

## Executive Summary
[2-3 sentence summary for stakeholders]

## Sprint Metrics

| Metric | Value |
|--------|-------|
| Duration | [Dates] |
| Planned Points | [X] |
| Completed Points | [X] |
| Velocity | [X] |
| Completion Rate | [X%] |
| Bugs Found | [X] |
| Bugs Fixed | [X] |

## Highlights
- [Major accomplishment 1]
- [Major accomplishment 2]

## Challenges
- [Challenge 1 and how addressed]

## Next Sprint Preview
- [Focus area for next sprint]

## Attachments
- [ ] Demo video link
- [ ] Burndown chart
- [ ] Screenshots of new features
```

---

## Appendix A: Definition of Ready (DoR)

A story is **Ready** for sprint when:

- [ ] User story follows standard format
- [ ] Acceptance criteria are defined
- [ ] Story is estimated in points
- [ ] Dependencies are identified
- [ ] Design/mockup available (if UI story)
- [ ] Technical approach is understood
- [ ] Story fits within one sprint

---

## Appendix B: Story Status Definitions

| Status | Definition |
|--------|------------|
| **Draft** | Story needs more detail |
| **Ready** | Meets DoR, ready for sprint |
| **In Progress** | Developer actively working |
| **Review** | Self-review in progress |
| **Testing** | Being tested |
| **Done** | Meets DoD |
| **Blocked** | Cannot proceed, blocker documented |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | _________________ | ________ |
| Principal | | _________________ | ________ |

---

**Document Version:** 1.0
**Last Updated:** January 10, 2026
**Status:** Approved for Use
**Next Review:** After Sprint 5

---

*This Sprint Planning Template provides the framework for managing development iterations on the Smart Academy Digital Portal project. Templates should be copied and customized for each sprint.*
