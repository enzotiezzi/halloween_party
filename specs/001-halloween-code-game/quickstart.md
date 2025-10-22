# Quickstart Guide: Halloween Code Game

**Feature**: Aplicação de Festa de Halloween com Jogo de Código  
**Date**: 2025-10-22  
**Development**: Local setup and development workflow

## Prerequisites

Ensure you have the required development environment setup:

```bash
# Required versions
node --version  # Should be 18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
git --version   # Should be 2.30.0 or higher
```

## Quick Setup (5 minutes)

### 1. Clone and Setup Project

```bash
# Navigate to project root
cd /Users/enzotiezzi/Documents/Zymbar_Projects/halloween_party

# Verify you're on the correct feature branch
git branch --show-current
# Should show: 001-halloween-code-game

# Create Next.js application
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*"

# Install additional dependencies
npm install @testing-library/react @testing-library/jest-dom jest-environment-jsdom
npm install -D @playwright/test eslint-config-prettier @types/jest
```

### 2. Configure Development Tools

```bash
# Setup ESLint configuration
cat > .eslintrc.json << 'EOF'
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-const": "error"
  }
}
EOF

# Setup Prettier configuration  
cat > .prettierrc << 'EOF'
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
EOF

# Setup Jest configuration
cat > jest.config.js << 'EOF'
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
EOF

# Setup Jest test setup
cat > jest.setup.js << 'EOF'
import '@testing-library/jest-dom'
EOF
```

### 3. Setup Project Structure

```bash
# Create application directories
mkdir -p app/codigo app/validacao app/components/{Layout,CodeDisplay,Validation}
mkdir -p lib public/halloween-assets __tests__/{components,pages,lib,e2e} styles

# Create placeholder files to establish structure
touch app/globals.css app/layout.tsx app/page.tsx
touch app/codigo/page.tsx app/validacao/page.tsx
touch lib/{validation.ts,messages.ts,utils.ts}
touch styles/halloween-theme.css
```

### 4. Start Development Server

```bash
# Start Next.js development server
npm run dev

# Open browser to verify setup
open http://localhost:3000
```

## Development Workflow

### Daily Development Commands

```bash
# Start development with all quality checks
npm run dev

# Run tests in watch mode
npm run test:watch

# Run linting and formatting
npm run lint
npm run format

# Type checking
npm run type-check

# Build for production testing
npm run build && npm run start
```

### Git Workflow

```bash
# Check current feature branch
git status

# Stage and commit changes with conventional format
git add .
git commit -m "feat(halloween): implement code discovery page

- Add HF102 secret code display
- Implement Halloween CSS theme
- Add Portuguese navigation labels"

# Push changes to feature branch
git push origin 001-halloween-code-game
```

## Key Files and Structure

### Essential Configuration Files

```
halloween_party/
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
├── .eslintrc.json        # Linting rules
├── jest.config.js        # Testing configuration
└── .gitignore            # Git ignore patterns
```

### Application Structure

```
app/
├── globals.css           # Global styles with Tailwind
├── layout.tsx            # Root layout with Halloween theme
├── page.tsx              # Home page with navigation
├── codigo/
│   └── page.tsx          # Secret code display page
├── validacao/
│   └── page.tsx          # Code validation page
└── components/
    ├── Layout/
    │   ├── Navigation.tsx     # Site navigation
    │   └── HalloweenTheme.tsx # Theme provider
    ├── CodeDisplay/
    │   └── SecretCode.tsx     # Code display component
    └── Validation/
        ├── CodeInput.tsx      # Input form component
        └── FeedbackMessage.tsx # Success/error messages

lib/
├── validation.ts         # Code validation logic
├── messages.ts           # Portuguese text constants
└── utils.ts              # Utility functions

__tests__/
├── components/           # Component unit tests
├── pages/               # Page integration tests
├── lib/                 # Business logic tests
└── e2e/                 # End-to-end tests
```

## Constitutional Compliance Setup

### Quality Gates Configuration

```bash
# Add npm scripts to package.json
npm pkg set scripts.lint="next lint"
npm pkg set scripts.format="prettier --write ."
npm pkg set scripts.type-check="tsc --noEmit"
npm pkg set scripts.test="jest"
npm pkg set scripts.test:watch="jest --watch"
npm pkg set scripts.test:coverage="jest --coverage"
npm pkg set scripts.e2e="playwright test"
npm pkg set scripts.quality="npm run lint && npm run type-check && npm run test:coverage"
```

### Pre-commit Hook Setup

```bash
# Install husky for git hooks
npm install -D husky lint-staged

# Configure husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Configure lint-staged in package.json
npm pkg set lint-staged='{"*.{ts,tsx}": ["eslint --fix", "prettier --write"], "*.{js,jsx,ts,tsx}": ["jest --bail --findRelatedTests --passWithNoTests"]}'
```

### Performance Monitoring Setup

