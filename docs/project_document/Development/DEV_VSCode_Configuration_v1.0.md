# VSCode Configuration

## Document Information
| Field | Value |
|-------|-------|
| **Document ID** | DEV-VSC-001 |
| **Version** | 1.0 |
| **Last Updated** | 2026-01-10 |
| **Author** | Smart Academy Development Team |
| **Status** | Active |

---

## Table of Contents
1. [Overview](#1-overview)
2. [Required Extensions](#2-required-extensions)
3. [Recommended Extensions](#3-recommended-extensions)
4. [Workspace Settings](#4-workspace-settings)
5. [Debug Configurations](#5-debug-configurations)
6. [Task Runners](#6-task-runners)
7. [Code Snippets](#7-code-snippets)
8. [Keyboard Shortcuts](#8-keyboard-shortcuts)

---

## 1. Overview

### 1.1 Purpose
This document defines the standardized VSCode configuration for the Smart Academy Digital Portal development. Following these configurations ensures consistent code formatting, efficient debugging, and streamlined development workflows.

### 1.2 Configuration Files Location
```
smart-academy/
├── .vscode/
│   ├── extensions.json     # Recommended extensions
│   ├── settings.json       # Workspace settings
│   ├── launch.json        # Debug configurations
│   ├── tasks.json         # Task runners
│   └── snippets/          # Custom snippets
│       ├── typescript.json
│       ├── typescriptreact.json
│       └── prisma.json
```

---

## 2. Required Extensions

### 2.1 Core Extensions (Must Install)

| Extension | ID | Purpose |
|-----------|-----|---------|
| ESLint | `dbaeumer.vscode-eslint` | JavaScript/TypeScript linting |
| Prettier | `esbenp.prettier-vscode` | Code formatting |
| TypeScript | Built-in | TypeScript language support |
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss` | Tailwind autocomplete |
| Prisma | `Prisma.prisma` | Prisma schema support |
| Docker | `ms-azuretools.vscode-docker` | Docker integration |
| GitLens | `eamodio.gitlens` | Enhanced Git features |

### 2.2 Extensions JSON Configuration
```json
// .vscode/extensions.json
{
  "recommendations": [
    // Core - Required
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "Prisma.prisma",
    "ms-azuretools.vscode-docker",
    "eamodio.gitlens",

    // TypeScript/JavaScript
    "yoavbls.pretty-ts-errors",
    "mattpocock.ts-error-translator",
    "VisualStudioExptTeam.vscodeintellicode",

    // React/Next.js
    "dsznajder.es7-react-js-snippets",
    "msjsdiag.vscode-react-native",
    "formulahendry.auto-rename-tag",
    "steoates.autoimport",

    // API Development
    "humao.rest-client",
    "rangav.vscode-thunder-client",

    // Database
    "mtxr.sqltools",
    "mtxr.sqltools-driver-pg",
    "cweijan.vscode-database-client2",

    // Git
    "mhutchie.git-graph",
    "donjayamanne.githistory",

    // Productivity
    "usernamehw.errorlens",
    "aaron-bond.better-comments",
    "streetsidesoftware.code-spell-checker",
    "mikestead.dotenv",
    "EditorConfig.EditorConfig",

    // Themes & Icons
    "PKief.material-icon-theme",
    "zhuangtongfa.material-theme"
  ],
  "unwantedRecommendations": []
}
```

### 2.3 Extension Installation Script
```bash
#!/bin/bash
# scripts/install-vscode-extensions.sh

extensions=(
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
    "bradlc.vscode-tailwindcss"
    "Prisma.prisma"
    "ms-azuretools.vscode-docker"
    "eamodio.gitlens"
    "yoavbls.pretty-ts-errors"
    "mattpocock.ts-error-translator"
    "VisualStudioExptTeam.vscodeintellicode"
    "dsznajder.es7-react-js-snippets"
    "humao.rest-client"
    "usernamehw.errorlens"
    "aaron-bond.better-comments"
    "streetsidesoftware.code-spell-checker"
    "mikestead.dotenv"
    "EditorConfig.EditorConfig"
    "PKief.material-icon-theme"
    "mhutchie.git-graph"
    "formulahendry.auto-rename-tag"
    "steoates.autoimport"
    "mtxr.sqltools"
    "mtxr.sqltools-driver-pg"
)

echo "🔧 Installing VSCode extensions for Smart Academy..."
for ext in "${extensions[@]}"; do
    echo "Installing: $ext"
    code --install-extension "$ext" --force
done
echo "✅ All extensions installed!"
```

---

## 3. Recommended Extensions

### 3.1 Extension Categories

#### TypeScript/JavaScript Development
| Extension | ID | Description |
|-----------|-----|-------------|
| Pretty TypeScript Errors | `yoavbls.pretty-ts-errors` | Human-readable TS errors |
| TypeScript Error Translator | `mattpocock.ts-error-translator` | Plain English TS errors |
| IntelliCode | `VisualStudioExptTeam.vscodeintellicode` | AI-assisted completions |
| Import Cost | `wix.vscode-import-cost` | Display import sizes |

#### React Development
| Extension | ID | Description |
|-----------|-----|-------------|
| ES7+ React Snippets | `dsznajder.es7-react-js-snippets` | React/Redux snippets |
| React Native Tools | `msjsdiag.vscode-react-native` | React Native debugging |
| Auto Rename Tag | `formulahendry.auto-rename-tag` | Rename paired HTML/JSX tags |
| Auto Import | `steoates.autoimport` | Automatic imports |

#### Database Tools
| Extension | ID | Description |
|-----------|-----|-------------|
| SQLTools | `mtxr.sqltools` | Database management |
| PostgreSQL Driver | `mtxr.sqltools-driver-pg` | PostgreSQL support |
| Database Client | `cweijan.vscode-database-client2` | Multi-database GUI |

#### API Development
| Extension | ID | Description |
|-----------|-----|-------------|
| REST Client | `humao.rest-client` | Test REST APIs |
| Thunder Client | `rangav.vscode-thunder-client` | Postman alternative |

#### Git Tools
| Extension | ID | Description |
|-----------|-----|-------------|
| Git Graph | `mhutchie.git-graph` | Visual git graph |
| Git History | `donjayamanne.githistory` | View git log history |

#### Productivity
| Extension | ID | Description |
|-----------|-----|-------------|
| Error Lens | `usernamehw.errorlens` | Inline error display |
| Better Comments | `aaron-bond.better-comments` | Colorful comments |
| Code Spell Checker | `streetsidesoftware.code-spell-checker` | Spelling corrections |
| DotENV | `mikestead.dotenv` | .env file syntax |
| EditorConfig | `EditorConfig.EditorConfig` | EditorConfig support |
| Path Intellisense | `christian-kohler.path-intellisense` | Path autocomplete |
| TODO Highlight | `wayou.vscode-todo-highlight` | Highlight TODOs |

---

## 4. Workspace Settings

### 4.1 Complete Workspace Settings
```json
// .vscode/settings.json
{
  // ===========================
  // Editor Settings
  // ===========================
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "editor.wordWrap": "off",
  "editor.minimap.enabled": false,
  "editor.rulers": [80, 120],
  "editor.renderWhitespace": "boundary",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.linkedEditing": true,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.smoothScrolling": true,
  "editor.stickyScroll.enabled": true,
  "editor.inlineSuggest.enabled": true,
  "editor.suggestSelection": "first",
  "editor.quickSuggestions": {
    "strings": true
  },

  // ===========================
  // Formatting
  // ===========================
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit",
    "source.addMissingImports": "explicit"
  },

  // ===========================
  // File Settings
  // ===========================
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true,
    "**/coverage": true,
    "**/.turbo": true
  },
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/**": true,
    "**/.next/**": true,
    "**/dist/**": true
  },
  "files.associations": {
    "*.css": "tailwindcss",
    ".env*": "dotenv"
  },

  // ===========================
  // Search Settings
  // ===========================
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/coverage": true,
    "**/.next": true,
    "**/pnpm-lock.yaml": true
  },

  // ===========================
  // TypeScript Settings
  // ===========================
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.preferences.quoteStyle": "single",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.variableTypes.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,
  "typescript.tsdk": "node_modules/typescript/lib",

  // ===========================
  // JavaScript Settings
  // ===========================
  "javascript.preferences.importModuleSpecifier": "relative",
  "javascript.preferences.quoteStyle": "single",
  "javascript.suggest.autoImports": true,
  "javascript.updateImportsOnFileMove.enabled": "always",

  // ===========================
  // ESLint Settings
  // ===========================
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.workingDirectories": [
    { "pattern": "apps/*" },
    { "pattern": "packages/*" }
  ],
  "eslint.codeActionsOnSave.mode": "problems",

  // ===========================
  // Prettier Settings
  // ===========================
  "prettier.enable": true,
  "prettier.requireConfig": true,
  "prettier.configPath": ".prettierrc",

  // ===========================
  // Tailwind CSS Settings
  // ===========================
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["clsx\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "tailwindCSS.validate": true,

  // ===========================
  // Prisma Settings
  // ===========================
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
    "editor.formatOnSave": true
  },

  // ===========================
  // JSON Settings
  // ===========================
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // ===========================
  // Markdown Settings
  // ===========================
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "comments": "on",
      "strings": "on",
      "other": "on"
    }
  },

  // ===========================
  // Git Settings
  // ===========================
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "git.postCommitCommand": "none",
  "git.openRepositoryInParentFolders": "never",

  // ===========================
  // GitLens Settings
  // ===========================
  "gitlens.codeLens.enabled": true,
  "gitlens.codeLens.authors.enabled": true,
  "gitlens.codeLens.recentChange.enabled": true,
  "gitlens.currentLine.enabled": true,
  "gitlens.hovers.enabled": true,

  // ===========================
  // Docker Settings
  // ===========================
  "docker.containers.sortBy": "CreatedTime",
  "docker.containers.label": "ContainerName",

  // ===========================
  // Terminal Settings
  // ===========================
  "terminal.integrated.defaultProfile.linux": "bash",
  "terminal.integrated.fontFamily": "'JetBrains Mono', monospace",
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.scrollback": 10000,
  "terminal.integrated.env.linux": {
    "NODE_OPTIONS": "--max-old-space-size=8192"
  },

  // ===========================
  // Explorer Settings
  // ===========================
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.compactFolders": false,
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": {
    "*.ts": "${capture}.js, ${capture}.d.ts, ${capture}.test.ts, ${capture}.spec.ts",
    "*.tsx": "${capture}.test.tsx, ${capture}.spec.tsx, ${capture}.stories.tsx",
    "package.json": "package-lock.json, pnpm-lock.yaml, yarn.lock, .npmrc, .nvmrc",
    "tsconfig.json": "tsconfig.*.json",
    ".eslintrc*": ".eslintignore",
    ".prettierrc*": ".prettierignore",
    "docker-compose.yml": "docker-compose.*.yml, Dockerfile*",
    ".env": ".env.*, .env.local, .env.development, .env.production"
  },

  // ===========================
  // Error Lens Settings
  // ===========================
  "errorLens.enabledDiagnosticLevels": ["error", "warning"],
  "errorLens.delay": 500,
  "errorLens.fontStyleItalic": true,

  // ===========================
  // Code Spell Checker Settings
  // ===========================
  "cSpell.words": [
    "autofetch",
    "Fastify",
    "Gibbon",
    "Moodle",
    "Tailwindcss",
    "tanstack",
    "trpc",
    "Zod",
    "Prisma",
    "RBAC",
    "bKash",
    "Nagad",
    "SSLCommerz",
    "COPPA",
    "monorepo",
    "turborepo",
    "middlewares",
    "datasource",
    "signin",
    "signup",
    "readonly",
    "typesafe"
  ],

  // ===========================
  // Workbench Settings
  // ===========================
  "workbench.iconTheme": "material-icon-theme",
  "workbench.colorTheme": "One Dark Pro",
  "workbench.tree.indent": 16,
  "workbench.startupEditor": "none",
  "workbench.editor.enablePreview": false,

  // ===========================
  // Emmet Settings
  // ===========================
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "emmet.triggerExpansionOnTab": true,

  // ===========================
  // REST Client Settings
  // ===========================
  "rest-client.environmentVariables": {
    "$shared": {
      "version": "v1"
    },
    "development": {
      "host": "http://localhost:4000",
      "token": ""
    },
    "staging": {
      "host": "https://staging-api.smartacademy.edu.bd",
      "token": ""
    }
  }
}
```

### 4.2 Language-Specific Settings
```json
// Additional language-specific settings
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 5. Debug Configurations

### 5.1 Complete Launch Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    // ===========================
    // Next.js Debugging
    // ===========================
    {
      "name": "Next.js: Debug Server",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/apps/web",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      },
      "env": {
        "NODE_OPTIONS": "--inspect"
      }
    },
    {
      "name": "Next.js: Debug Client",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/apps/web",
      "sourceMapPathOverrides": {
        "webpack://_N_E/*": "${webRoot}/*"
      }
    },
    {
      "name": "Next.js: Full Stack",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/apps/web",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    },

    // ===========================
    // Fastify API Debugging
    // ===========================
    {
      "name": "API: Debug Server",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/apps/api",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "name": "API: Attach",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true,
      "skipFiles": ["<node_internals>/**"]
    },

    // ===========================
    // Admin Dashboard Debugging
    // ===========================
    {
      "name": "Admin: Debug Server",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/apps/admin",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "Local:.+(https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    },

    // ===========================
    // React Native / Expo Debugging
    // ===========================
    {
      "name": "Mobile: Debug Expo",
      "type": "reactnative",
      "request": "launch",
      "cwd": "${workspaceFolder}/apps/mobile",
      "platform": "exponent",
      "expoHostType": "lan"
    },
    {
      "name": "Mobile: Attach Expo",
      "type": "reactnative",
      "request": "attach",
      "cwd": "${workspaceFolder}/apps/mobile",
      "platform": "exponent"
    },

    // ===========================
    // Jest Test Debugging
    // ===========================
    {
      "name": "Jest: Debug Current File",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${relativeFile}",
        "--config",
        "jest.config.ts",
        "--runInBand",
        "--no-cache"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Jest: Debug All Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["test", "--", "--runInBand"],
      "console": "integratedTerminal"
    },

    // ===========================
    // Vitest Debugging
    // ===========================
    {
      "name": "Vitest: Debug Current File",
      "type": "node",
      "request": "launch",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "console": "integratedTerminal"
    },

    // ===========================
    // TypeScript File Debugging
    // ===========================
    {
      "name": "Debug Current TS File",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": ["tsx", "${file}"],
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ],

  "compounds": [
    {
      "name": "Full Stack Debug",
      "configurations": [
        "API: Debug Server",
        "Next.js: Full Stack"
      ],
      "stopAll": true
    }
  ]
}
```

### 5.2 Debug Configuration Details

#### Next.js Server-Side Debugging
```
Configuration: "Next.js: Debug Server"
- Starts Next.js dev server with Node.js inspector
- Automatically opens Chrome for client-side debugging
- Enables breakpoints in server components, API routes, middleware
```

#### Fastify API Debugging
```
Configuration: "API: Debug Server"
- Starts Fastify with debugger attached
- Breakpoints work in route handlers, hooks, plugins
- Environment set to development
```

#### Test Debugging
```
Configuration: "Jest: Debug Current File" / "Vitest: Debug Current File"
- Debug tests with breakpoints
- Run single test file in isolation
- Step through test assertions
```

---

## 6. Task Runners

### 6.1 Complete Tasks Configuration
```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    // ===========================
    // Development Tasks
    // ===========================
    {
      "label": "dev",
      "type": "shell",
      "command": "pnpm dev",
      "group": "build",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "runOptions": {
        "instanceLimit": 1
      }
    },
    {
      "label": "dev:web",
      "type": "shell",
      "command": "pnpm dev:web",
      "group": "build",
      "problemMatcher": ["$tsc-watch"],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated",
        "group": "dev"
      }
    },
    {
      "label": "dev:api",
      "type": "shell",
      "command": "pnpm dev:api",
      "group": "build",
      "problemMatcher": ["$tsc-watch"],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated",
        "group": "dev"
      }
    },
    {
      "label": "dev:admin",
      "type": "shell",
      "command": "pnpm dev:admin",
      "group": "build",
      "problemMatcher": ["$tsc-watch"],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated",
        "group": "dev"
      }
    },

    // ===========================
    // Build Tasks
    // ===========================
    {
      "label": "build",
      "type": "shell",
      "command": "pnpm build",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "build:web",
      "type": "shell",
      "command": "pnpm --filter @smart-academy/web build",
      "group": "build",
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "build:api",
      "type": "shell",
      "command": "pnpm --filter @smart-academy/api build",
      "group": "build",
      "problemMatcher": ["$tsc"]
    },

    // ===========================
    // Lint & Format Tasks
    // ===========================
    {
      "label": "lint",
      "type": "shell",
      "command": "pnpm lint",
      "group": "test",
      "problemMatcher": ["$eslint-stylish"]
    },
    {
      "label": "lint:fix",
      "type": "shell",
      "command": "pnpm lint:fix",
      "group": "test",
      "problemMatcher": ["$eslint-stylish"]
    },
    {
      "label": "format",
      "type": "shell",
      "command": "pnpm format",
      "group": "none",
      "problemMatcher": []
    },
    {
      "label": "format:check",
      "type": "shell",
      "command": "pnpm format:check",
      "group": "test",
      "problemMatcher": []
    },

    // ===========================
    // Type Checking Tasks
    // ===========================
    {
      "label": "type-check",
      "type": "shell",
      "command": "pnpm type-check",
      "group": "test",
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "type-check:watch",
      "type": "shell",
      "command": "pnpm type-check --watch",
      "group": "test",
      "problemMatcher": ["$tsc-watch"],
      "isBackground": true
    },

    // ===========================
    // Test Tasks
    // ===========================
    {
      "label": "test",
      "type": "shell",
      "command": "pnpm test",
      "group": {
        "kind": "test",
        "isDefault": true
      },
      "problemMatcher": []
    },
    {
      "label": "test:watch",
      "type": "shell",
      "command": "pnpm test:watch",
      "group": "test",
      "problemMatcher": [],
      "isBackground": true
    },
    {
      "label": "test:coverage",
      "type": "shell",
      "command": "pnpm test:coverage",
      "group": "test",
      "problemMatcher": []
    },

    // ===========================
    // Prisma Tasks
    // ===========================
    {
      "label": "prisma:generate",
      "type": "shell",
      "command": "pnpm prisma:generate",
      "group": "none",
      "problemMatcher": []
    },
    {
      "label": "prisma:migrate:dev",
      "type": "shell",
      "command": "pnpm prisma:migrate:dev",
      "group": "none",
      "problemMatcher": []
    },
    {
      "label": "prisma:studio",
      "type": "shell",
      "command": "pnpm prisma:studio",
      "group": "none",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      }
    },
    {
      "label": "prisma:seed",
      "type": "shell",
      "command": "pnpm prisma:seed",
      "group": "none",
      "problemMatcher": []
    },

    // ===========================
    // Docker Tasks
    // ===========================
    {
      "label": "docker:up",
      "type": "shell",
      "command": "docker compose up -d",
      "group": "none",
      "problemMatcher": []
    },
    {
      "label": "docker:down",
      "type": "shell",
      "command": "docker compose down",
      "group": "none",
      "problemMatcher": []
    },
    {
      "label": "docker:logs",
      "type": "shell",
      "command": "docker compose logs -f",
      "group": "none",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      }
    },
    {
      "label": "docker:restart",
      "type": "shell",
      "command": "docker compose restart",
      "group": "none",
      "problemMatcher": []
    },

    // ===========================
    // Utility Tasks
    // ===========================
    {
      "label": "clean",
      "type": "shell",
      "command": "pnpm clean",
      "group": "none",
      "problemMatcher": []
    },
    {
      "label": "install",
      "type": "shell",
      "command": "pnpm install",
      "group": "none",
      "problemMatcher": []
    },

    // ===========================
    // Compound Tasks
    // ===========================
    {
      "label": "Full Setup",
      "dependsOrder": "sequence",
      "dependsOn": ["docker:up", "install", "prisma:generate", "prisma:migrate:dev", "prisma:seed"],
      "group": "none",
      "problemMatcher": []
    },
    {
      "label": "Pre-commit Check",
      "dependsOrder": "sequence",
      "dependsOn": ["type-check", "lint", "test"],
      "group": "test",
      "problemMatcher": []
    }
  ]
}
```

### 6.2 Running Tasks
| Keyboard Shortcut | Action |
|-------------------|--------|
| `Ctrl + Shift + B` | Run default build task |
| `Ctrl + Shift + P` → "Run Task" | Select and run any task |
| `Ctrl + Shift + P` → "Run Test Task" | Run test tasks |

---

## 7. Code Snippets

### 7.1 TypeScript Snippets
```json
// .vscode/snippets/typescript.json
{
  // ===========================
  // Function Snippets
  // ===========================
  "Arrow Function": {
    "prefix": "af",
    "body": [
      "const ${1:name} = (${2:params}) => {",
      "  $0",
      "}"
    ],
    "description": "Arrow function"
  },
  "Async Arrow Function": {
    "prefix": "aaf",
    "body": [
      "const ${1:name} = async (${2:params}) => {",
      "  $0",
      "}"
    ],
    "description": "Async arrow function"
  },
  "Export Function": {
    "prefix": "ef",
    "body": [
      "export const ${1:name} = (${2:params}): ${3:ReturnType} => {",
      "  $0",
      "}"
    ],
    "description": "Export named function"
  },
  "Export Async Function": {
    "prefix": "eaf",
    "body": [
      "export const ${1:name} = async (${2:params}): Promise<${3:ReturnType}> => {",
      "  $0",
      "}"
    ],
    "description": "Export async function"
  },

  // ===========================
  // Type Snippets
  // ===========================
  "Interface": {
    "prefix": "intf",
    "body": [
      "interface ${1:Name} {",
      "  ${2:property}: ${3:type}",
      "}"
    ],
    "description": "TypeScript interface"
  },
  "Type Alias": {
    "prefix": "typ",
    "body": [
      "type ${1:Name} = ${2:type}"
    ],
    "description": "Type alias"
  },
  "Export Interface": {
    "prefix": "eintf",
    "body": [
      "export interface ${1:Name} {",
      "  ${2:property}: ${3:type}",
      "}"
    ],
    "description": "Export interface"
  },
  "Export Type": {
    "prefix": "etyp",
    "body": [
      "export type ${1:Name} = ${2:type}"
    ],
    "description": "Export type"
  },

  // ===========================
  // Import Snippets
  // ===========================
  "Import": {
    "prefix": "imp",
    "body": [
      "import { ${2:module} } from '${1:package}'"
    ],
    "description": "Import statement"
  },
  "Import Default": {
    "prefix": "impd",
    "body": [
      "import ${2:module} from '${1:package}'"
    ],
    "description": "Import default"
  },
  "Import Type": {
    "prefix": "impt",
    "body": [
      "import type { ${2:Type} } from '${1:package}'"
    ],
    "description": "Import type"
  },

  // ===========================
  // Error Handling
  // ===========================
  "Try Catch": {
    "prefix": "tc",
    "body": [
      "try {",
      "  $1",
      "} catch (error) {",
      "  ${2:console.error(error)}",
      "}"
    ],
    "description": "Try-catch block"
  },
  "Try Catch Finally": {
    "prefix": "tcf",
    "body": [
      "try {",
      "  $1",
      "} catch (error) {",
      "  ${2:console.error(error)}",
      "} finally {",
      "  $3",
      "}"
    ],
    "description": "Try-catch-finally block"
  },

  // ===========================
  // Console Snippets
  // ===========================
  "Console Log": {
    "prefix": "cl",
    "body": ["console.log($1)"],
    "description": "Console log"
  },
  "Console Log Variable": {
    "prefix": "clv",
    "body": ["console.log('${1:variable}:', ${1:variable})"],
    "description": "Console log with label"
  },
  "Console Error": {
    "prefix": "ce",
    "body": ["console.error($1)"],
    "description": "Console error"
  },

  // ===========================
  // Zod Snippets
  // ===========================
  "Zod Schema": {
    "prefix": "zsch",
    "body": [
      "const ${1:name}Schema = z.object({",
      "  ${2:field}: z.${3:string}(),",
      "})",
      "",
      "type ${1:name} = z.infer<typeof ${1:name}Schema>"
    ],
    "description": "Zod schema with type"
  },
  "Zod String": {
    "prefix": "zstr",
    "body": ["z.string()${1:.min(1)}"],
    "description": "Zod string"
  },
  "Zod Number": {
    "prefix": "znum",
    "body": ["z.number()${1:.min(0)}"],
    "description": "Zod number"
  }
}
```

### 7.2 TypeScript React Snippets
```json
// .vscode/snippets/typescriptreact.json
{
  // ===========================
  // Component Snippets
  // ===========================
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "interface ${1:${TM_FILENAME_BASE}}Props {",
      "  $2",
      "}",
      "",
      "export function ${1:${TM_FILENAME_BASE}}({ $3 }: ${1:${TM_FILENAME_BASE}}Props) {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ],
    "description": "React functional component with TypeScript"
  },
  "React Functional Component Default Export": {
    "prefix": "rfce",
    "body": [
      "interface ${1:${TM_FILENAME_BASE}}Props {",
      "  $2",
      "}",
      "",
      "export default function ${1:${TM_FILENAME_BASE}}({ $3 }: ${1:${TM_FILENAME_BASE}}Props) {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ],
    "description": "React functional component with default export"
  },
  "React Arrow Component": {
    "prefix": "rafc",
    "body": [
      "interface ${1:${TM_FILENAME_BASE}}Props {",
      "  $2",
      "}",
      "",
      "export const ${1:${TM_FILENAME_BASE}} = ({ $3 }: ${1:${TM_FILENAME_BASE}}Props) => {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ],
    "description": "React arrow functional component"
  },

  // ===========================
  // Hook Snippets
  // ===========================
  "useState": {
    "prefix": "us",
    "body": [
      "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState<${2:type}>(${3:initialValue})"
    ],
    "description": "useState hook"
  },
  "useEffect": {
    "prefix": "ue",
    "body": [
      "useEffect(() => {",
      "  $1",
      "}, [${2:dependencies}])"
    ],
    "description": "useEffect hook"
  },
  "useCallback": {
    "prefix": "ucb",
    "body": [
      "const ${1:callback} = useCallback(() => {",
      "  $2",
      "}, [${3:dependencies}])"
    ],
    "description": "useCallback hook"
  },
  "useMemo": {
    "prefix": "um",
    "body": [
      "const ${1:memoized} = useMemo(() => {",
      "  return $2",
      "}, [${3:dependencies}])"
    ],
    "description": "useMemo hook"
  },
  "useRef": {
    "prefix": "uref",
    "body": [
      "const ${1:ref} = useRef<${2:HTMLDivElement}>(${3:null})"
    ],
    "description": "useRef hook"
  },
  "Custom Hook": {
    "prefix": "hook",
    "body": [
      "import { useState, useEffect } from 'react'",
      "",
      "export function use${1:HookName}(${2:params}) {",
      "  const [${3:state}, set${3/(.*)/${1:/capitalize}/}] = useState($4)",
      "",
      "  useEffect(() => {",
      "    $5",
      "  }, [])",
      "",
      "  return { ${3:state} }",
      "}"
    ],
    "description": "Custom React hook"
  },

  // ===========================
  // Next.js Snippets
  // ===========================
  "Next.js Page": {
    "prefix": "npage",
    "body": [
      "export default function ${1:Page}() {",
      "  return (",
      "    <main>",
      "      $0",
      "    </main>",
      "  )",
      "}"
    ],
    "description": "Next.js page component"
  },
  "Next.js Layout": {
    "prefix": "nlayout",
    "body": [
      "export default function ${1:Layout}({",
      "  children,",
      "}: {",
      "  children: React.ReactNode",
      "}) {",
      "  return (",
      "    <div>",
      "      {children}",
      "    </div>",
      "  )",
      "}"
    ],
    "description": "Next.js layout component"
  },
  "Next.js Server Component": {
    "prefix": "nsc",
    "body": [
      "export default async function ${1:${TM_FILENAME_BASE}}() {",
      "  const data = await ${2:fetchData}()",
      "",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ],
    "description": "Next.js async server component"
  },
  "use client directive": {
    "prefix": "uc",
    "body": ["'use client'", ""],
    "description": "Next.js use client directive"
  },
  "use server directive": {
    "prefix": "userver",
    "body": ["'use server'", ""],
    "description": "Next.js use server directive"
  },

  // ===========================
  // Form Snippets
  // ===========================
  "React Hook Form": {
    "prefix": "rhf",
    "body": [
      "const { register, handleSubmit, formState: { errors } } = useForm<${1:FormData}>()",
      "",
      "const onSubmit = (data: ${1:FormData}) => {",
      "  console.log(data)",
      "}"
    ],
    "description": "React Hook Form setup"
  }
}
```

### 7.3 Prisma Snippets
```json
// .vscode/snippets/prisma.json
{
  "Prisma Model": {
    "prefix": "model",
    "body": [
      "model ${1:ModelName} {",
      "  id        String   @id @default(cuid())",
      "  createdAt DateTime @default(now())",
      "  updatedAt DateTime @updatedAt",
      "  $0",
      "}"
    ],
    "description": "Prisma model"
  },
  "Prisma Enum": {
    "prefix": "enum",
    "body": [
      "enum ${1:EnumName} {",
      "  ${2:VALUE}",
      "}"
    ],
    "description": "Prisma enum"
  },
  "Prisma Relation One-to-Many": {
    "prefix": "rel1m",
    "body": [
      "${1:field}   ${2:Model}   @relation(fields: [${1:field}Id], references: [id])",
      "${1:field}Id String"
    ],
    "description": "Prisma one-to-many relation"
  }
}
```

---

## 8. Keyboard Shortcuts

### 8.1 Custom Keybindings
```json
// Append to keybindings.json (Ctrl+K Ctrl+S → Open Keyboard Shortcuts → JSON)
[
  // ===========================
  // Navigation
  // ===========================
  {
    "key": "alt+1",
    "command": "workbench.view.explorer"
  },
  {
    "key": "alt+2",
    "command": "workbench.view.search"
  },
  {
    "key": "alt+3",
    "command": "workbench.view.scm"
  },
  {
    "key": "alt+4",
    "command": "workbench.view.debug"
  },
  {
    "key": "alt+5",
    "command": "workbench.view.extensions"
  },

  // ===========================
  // Editor
  // ===========================
  {
    "key": "ctrl+d",
    "command": "editor.action.copyLinesDownAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+shift+d",
    "command": "editor.action.deleteLines",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "alt+up",
    "command": "editor.action.moveLinesUpAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "alt+down",
    "command": "editor.action.moveLinesDownAction",
    "when": "editorTextFocus && !editorReadonly"
  },

  // ===========================
  // Terminal
  // ===========================
  {
    "key": "ctrl+`",
    "command": "workbench.action.terminal.toggleTerminal"
  },
  {
    "key": "ctrl+shift+`",
    "command": "workbench.action.terminal.new"
  },

  // ===========================
  // File Operations
  // ===========================
  {
    "key": "ctrl+n",
    "command": "explorer.newFile"
  },
  {
    "key": "ctrl+shift+n",
    "command": "explorer.newFolder"
  },

  // ===========================
  // Git
  // ===========================
  {
    "key": "ctrl+shift+g g",
    "command": "workbench.view.scm"
  },
  {
    "key": "ctrl+shift+g b",
    "command": "gitlens.toggleFileBlame"
  },

  // ===========================
  // Tasks & Debug
  // ===========================
  {
    "key": "ctrl+shift+r",
    "command": "workbench.action.tasks.runTask"
  },
  {
    "key": "f5",
    "command": "workbench.action.debug.start",
    "when": "!inDebugMode"
  },
  {
    "key": "shift+f5",
    "command": "workbench.action.debug.stop",
    "when": "inDebugMode"
  }
]
```

### 8.2 Essential Shortcuts Reference
| Category | Action | Shortcut |
|----------|--------|----------|
| **Navigation** | Quick Open File | `Ctrl + P` |
| | Command Palette | `Ctrl + Shift + P` |
| | Go to Symbol | `Ctrl + Shift + O` |
| | Go to Definition | `F12` |
| | Peek Definition | `Alt + F12` |
| | Find References | `Shift + F12` |
| **Editing** | Format Document | `Shift + Alt + F` |
| | Rename Symbol | `F2` |
| | Quick Fix | `Ctrl + .` |
| | Toggle Comment | `Ctrl + /` |
| | Duplicate Line | `Ctrl + D` (custom) |
| | Delete Line | `Ctrl + Shift + D` (custom) |
| | Move Line Up/Down | `Alt + ↑/↓` |
| **Search** | Find in File | `Ctrl + F` |
| | Find in Workspace | `Ctrl + Shift + F` |
| | Replace in File | `Ctrl + H` |
| **View** | Toggle Sidebar | `Ctrl + B` |
| | Toggle Terminal | `Ctrl + `` |
| | Split Editor | `Ctrl + \` |
| | Toggle Zen Mode | `Ctrl + K Z` |
| **Git** | Open Source Control | `Ctrl + Shift + G` |
| | Toggle File Blame | `Ctrl + Shift + G B` |
| **Debug** | Start Debugging | `F5` |
| | Stop Debugging | `Shift + F5` |
| | Toggle Breakpoint | `F9` |
| | Step Over | `F10` |
| | Step Into | `F11` |

---

## Appendices

### Appendix A: Extension Quick Reference
| Extension | Purpose | Install Command |
|-----------|---------|-----------------|
| ESLint | Linting | `code --install-extension dbaeumer.vscode-eslint` |
| Prettier | Formatting | `code --install-extension esbenp.prettier-vscode` |
| Tailwind | CSS IntelliSense | `code --install-extension bradlc.vscode-tailwindcss` |
| Prisma | Schema support | `code --install-extension Prisma.prisma` |
| GitLens | Git features | `code --install-extension eamodio.gitlens` |

### Appendix B: Troubleshooting

#### Extensions Not Working
```bash
# Reload VSCode window
Ctrl + Shift + P → "Developer: Reload Window"

# Clear extension cache
rm -rf ~/.vscode/extensions/.obsolete
```

#### ESLint Not Finding Config
```json
// Add to settings.json
{
  "eslint.workingDirectories": [{ "mode": "auto" }]
}
```

#### TypeScript Version Mismatch
```json
// Add to settings.json
{
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## Document History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-10 | Smart Academy Team | Initial document |
