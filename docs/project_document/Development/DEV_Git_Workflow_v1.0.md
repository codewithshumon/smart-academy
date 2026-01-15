# Git Workflow Document

## Document Information
| Field | Value |
|-------|-------|
| **Document ID** | DEV-GIT-001 |
| **Version** | 1.0 |
| **Last Updated** | 2026-01-10 |
| **Author** | Smart Academy Development Team |
| **Status** | Active |

---

## Table of Contents
1. [Overview](#1-overview)
2. [Branching Strategy](#2-branching-strategy)
3. [Branch Naming Conventions](#3-branch-naming-conventions)
4. [Commit Message Format](#4-commit-message-format)
5. [Pull Request Template](#5-pull-request-template)
6. [Merge Strategy](#6-merge-strategy)
7. [Tag and Release Conventions](#7-tag-and-release-conventions)
8. [.gitignore Configuration](#8-gitignore-configuration)
9. [Git Hooks](#9-git-hooks)
10. [Best Practices](#10-best-practices)

---

## 1. Overview

### 1.1 Purpose
This document establishes the Git workflow standards for the Smart Academy Digital Portal project. These conventions ensure consistent version control practices, clear commit history, and streamlined collaboration.

### 1.2 Workflow Type
The Smart Academy project uses a **Simplified GitHub Flow** optimized for solo development with the flexibility to scale for team collaboration.

### 1.3 Workflow Diagram
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SMART ACADEMY GIT WORKFLOW                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  main (production-ready)                                                     │
│  ═══════════════════════════════════════════════════════════════════════    │
│        │                    ▲                    ▲                   ▲       │
│        │                    │ merge              │ merge             │       │
│        │                    │                    │                   │       │
│        ▼                    │                    │                   │       │
│  develop (integration)      │                    │                   │       │
│  ────────●──────────────────●────────────────────●───────────────────●──    │
│          │        ▲         │         ▲         │        ▲          │       │
│          │        │ merge   │         │ merge   │        │ merge    │       │
│          ▼        │         │         │         │        │          │       │
│  feature/user-auth ─────────┘         │         │        │          │       │
│  ────────●─────●──────               │         │        │          │       │
│                                       │         │        │          │       │
│  feature/payment-integration ─────────┘         │        │          │       │
│  ────────●─────●─────●──────                   │        │          │       │
│                                                 │        │          │       │
│  fix/login-redirect ────────────────────────────┘        │          │       │
│  ────────●──────                                         │          │       │
│                                                          │          │       │
│  hotfix/security-patch (from main) ──────────────────────┘          │       │
│  ────────●──────                                                    │       │
│                                                                      │       │
│  release/v1.0.0 ────────────────────────────────────────────────────┘       │
│  ────────●─────●──────                                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

Legend:
  ═══  Protected branch (main)
  ───  Regular branch
  ●    Commit
  ▲    Merge point
```

---

## 2. Branching Strategy

### 2.1 Branch Types

| Branch Type | Purpose | Base Branch | Merge Target | Lifespan |
|-------------|---------|-------------|--------------|----------|
| `main` | Production-ready code | - | - | Permanent |
| `develop` | Integration branch | `main` | `main` | Permanent |
| `feature/*` | New features | `develop` | `develop` | Short-lived |
| `fix/*` | Bug fixes | `develop` | `develop` | Short-lived |
| `hotfix/*` | Critical production fixes | `main` | `main` + `develop` | Short-lived |
| `release/*` | Release preparation | `develop` | `main` + `develop` | Short-lived |
| `refactor/*` | Code improvements | `develop` | `develop` | Short-lived |
| `docs/*` | Documentation updates | `develop` | `develop` | Short-lived |
| `test/*` | Test additions/fixes | `develop` | `develop` | Short-lived |
| `chore/*` | Maintenance tasks | `develop` | `develop` | Short-lived |

### 2.2 Branch Rules

#### Main Branch (`main`)
```
Protection Rules:
├── Require pull request before merging
├── Require status checks to pass
│   ├── CI build must pass
│   ├── All tests must pass
│   └── Linting must pass
├── Require conversation resolution
├── No force pushes allowed
└── No deletions allowed

Contains:
├── Only production-ready code
├── Always deployable state
└── Tagged releases
```

#### Develop Branch (`develop`)
```
Protection Rules:
├── Require status checks to pass
├── Allow force pushes (with caution)
└── No deletions allowed

Contains:
├── Latest development code
├── Integration of all features
└── Next release candidate
```

### 2.3 Branch Lifecycle

#### Feature Branch Lifecycle
```bash
# 1. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/SA-123-user-authentication

# 2. Work on the feature
git add .
git commit -m "feat(auth): add login form component"
git commit -m "feat(auth): implement JWT token handling"

# 3. Keep branch updated with develop
git fetch origin develop
git rebase origin/develop
# OR
git merge origin/develop

# 4. Push and create PR
git push -u origin feature/SA-123-user-authentication
# Create PR via GitHub/GitLab UI

# 5. After PR approval and merge
git checkout develop
git pull origin develop
git branch -d feature/SA-123-user-authentication
```

#### Hotfix Branch Lifecycle
```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. Apply fix
git add .
git commit -m "fix(security): patch XSS vulnerability in comments"

# 3. Merge to main
git checkout main
git merge hotfix/critical-security-fix
git tag -a v1.0.1 -m "Security patch release"
git push origin main --tags

# 4. Merge back to develop
git checkout develop
git merge hotfix/critical-security-fix
git push origin develop

# 5. Cleanup
git branch -d hotfix/critical-security-fix
```

---

## 3. Branch Naming Conventions

### 3.1 Format
```
<type>/<ticket-id>-<short-description>
```

### 3.2 Components

| Component | Required | Format | Example |
|-----------|----------|--------|---------|
| Type | Yes | lowercase | `feature`, `fix`, `hotfix` |
| Ticket ID | Recommended | uppercase | `SA-123`, `BUG-456` |
| Description | Yes | kebab-case | `user-authentication` |

### 3.3 Branch Name Examples

| Type | Example Branch Name |
|------|---------------------|
| Feature | `feature/SA-101-user-authentication` |
| Feature (no ticket) | `feature/payment-gateway-integration` |
| Bug Fix | `fix/SA-202-login-redirect-loop` |
| Hotfix | `hotfix/SA-303-security-vulnerability` |
| Release | `release/v1.2.0` |
| Refactor | `refactor/auth-module-cleanup` |
| Documentation | `docs/api-documentation` |
| Test | `test/integration-test-coverage` |
| Chore | `chore/dependency-updates` |

### 3.4 Branch Naming Rules
```
DO:
✓ Use lowercase letters
✓ Use hyphens to separate words
✓ Keep descriptions short (2-4 words)
✓ Include ticket ID when available
✓ Be descriptive but concise

DON'T:
✗ Use spaces or special characters
✗ Use camelCase or PascalCase
✗ Create deeply nested branches (feature/auth/login/form)
✗ Use vague names (feature/update, fix/bug)
✗ Exceed 50 characters total
```

---

## 4. Commit Message Format

### 4.1 Conventional Commits Standard
```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### 4.2 Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(auth): add OAuth2 login` |
| `fix` | Bug fix | `fix(api): resolve null pointer exception` |
| `docs` | Documentation changes | `docs(readme): update installation guide` |
| `style` | Code style changes (formatting) | `style(lint): fix eslint warnings` |
| `refactor` | Code refactoring | `refactor(utils): simplify date helpers` |
| `test` | Adding/updating tests | `test(auth): add unit tests for login` |
| `chore` | Maintenance tasks | `chore(deps): update dependencies` |
| `perf` | Performance improvements | `perf(query): optimize database queries` |
| `ci` | CI/CD changes | `ci(github): add test workflow` |
| `build` | Build system changes | `build(vite): update vite config` |
| `revert` | Revert previous commit | `revert: feat(auth): add OAuth2 login` |

### 4.3 Scopes (Project-Specific)

| Scope | Description |
|-------|-------------|
| `auth` | Authentication & authorization |
| `api` | Backend API |
| `web` | Next.js frontend |
| `admin` | Admin dashboard |
| `mobile` | React Native app |
| `db` | Database & Prisma |
| `ui` | UI components |
| `payment` | Payment integration |
| `sms` | SMS notifications |
| `email` | Email notifications |
| `gibbon` | Gibbon SIS integration |
| `moodle` | Moodle LMS integration |
| `config` | Configuration files |
| `deps` | Dependencies |
| `lint` | Linting configuration |
| `test` | Testing infrastructure |
| `ci` | CI/CD configuration |

### 4.4 Commit Message Examples

#### Simple Commit
```
feat(auth): add password reset functionality
```

#### Commit with Body
```
feat(payment): integrate bKash payment gateway

- Add bKash API client
- Implement payment initiation flow
- Add payment verification endpoint
- Create payment status webhook handler

Refs: SA-156
```

#### Breaking Change Commit
```
feat(api)!: change authentication response format

BREAKING CHANGE: The /auth/login endpoint now returns
accessToken and refreshToken in separate fields instead
of a combined token object.

Before: { token: { access, refresh } }
After: { accessToken, refreshToken }

Migration: Update all clients to use new response format.
```

#### Bug Fix Commit
```
fix(web): resolve infinite redirect on expired session

The session check was triggering before hydration completed,
causing the router to redirect before the auth state was
properly initialized.

Added a loading state check to prevent premature redirects.

Closes: SA-234
```

### 4.5 Commit Message Rules
```
Subject Line Rules:
─────────────────────
✓ Use imperative mood ("add" not "added" or "adds")
✓ Don't capitalize first letter after colon
✓ No period at the end
✓ Maximum 72 characters
✓ Separate subject from body with blank line

Body Rules:
───────────
✓ Wrap at 72 characters
✓ Explain what and why, not how
✓ Use bullet points for multiple items
✓ Reference issues/tickets when applicable

Footer Rules:
─────────────
✓ Reference related issues: "Refs: SA-123"
✓ Close issues: "Closes: SA-123"
✓ Breaking changes: "BREAKING CHANGE: <description>"
```

### 4.6 Commit Message Template
```bash
# Create commit message template
cat << 'EOF' > ~/.gitmessage


# <type>(<scope>): <subject>
#
# [optional body]
#
# [optional footer(s)]
#
# Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert
# Scopes: auth, api, web, admin, mobile, db, ui, payment, sms, email, config, deps
#
# Rules:
# - Subject line max 72 chars
# - Use imperative mood ("add" not "added")
# - Don't end subject with period
# - Separate subject from body with blank line
# - Body: explain what and why, not how
#
# Examples:
# feat(auth): add OAuth2 login with Google
# fix(api): resolve race condition in session handling
# docs(readme): update installation instructions
EOF

# Configure Git to use template
git config --global commit.template ~/.gitmessage
```

---

## 5. Pull Request Template

### 5.1 PR Template File
```markdown
<!-- .github/pull_request_template.md -->

## Description
<!-- Provide a brief description of the changes -->


## Type of Change
<!-- Mark with an `x` all that apply -->
- [ ] 🆕 New feature (non-breaking change that adds functionality)
- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 📝 Documentation update
- [ ] ♻️ Refactoring (no functional changes)
- [ ] 🧪 Test update
- [ ] 🔧 Configuration change
- [ ] 🎨 Style/UI change

## Related Issues
<!-- Link any related issues using "Closes #123" or "Refs #123" -->
Closes #

## Changes Made
<!-- List the main changes in this PR -->
-
-
-

## Screenshots/Recordings
<!-- If applicable, add screenshots or recordings to help explain your changes -->


## Testing
<!-- Describe the tests you ran and how to reproduce -->
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

### Test Instructions
<!-- Provide step-by-step instructions to test this PR -->
1.
2.
3.

## Checklist
<!-- Mark with an `x` all that apply -->
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged and published

## Additional Notes
<!-- Add any additional context or notes for reviewers -->

```

### 5.2 PR Title Format
```
<type>(<scope>): <description>

Examples:
feat(auth): implement password reset flow
fix(api): resolve race condition in session handling
docs(readme): update installation instructions
refactor(utils): simplify date formatting helpers
```

### 5.3 PR Labels

| Label | Color | Description |
|-------|-------|-------------|
| `feature` | `#0E8A16` | New feature |
| `bug` | `#D73A4A` | Bug fix |
| `enhancement` | `#A2EEEF` | Improvement to existing feature |
| `documentation` | `#0075CA` | Documentation only |
| `breaking` | `#FF0000` | Breaking change |
| `priority:high` | `#B60205` | High priority |
| `priority:medium` | `#FBCA04` | Medium priority |
| `priority:low` | `#0E8A16` | Low priority |
| `wip` | `#E4E669` | Work in progress |
| `needs-review` | `#5319E7` | Ready for review |
| `blocked` | `#D93F0B` | Blocked by something |

---

## 6. Merge Strategy

### 6.1 Merge Methods

| Method | When to Use | Result |
|--------|-------------|--------|
| **Squash and Merge** | Feature branches → develop | Single clean commit |
| **Rebase and Merge** | Clean linear history needed | Flat history |
| **Create Merge Commit** | Release/hotfix → main | Preserves branch history |

### 6.2 Recommended Merge Strategy by Branch Type

```
┌─────────────────────────────────────────────────────────────────────┐
│                      MERGE STRATEGY MATRIX                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Source Branch        Target Branch       Merge Method               │
│  ─────────────────────────────────────────────────────────────────  │
│  feature/*      →     develop             Squash and Merge           │
│  fix/*          →     develop             Squash and Merge           │
│  refactor/*     →     develop             Squash and Merge           │
│  docs/*         →     develop             Squash and Merge           │
│  test/*         →     develop             Squash and Merge           │
│  chore/*        →     develop             Squash and Merge           │
│                                                                      │
│  develop        →     main                Create Merge Commit        │
│  release/*      →     main                Create Merge Commit        │
│  hotfix/*       →     main                Create Merge Commit        │
│  hotfix/*       →     develop             Create Merge Commit        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Pre-Merge Checklist
```
Before Merging:
─────────────────
□ All CI checks pass
□ Code review approved (if applicable)
□ No merge conflicts
□ Branch is up-to-date with target
□ Tests pass locally
□ Documentation updated (if needed)
□ Changelog updated (for releases)
```

### 6.4 Merge Conflict Resolution
```bash
# Update your branch with latest target
git checkout feature/my-feature
git fetch origin develop
git merge origin/develop

# If conflicts occur:
# 1. Open conflicted files
# 2. Resolve conflicts (keep relevant changes)
# 3. Remove conflict markers
# 4. Test the resolution
# 5. Stage and commit

git add .
git commit -m "chore: resolve merge conflicts with develop"
git push
```

---

## 7. Tag and Release Conventions

### 7.1 Version Format (Semantic Versioning)
```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]

Examples:
1.0.0         - Initial release
1.1.0         - New features (backwards compatible)
1.1.1         - Bug fix
2.0.0         - Breaking changes
1.2.0-alpha.1 - Alpha pre-release
1.2.0-beta.2  - Beta pre-release
1.2.0-rc.1    - Release candidate
```

### 7.2 Version Increment Rules

| Change Type | Version Increment | Example |
|-------------|-------------------|---------|
| Breaking API changes | MAJOR | 1.0.0 → 2.0.0 |
| New features (backwards compatible) | MINOR | 1.0.0 → 1.1.0 |
| Bug fixes | PATCH | 1.0.0 → 1.0.1 |
| Pre-release | PRERELEASE | 1.0.0 → 1.0.0-alpha.1 |

### 7.3 Tag Naming Convention
```
v<MAJOR>.<MINOR>.<PATCH>

Examples:
v1.0.0
v1.2.3
v2.0.0-alpha.1
v2.0.0-beta.1
v2.0.0-rc.1
```

### 7.4 Creating a Release

#### Step-by-Step Release Process
```bash
# 1. Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Bump version number
# Update package.json, version files, etc.
npm version minor --no-git-tag-version

# 3. Update CHANGELOG.md
# Document all changes in this release

# 4. Commit version bump
git add .
git commit -m "chore(release): bump version to 1.2.0"

# 5. Merge to main
git checkout main
git merge release/v1.2.0 --no-ff -m "chore(release): merge release/v1.2.0"

# 6. Create annotated tag
git tag -a v1.2.0 -m "Release v1.2.0

## Features
- Add user authentication
- Integrate payment gateway

## Bug Fixes
- Fix login redirect issue
- Resolve session timeout bug

## Breaking Changes
- None
"

# 7. Push main and tag
git push origin main
git push origin v1.2.0

# 8. Merge back to develop
git checkout develop
git merge release/v1.2.0 --no-ff -m "chore: merge release/v1.2.0 back to develop"
git push origin develop

# 9. Delete release branch
git branch -d release/v1.2.0
```

### 7.5 CHANGELOG Format
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New feature descriptions

### Changed
- Modifications to existing features

### Deprecated
- Features to be removed in future

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security patches

## [1.2.0] - 2026-01-15

### Added
- User authentication with OAuth2 (#SA-101)
- Payment gateway integration with bKash (#SA-156)
- Parent notification system (#SA-178)

### Changed
- Improved dashboard loading performance (#SA-189)
- Updated Tailwind CSS to v4.0 (#SA-192)

### Fixed
- Login redirect loop issue (#SA-202)
- Session timeout handling (#SA-210)

## [1.1.0] - 2025-12-01

### Added
- Initial admin dashboard
- Student enrollment module
- Fee management system

[Unreleased]: https://github.com/org/repo/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/org/repo/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/org/repo/releases/tag/v1.1.0
```

---

## 8. .gitignore Configuration

### 8.1 Complete .gitignore File
```gitignore
# ============================================
# Smart Academy .gitignore
# ============================================

# ===========================
# Dependencies
# ===========================
node_modules/
.pnpm-store/
.yarn/
.npm/

# ===========================
# Build Outputs
# ===========================
dist/
build/
.next/
.turbo/
.vercel/
.output/
out/

# ===========================
# Cache & Temp Files
# ===========================
.cache/
*.cache
.temp/
tmp/
*.tmp
*.swp
*.swo
*~

# ===========================
# IDE & Editor
# ===========================
.idea/
*.iml
*.sublime-project
*.sublime-workspace
.project
.classpath
.settings/

# VSCode (keep shared settings)
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
!.vscode/snippets/
*.code-workspace

# ===========================
# Environment Variables
# ===========================
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local
!.env.example

# ===========================
# Logs
# ===========================
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# ===========================
# Testing
# ===========================
coverage/
.nyc_output/
test-results/
playwright-report/
junit.xml

# ===========================
# Database
# ===========================
*.db
*.sqlite
*.sqlite3
prisma/dev.db
prisma/dev.db-journal

# ===========================
# Docker
# ===========================
docker-compose.override.yml
docker-compose.local.yml
.docker/

# ===========================
# OS Files
# ===========================
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
desktop.ini

# ===========================
# TypeScript
# ===========================
*.tsbuildinfo
tsconfig.tsbuildinfo

# ===========================
# Expo / React Native
# ===========================
.expo/
.expo-shared/
*.jks
*.keystore
*.p8
*.p12
*.mobileprovision
android/app/debug.keystore
android/.gradle/
android/app/build/
ios/Pods/
ios/build/

# ===========================
# Secrets & Keys
# ===========================
*.pem
*.key
*.crt
*.cert
secrets/
credentials/
*.credentials
*.secret

# ===========================
# Prisma
# ===========================
prisma/migrations/*.sql.bak

# ===========================
# Storybook
# ===========================
storybook-static/

# ===========================
# Bundle Analysis
# ===========================
.next/analyze/
bundle-stats.html
stats.json

# ===========================
# Miscellaneous
# ===========================
*.tgz
*.zip
*.tar.gz
.git-blame-ignore-revs
```

### 8.2 Global .gitignore
```bash
# Set up global gitignore
git config --global core.excludesFile ~/.gitignore_global

# Create global gitignore
cat << 'EOF' > ~/.gitignore_global
# OS
.DS_Store
Thumbs.db
desktop.ini

# IDEs
.idea/
*.iml
*.sublime-project
*.sublime-workspace
.vscode/

# Temp files
*.swp
*.swo
*~
EOF
```

---

## 9. Git Hooks

### 9.1 Husky Setup
```bash
# Install Husky
pnpm add -D husky

# Initialize Husky
pnpm exec husky init
```

### 9.2 Pre-commit Hook
```bash
#!/bin/sh
# .husky/pre-commit

# Run lint-staged for staged files
pnpm lint-staged

# Run type checking
pnpm type-check

# Prevent commits with "TODO" or "FIXME" to main/develop
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" = "main" ] || [ "$branch" = "develop" ]; then
  if git diff --cached --diff-filter=ACM | grep -E "(TODO|FIXME)" >/dev/null; then
    echo "Error: Commit contains TODO/FIXME. Please resolve before committing to $branch."
    exit 1
  fi
fi
```

### 9.3 Commit Message Hook
```bash
#!/bin/sh
# .husky/commit-msg

# Validate commit message format using commitlint
pnpm exec commitlint --edit "$1"
```

### 9.4 Pre-push Hook
```bash
#!/bin/sh
# .husky/pre-push

# Run tests before pushing
pnpm test

# Run build to ensure it compiles
pnpm build
```

### 9.5 Lint-Staged Configuration
```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ],
    "*.prisma": [
      "prisma format"
    ]
  }
}
```

### 9.6 Commitlint Configuration
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf',
        'ci',
        'build',
        'revert',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'auth',
        'api',
        'web',
        'admin',
        'mobile',
        'db',
        'ui',
        'payment',
        'sms',
        'email',
        'gibbon',
        'moodle',
        'config',
        'deps',
        'lint',
        'test',
        'ci',
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
};
```

---

## 10. Best Practices

### 10.1 Daily Workflow

```bash
# Start of day
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/SA-123-new-feature

# Work on feature
# ... make changes ...

# Commit frequently
git add .
git commit -m "feat(scope): implement partial feature"

# End of day - push work
git push -u origin feature/SA-123-new-feature
```

### 10.2 Keep History Clean

```bash
# Interactive rebase to clean up commits before PR
git rebase -i HEAD~5

# Rebase onto latest develop
git fetch origin develop
git rebase origin/develop

# Squash commits if needed
git rebase -i HEAD~3
# Change 'pick' to 'squash' for commits to combine
```

### 10.3 Git Stash Usage

```bash
# Stash current changes
git stash push -m "WIP: working on feature X"

# List stashes
git stash list

# Apply latest stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Delete stash
git stash drop stash@{0}
```

### 10.4 Undo Operations

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo staged changes
git reset HEAD <file>

# Discard local changes to a file
git checkout -- <file>

# Revert a pushed commit (creates new commit)
git revert <commit-hash>
```

### 10.5 Git Aliases Recommendation

```bash
# Add useful aliases
git config --global alias.st "status -sb"
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.amend "commit --amend --no-edit"
git config --global alias.uncommit "reset --soft HEAD~1"
git config --global alias.wip "!git add -A && git commit -m 'WIP'"
git config --global alias.unwip "reset HEAD~1"
```

### 10.6 Common Commands Reference

| Task | Command |
|------|---------|
| View status | `git st` or `git status -sb` |
| View log | `git lg` or `git log --oneline` |
| Create branch | `git checkout -b feature/name` |
| Switch branch | `git checkout branch-name` |
| Delete local branch | `git branch -d branch-name` |
| Delete remote branch | `git push origin --delete branch-name` |
| Update branch | `git pull origin branch-name` |
| Push new branch | `git push -u origin branch-name` |
| View diff | `git diff` |
| View staged diff | `git diff --staged` |
| Blame file | `git blame file.ts` |
| Show commit | `git show commit-hash` |
| Cherry-pick | `git cherry-pick commit-hash` |

---

## Appendices

### Appendix A: Git Configuration File
```bash
# ~/.gitconfig

[user]
    name = Your Name
    email = your.email@example.com

[core]
    editor = code --wait
    autocrlf = input
    pager = delta

[init]
    defaultBranch = main

[pull]
    rebase = false

[push]
    autoSetupRemote = true

[fetch]
    prune = true

[diff]
    colorMoved = default

[merge]
    conflictstyle = diff3

[alias]
    st = status -sb
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph --decorate --all
    last = log -1 HEAD
    unstage = reset HEAD --
    amend = commit --amend --no-edit
    uncommit = reset --soft HEAD~1
    wip = !git add -A && git commit -m 'WIP'
    unwip = reset HEAD~1

[credential]
    helper = cache --timeout=3600

[color]
    ui = auto
```

### Appendix B: Git Troubleshooting

#### Fix Diverged Branches
```bash
# Option 1: Merge
git pull origin branch-name

# Option 2: Rebase
git pull --rebase origin branch-name
```

#### Recover Deleted Branch
```bash
# Find the commit hash
git reflog

# Recreate branch
git checkout -b branch-name commit-hash
```

#### Fix Wrong Branch Commit
```bash
# Move commit to correct branch
git checkout correct-branch
git cherry-pick commit-hash
git checkout wrong-branch
git reset --hard HEAD~1
```

---

## Document History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Smart Academy Team | Initial document |
