# Client-Side Contracts: Halloween Code Game

**Feature**: Halloween Code Discovery Game  
**Date**: 2025-10-22  
**Contract Type**: TypeScript interfaces and component contracts

Since this Halloween code game is a client-side only application, these contracts define TypeScript interfaces, component APIs, and internal service contracts rather than traditional REST endpoints.

## Component Contracts

### Page Component Contracts

All page components follow consistent interface patterns for navigation and state management.

#### `/codigo` - Code Discovery Page

**Purpose**: Display the secret code "HF102" with Halloween theming

**Props Interface**:
```typescript
interface CodePageProps {
  // No external props - page manages own state
}
```

**Component Contract**:
```typescript
interface CodeDiscoveryContract {
  // Methods
  displaySecretCode(): void;
  trackCodeViewed(): void;
  updateGameProgress(): void;
  
  // State
  readonly secretCode: string; // "HF102"
  isCodeVisible: boolean;
  halloweenAnimations: boolean;
  
  // Events
  onCodeDiscovered: () => void;
  onNavigateToValidation: () => void;
}
```

**Accessibility Contract**:
```typescript
interface CodePageA11y {
  codeAriaLabel: string; // "Código secreto: HF102"
  pageTitle: string; // "Descobrir o Código Secreto"
  skipToMainContent: boolean;
}
```

#### `/validacao` - Code Validation Page

**Purpose**: Accept code input and provide Portuguese feedback

**Props Interface**:
```typescript
interface ValidationPageProps {
  // No external props - page manages own state
}
```

**Component Contract**:
```typescript
interface ValidationContract {
  // Methods
  validateInput(code: string): ValidationResult;
  displayFeedback(result: ValidationResult): void;
  resetForm(): void;
  
  // State
  currentInput: string;
  isValidating: boolean;
  lastResult: ValidationResult | null;
  
  // Events
  onValidationAttempt: (input: string) => void;
  onValidationSuccess: () => void;
  onValidationError: (error: string) => void;
}
```

### Component Interface Contracts

#### SecretCodeDisplay Component

**Purpose**: Render the secret code with Halloween styling

```typescript
interface SecretCodeDisplayProps {
  code: string;
  isVisible: boolean;
  theme: HalloweenTheme;
  onCodeRevealed?: () => void;
}

interface SecretCodeDisplayContract {
  // Methods
  reveal(): void;
  hide(): void;
  applyHalloweenEffects(): void;
  
  // State
  readonly displayCode: string;
  animationState: 'idle' | 'revealing' | 'revealed';
  
  // Accessibility
  ariaLabel: string;
  announceToScreenReader: boolean;
}
```

#### CodeInputForm Component

**Purpose**: Handle code input with validation feedback

```typescript
interface CodeInputFormProps {
  onSubmit: (code: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

interface CodeInputFormContract {
  // Methods
  validateInput(value: string): InputValidation;
  sanitizeInput(value: string): string;
  submitCode(): void;
  clearInput(): void;
  
  // State
  inputValue: string;
  isValid: boolean;
  errorMessage: string | null;
  isSubmitting: boolean;
  
  // Events
  onInputChange: (value: string) => void;
  onSubmit: (sanitizedValue: string) => void;
  onValidationError: (error: string) => void;
}
```

#### FeedbackMessage Component

**Purpose**: Display Portuguese success/error messages

```typescript
interface FeedbackMessageProps {
  message: FeedbackMessage;
  isVisible: boolean;
  onDismiss?: () => void;
}

interface FeedbackMessageContract {
  // Methods
  show(): void;
  hide(): void;
  autoHide(delay: number): void;
  
  // State
  readonly messageText: string;
  readonly messageType: 'success' | 'error';
  isVisible: boolean;
  displayDuration: number;
  
  // Styling
  getThemeStyles(): CSSProperties;
  getAnimationClass(): string;
}
```

## Service Contracts

### ValidationService Contract

**Purpose**: Handle all code validation business logic

```typescript
interface ValidationService {
  // Core validation
  validateCode(input: string): Promise<ValidationResult>;
  
  // Input processing
  sanitizeInput(input: string): string;
  normalizeInput(input: string): string;
  
  // Security
  checkInputSafety(input: string): SecurityCheck;
  rateLimitCheck(sessionId: string): RateLimitResult;
  
  // Metrics
  recordAttempt(attempt: ValidationAttempt): void;
  getAttemptHistory(sessionId: string): ValidationAttempt[];
}

interface ValidationResult {
  isValid: boolean;
  sanitizedInput: string;
  feedback: FeedbackMessage;
  attemptId: string;
  timestamp: Date;
  securityFlags: string[];
}

interface SecurityCheck {
  isSafe: boolean;
  flags: string[];
  sanitizedValue: string;
}

interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  resetTime: Date;
}
```

### GameStateService Contract

**Purpose**: Manage participant progress and session state