```bash
# Add performance monitoring to next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  poweredByHeader: false,
  compress: true,
  images: {
    optimizations: true,
  },
}

module.exports = nextConfig
EOF
```

## Halloween Theme Quick Setup

### 1. Tailwind Configuration

```bash
# Update tailwind.config.js with Halloween theme
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        halloween: {
          orange: '#ff6b35',
          purple: '#8b5cf6', 
          dark: '#0a0a0a',
          gray: '#1a1a1a',
          light: '#f5f5f5',
          red: '#dc2626',
        }
      },
      fontFamily: {
        spooky: ['Creepster', 'cursive'],
        gothic: ['Gothic A1', 'sans-serif'],
      },
      animation: {
        'spooky-glow': 'spooky-glow 2s ease-in-out infinite alternate',
        'text-flicker': 'text-flicker 1.5s linear infinite',
      }
    },
  },
  plugins: [],
}

export default config
EOF
```

### 2. Global CSS Setup

```bash
# Setup global Halloween styles
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Gothic+A1:wght@400;600;700&display=swap');

@layer base {
  html {
    @apply dark;
  }
  
  body {
    @apply bg-halloween-dark text-halloween-light font-gothic;
  }
}

@layer components {
  .spooky-container {
    @apply min-h-screen bg-gradient-to-b from-halloween-dark via-halloween-gray to-halloween-dark;
  }
  
  .halloween-card {
    @apply bg-halloween-gray border border-halloween-orange/20 rounded-lg shadow-2xl;
  }
  
  .spooky-text {
    @apply text-halloween-orange font-spooky text-shadow-lg;
  }
  
  .error-text {
    @apply text-halloween-red animate-text-flicker;
  }
  
  .success-text {
    @apply text-halloween-purple animate-spooky-glow;
  }
}

@keyframes spooky-glow {
  from { text-shadow: 0 0 5px currentColor; }
  to { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
}

@keyframes text-flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% { text-shadow: 0 0 4px currentColor; }
  20%, 24%, 55% { text-shadow: none; }
}
EOF
```

## Testing Quick Setup

### Unit Test Example

```bash
# Create first test file
cat > __tests__/components/SecretCode.test.tsx << 'EOF'
import { render, screen } from '@testing-library/react'
import SecretCode from '@/app/components/CodeDisplay/SecretCode'

describe('SecretCode Component', () => {
  it('displays the secret code HF102', () => {
    render(<SecretCode />)
    expect(screen.getByText('HF102')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<SecretCode />)
    const codeElement = screen.getByRole('main')
    expect(codeElement).toHaveAttribute('aria-label')
  })
})
EOF
```

### E2E Test Setup

```bash
# Initialize Playwright
npx playwright install

# Create E2E test
mkdir -p __tests__/e2e
cat > __tests__/e2e/halloween-game.spec.ts << 'EOF'
import { test, expect } from '@playwright/test'

test.describe('Halloween Code Game', () => {
  test('complete game flow', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to code discovery
    await page.click('text=Descobrir Código')
    await expect(page.locator('text=HF102')).toBeVisible()
    
    // Navigate to validation
    await page.click('text=Validar Código')
    
    // Test validation
    await page.fill('input[type="text"]', 'HF102')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=Excelente, detetives')).toBeVisible()
  })
})
EOF
```

## Development Commands Reference

### Primary Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Production build
npm run start           # Production server
npm run lint            # Run ESLint
npm run format          # Format with Prettier

# Testing
npm run test            # Run Jest tests
npm run test:watch      # Jest in watch mode
npm run test:coverage   # Generate coverage report
npm run e2e             # Run Playwright E2E tests

# Quality
npm run type-check      # TypeScript type checking
npm run quality         # Run all quality checks
```

### Git Commands

```bash
# Feature development
git status              # Check current state
git add .               # Stage changes
git commit -m "message" # Commit with message
git push origin 001-halloween-code-game  # Push to feature branch

# Quality checks
npm run quality         # Before committing
git log --oneline -5    # Review recent commits
```

## Troubleshooting

### Common Issues and Solutions

1. **Port 3000 already in use**
   ```bash
   lsof -ti:3000 | xargs kill -9
   npm run dev
   ```

2. **TypeScript errors**
   ```bash
   npm run type-check
   # Fix errors shown in output
   ```

3. **Test failures**
   ```bash
   npm run test:coverage
   # Review coverage report in coverage/ directory
   ```

4. **Linting errors**
   ```bash
   npm run lint -- --fix
   npm run format
   ```

5. **Build errors**
   ```bash
   rm -rf .next
   npm run build
   ```

## Next Steps

After completing this quickstart:

1. Verify all quality gates pass: `npm run quality`
2. Test the development server: `npm run dev`  
3. Run the test suite: `npm run test:coverage`
4. Begin implementing the first user story (code discovery page)
5. Follow TDD approach: write tests first, then implementation

The development environment is now ready for Halloween code game implementation with all constitutional compliance measures in place!