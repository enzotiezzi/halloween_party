# Data Model: Aplicação de Festa de Halloween com Jogo de Código

**Feature**: Halloween Code Discovery Game  
**Date**: 2025-10-22  
**Phase**: Data modeling for client-side Halloween application

## Overview

This Halloween code game is a stateless client-side application with minimal data requirements. The data model focuses on user interaction state, validation logic, and UI component states rather than persistent storage.

## Core Entities

### CodeSecret

Represents the secret code that participants must discover.

**Attributes**:
- `value: string` - The secret code value ("HF102")
- `isVisible: boolean` - Whether the code is currently displayed to user
- `discoveredAt: Date | null` - Timestamp when user found the code (client-side only)

**Validation Rules**:
- Value must be exactly "HF102" (case-sensitive)
- Value is read-only constant
- Visibility controlled by page routing

**State Transitions**:
- Hidden → Visible (when user navigates to code discovery page)
- Visible → Memorized (when user navigates away from discovery page)

```typescript
interface CodeSecret {
  readonly value: string; // "HF102"
  isVisible: boolean;
  discoveredAt: Date | null;
}
```

### ValidationAttempt

Represents a single code validation attempt by a participant.

**Attributes**:
- `inputValue: string` - The code entered by the user
- `isValid: boolean` - Whether the input matches the secret code
- `attemptedAt: Date` - Timestamp of validation attempt
- `feedbackMessage: string` - Portuguese feedback message to display
- `feedbackType: 'success' | 'error'` - Type of feedback for styling

**Validation Rules**:
- Input value must be trimmed of whitespace
- Maximum length of 50 characters
- Case-sensitive comparison with secret code
- Empty input triggers validation error

**State Transitions**:
- Pending → Valid (when input equals "HF102")
- Pending → Invalid (when input differs from "HF102")
- Invalid → Pending (when user modifies input)

```typescript
interface ValidationAttempt {
  inputValue: string;
  isValid: boolean;
  attemptedAt: Date;
  feedbackMessage: string;
  feedbackType: 'success' | 'error';
}
```

### Participant

Represents the user playing the Halloween game.

**Attributes**:
- `sessionId: string` - Unique identifier for this play session
- `currentPage: 'home' | 'codigo' | 'validacao'` - Current page location
- `gameProgress: GameProgress` - Overall progress through the game
- `startedAt: Date` - When the participant began the game
- `completedAt: Date | null` - When the participant successfully validated code

**Relationships**:
- Has many ValidationAttempt instances
- Has one CodeSecret discovery state

```typescript
interface Participant {
  sessionId: string;
  currentPage: 'home' | 'codigo' | 'validacao';
  gameProgress: GameProgress;
  startedAt: Date;
  completedAt: Date | null;
}
```

### GameProgress

Enum representing the participant's progress through the Halloween mystery.

**Values**:
- `STARTED` - Participant has accessed the application
- `CODE_DISCOVERED` - Participant has viewed the secret code page
- `CODE_ENTERED` - Participant has attempted validation
- `MYSTERY_SOLVED` - Participant has successfully validated the code

```typescript
enum GameProgress {
  STARTED = 'started',
  CODE_DISCOVERED = 'code_discovered', 
  CODE_ENTERED = 'code_entered',
  MYSTERY_SOLVED = 'mystery_solved'
}
```

## UI State Models

### PageState

Manages the current page state and navigation context.

**Attributes**:
- `currentRoute: string` - Current Next.js route
- `isLoading: boolean` - Loading state for page transitions
- `halloweenTheme: HalloweenTheme` - Current theme configuration
- `navigationHistory: string[]` - Page navigation history

```typescript
interface PageState {
  currentRoute: string;
  isLoading: boolean;
  halloweenTheme: HalloweenTheme;
  navigationHistory: string[];
}
```

### HalloweenTheme

Configuration for the Halloween visual theme.