```typescript
interface GameStateService {
  // Session management
  initializeSession(): Promise<GameSession>;
  updateProgress(progress: GameProgress): void;
  completeGame(completionData: GameCompletion): void;
  
  // State persistence
  saveState(state: GameState): Promise<void>;
  loadState(sessionId: string): Promise<GameState | null>;
  clearState(): void;
  
  // Progress tracking
  trackCodeDiscovery(): void;
  trackValidationAttempt(attempt: ValidationAttempt): void;
  trackGameCompletion(completion: GameCompletion): void;
}

interface GameSession {
  sessionId: string;
  participantId: string;
  startTime: Date;
  currentProgress: GameProgress;
  isActive: boolean;
}

interface GameState {
  session: GameSession;
  codeSecret: CodeSecret;
  validationHistory: ValidationAttempt[];
  uiState: UIState;
}

interface GameCompletion {
  sessionId: string;
  completedAt: Date;
  totalAttempts: number;
  successfulValidation: ValidationAttempt;
  timeToComplete: number; // milliseconds
}
```

### HalloweenThemeService Contract

**Purpose**: Manage Halloween visual theming and animations

```typescript
interface HalloweenThemeService {
  // Theme management
  getCurrentTheme(): HalloweenTheme;
  applyTheme(theme: HalloweenTheme): void;
  
  // Animations
  startSpookyAnimations(): void;
  stopAnimations(): void;
  triggerScareEffect(): void;
  
  // Accessibility
  checkContrastRatio(foreground: string, background: string): number;
  generateAccessiblePalette(): ColorPalette;
  
  // Performance
  optimizeAnimations(): void;
  reduceMotionSupport(): boolean;
}

interface ColorPalette {
  primary: string;      // Orange (#ff6b35)
  secondary: string;    // Purple (#8b5cf6)
  background: string;   // Dark (#0a0a0a)
  text: string;        // Light gray (#f5f5f5)
  accent: string;      // Red (#dc2626)
}
```

## Data Transfer Objects

### Core DTOs

```typescript
// Input/Output for validation endpoint
interface ValidationRequest {
  code: string;
  sessionId: string;
  timestamp: Date;
}

interface ValidationResponse {
  success: boolean;
  message: FeedbackMessage;
  gameComplete: boolean;
  nextAction?: string;
}

// Progress tracking DTO
interface ProgressUpdate {
  sessionId: string;
  fromState: GameProgress;
  toState: GameProgress;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Error handling DTO
interface ErrorResponse {
  code: string;
  message: string;
  timestamp: Date;
  sessionId?: string;
  recoverable: boolean;
}
```

## Event Contracts

### Custom Events for Component Communication

```typescript
// Game events
interface GameEvent {
  type: string;
  sessionId: string;
  timestamp: Date;
  data: any;
}

interface CodeDiscoveredEvent extends GameEvent {
  type: 'code_discovered';
  data: {
    codeValue: string;
    discoveryTime: Date;
    pageUrl: string;
  };
}

interface ValidationAttemptEvent extends GameEvent {
  type: 'validation_attempt';
  data: {
    inputValue: string;
    isValid: boolean;
    attemptNumber: number;
  };
}

interface GameCompleteEvent extends GameEvent {
  type: 'game_complete';
  data: {
    completionTime: Date;
    totalAttempts: number;
    timeElapsed: number;
  };
}
```

## Error Handling Contracts

### Error Types and Recovery

```typescript
interface GameError extends Error {
  code: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoverable: boolean;
  userMessage: string;
  technicalDetails: string;
}

interface ValidationError extends GameError {
  inputValue: string;
  validationRule: string;
  suggestedFix?: string;
}

interface ThemeError extends GameError {
  themeProperty: string;
  fallbackValue: any;
}

// Error recovery contract
interface ErrorRecovery {
  canRecover(error: GameError): boolean;
  recoverFromError(error: GameError): Promise<boolean>;
  getFallbackState(): GameState;
  notifyUser(error: GameError): void;
}
```

## Performance Contracts

### Performance Monitoring

```typescript
interface PerformanceContract {
  // Timing measurements
  measureValidationTime(fn: () => any): Promise<TimingResult>;
  measurePageLoadTime(): PageLoadMetrics;
  measureComponentRenderTime(componentName: string): number;
  
  // Memory usage
  trackMemoryUsage(): MemoryMetrics;
  detectMemoryLeaks(): LeakDetection[];
  
  // User experience
  measureUserInteraction(interaction: string): InteractionMetrics;
  trackCoreWebVitals(): WebVitalsMetrics;
}

interface TimingResult {
  duration: number;
  success: boolean;
  timestamp: Date;
}

interface PageLoadMetrics {
  loadTime: number;
  renderTime: number;
  interactiveTime: number;
  resourceCount: number;
}

interface WebVitalsMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay  
  cls: number; // Cumulative Layout Shift
}
```

## Constitutional Compliance Contracts

### Quality Assurance Contracts

```typescript
interface QualityContract {
  // Code quality
  validateCodeQuality(): QualityReport;
  checkAccessibility(): A11yReport;
  verifyPerformance(): PerformanceReport;
  
  // Security
  scanForVulnerabilities(): SecurityReport;
  validateInputSecurity(): InputSecurityReport;
  
  // Testing
  runTestSuite(): TestResults;
  generateCoverageReport(): CoverageReport;
}

interface A11yReport {
  wcagLevel: 'A' | 'AA' | 'AAA';
  violations: A11yViolation[];
  score: number;
  recommendations: string[];
}

interface TestResults {
  totalTests: number;
  passed: number;
  failed: number;
  coverage: number;
  duration: number;
  failedTests: FailedTest[];
}
```

These contracts provide a complete specification for all component interactions, service interfaces, and data flows within the Halloween code game application. They ensure type safety, proper error handling, and constitutional compliance while maintaining the Halloween theme and Portuguese localization requirements.