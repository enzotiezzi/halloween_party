// Code validation logic for Halloween game

import { MESSAGES, type FeedbackMessage } from './messages';

export interface ValidationResult {
  isValid: boolean;
  sanitizedInput: string;
  feedback: FeedbackMessage;
  attemptId: string;
  timestamp: Date;
  securityFlags: string[];
}

export interface SecurityCheck {
  isSafe: boolean;
  flags: string[];
  sanitizedValue: string;
}

export class ValidationService {
  private readonly SECRET_CODE = "HF102";
  private readonly MAX_INPUT_LENGTH = 50;
  private attemptCount = 0;

  /**
   * Validates the input code against the secret code
   */
  async validateCode(input: string): Promise<ValidationResult> {
    this.attemptCount++;
    
    const sanitized = this.sanitizeInput(input);
    const securityCheck = this.checkInputSafety(input);
    const isValid = sanitized === this.SECRET_CODE;
    
    const result: ValidationResult = {
      isValid,
      sanitizedInput: sanitized,
      feedback: this.generateFeedback(isValid),
      attemptId: this.generateAttemptId(),
      timestamp: new Date(),
      securityFlags: securityCheck.flags
    };

    // Log attempt for monitoring
    this.logAttempt(result);
    
    return result;
  }

  /**
   * Sanitizes user input by trimming whitespace and limiting length
   */
  sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
      return '';
    }
    
    return input
      .trim()
      .substring(0, this.MAX_INPUT_LENGTH)
      .replace(/[<>]/g, ''); // Basic XSS protection
  }

  /**
   * Normalizes input for comparison (case-sensitive for this game)
   */
  normalizeInput(input: string): string {
    return this.sanitizeInput(input);
  }

  /**
   * Checks input for security issues
   */
  checkInputSafety(input: string): SecurityCheck {
    const flags: string[] = [];
    let sanitizedValue = input;

    // Check for XSS attempts
    if (/<script|javascript:/i.test(input)) {
      flags.push('XSS_ATTEMPT');
    }

    // Check for SQL injection patterns (even though we don't use SQL)
    if (/('|"|`|;|\s+(or|and)\s+)/i.test(input)) {
      flags.push('SQL_INJECTION_PATTERN');
    }

    // Check for excessive length
    if (input.length > this.MAX_INPUT_LENGTH) {
      flags.push('EXCESSIVE_LENGTH');
    }

    // Check for null bytes
    if (input.includes('\0')) {
      flags.push('NULL_BYTE');
    }

    sanitizedValue = this.sanitizeInput(input);

    return {
      isSafe: flags.length === 0,
      flags,
      sanitizedValue
    };
  }

  /**
   * Generates feedback message based on validation result
   */
  private generateFeedback(isValid: boolean): FeedbackMessage {
    return isValid ? MESSAGES.SUCCESS : MESSAGES.ERROR;
  }

  /**
   * Generates unique attempt ID
   */
  private generateAttemptId(): string {
    return `attempt_${Date.now()}_${this.attemptCount}`;
  }

  /**
   * Logs validation attempt for monitoring
   */
  private logAttempt(result: ValidationResult): void {
    console.log(`[Halloween Game] Validation attempt:`, {
      attemptId: result.attemptId,
      timestamp: result.timestamp.toISOString(),
      isValid: result.isValid,
      securityFlags: result.securityFlags,
      // Don't log the actual input for security
    });

    // In production, this would send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'code_validation', {
        event_category: 'halloween_game',
        event_label: result.isValid ? 'success' : 'failure',
        custom_parameter_1: result.securityFlags.join(',')
      });
    }
  }

  /**
   * Gets the expected secret code (for testing purposes only)
   */
  getExpectedCode(): string {
    return this.SECRET_CODE;
  }

  /**
   * Resets attempt counter (for testing)
   */
  resetAttempts(): void {
    this.attemptCount = 0;
  }
}

// Export singleton instance
export const validationService = new ValidationService();

// Export types
export type { FeedbackMessage } from './messages';