**Attributes**:
- `isDarkMode: boolean` - Always true for Halloween atmosphere
- `primaryColor: string` - Orange accent color (#ff6b35)
- `secondaryColor: string` - Purple highlight color (#8b5cf6)
- `backgroundColor: string` - Dark background color (#0a0a0a)
- `animationsEnabled: boolean` - Whether spooky animations are active

```typescript
interface HalloweenTheme {
  readonly isDarkMode: boolean; // Always true
  readonly primaryColor: string; // "#ff6b35"
  readonly secondaryColor: string; // "#8b5cf6" 
  readonly backgroundColor: string; // "#0a0a0a"
  animationsEnabled: boolean;
}
```

## Validation Logic Model

### ValidationRules

Encapsulates all code validation business logic.

**Methods**:
- `validateCode(input: string): ValidationResult`
- `sanitizeInput(input: string): string`
- `generateFeedback(isValid: boolean): FeedbackMessage`

```typescript
class ValidationRules {
  private readonly SECRET_CODE = "HF102";
  
  validateCode(input: string): ValidationResult {
    const sanitized = this.sanitizeInput(input);
    const isValid = sanitized === this.SECRET_CODE;
    return {
      isValid,
      sanitizedInput: sanitized,
      feedback: this.generateFeedback(isValid)
    };
  }
  
  private sanitizeInput(input: string): string {
    return input.trim().substring(0, 50);
  }
  
  private generateFeedback(isValid: boolean): FeedbackMessage {
    return isValid ? MESSAGES.SUCCESS : MESSAGES.ERROR;
  }
}
```

### FeedbackMessage

Portuguese messages for user feedback.

**Attributes**:
- `text: string` - The Portuguese message text
- `type: 'success' | 'error'` - Message type for styling
- `duration: number` - Display duration in milliseconds

```typescript
interface FeedbackMessage {
  text: string;
  type: 'success' | 'error';
  duration: number;
}
```

## Message Constants

### Portuguese Messages

All user-facing text stored as constants for consistency.

```typescript
const MESSAGES = {
  ERROR: {
    text: "SEU TEMPO ESTÁ ACABANDO, VOCÊ SERÁ O PRÓXIMO",
    type: 'error' as const,
    duration: 5000
  },
  SUCCESS: {
    text: "Excelente, detetives. Mas ainda há sombras a serem desmistificadas. Procurem o quadro do investigador — aquele que observa todos os rostos, mas nunca mostra o seu.",
    type: 'success' as const,
    duration: 8000
  },
  NAVIGATION: {
    HOME: "Início",
    CODE_PAGE: "Descobrir Código",
    VALIDATION_PAGE: "Validar Código"
  },
  ACCESSIBILITY: {
    CODE_DISPLAY: "Código secreto para o jogo de Halloween",
    INPUT_FIELD: "Campo para inserir o código descoberto",
    SUBMIT_BUTTON: "Validar código inserido"
  }
} as const;
```

## State Management

### Client-Side Storage

Since this is a simple game, state management uses React's built-in state management with sessionStorage for persistence across page refreshes.

**Storage Keys**:
- `halloween_game_session` - Participant session data
- `halloween_game_progress` - Current game progress
- `halloween_validation_history` - Previous validation attempts

**Data Persistence**:
- Session data persists until browser tab is closed
- No server-side storage required
- Privacy-friendly (no external data transmission)

### Component State Structure

```typescript
// App-level state context
interface GameContext {
  participant: Participant;
  codeSecret: CodeSecret;
  currentAttempt: ValidationAttempt | null;
  theme: HalloweenTheme;
  
  // Actions
  updateProgress: (progress: GameProgress) => void;
  submitValidation: (input: string) => ValidationAttempt;
  resetGame: () => void;
}
```

## Relationships and Data Flow

### Entity Relationships

- **Participant** 1:1 **GameProgress** (current state)
- **Participant** 1:many **ValidationAttempt** (attempt history)
- **Participant** 1:1 **CodeSecret** (discovery state)
- **ValidationAttempt** many:1 **ValidationRules** (business logic)

### Data Flow

1. **Game Start**: Participant created with STARTED progress
2. **Code Discovery**: Progress updates to CODE_DISCOVERED when user visits /codigo
3. **Validation Attempt**: New ValidationAttempt created when user submits code
4. **Success/Failure**: FeedbackMessage displayed based on ValidationResult
5. **Game Complete**: Progress updates to MYSTERY_SOLVED on successful validation

### Performance Considerations

- All data stored in memory (React state) for fast access
- SessionStorage backup prevents loss on page refresh
- Minimal data footprint (< 1KB per session)
- No network requests for validation (client-side only)

## Constitutional Compliance

### Observability

- All user interactions logged to console for debugging
- Performance metrics tracked for validation timing
- Error boundaries capture and log React errors

### Accessibility

- All entities include ARIA labels and descriptions
- Portuguese content properly structured for screen readers
- Color-blind friendly error/success indicators

### Performance

- Lightweight data structures minimize memory usage
- Validation logic optimized for <200ms execution
- State updates batched to prevent unnecessary re-renders

This data model supports the Halloween code game requirements while maintaining simplicity and constitutional compliance for code quality, performance, and accessibility standards.