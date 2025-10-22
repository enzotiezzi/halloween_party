'use client';

import { useState, useRef, useEffect } from 'react';
import { Navigation, BackButton } from '@/components/Navigation';
import { MESSAGES } from '@/lib/messages';
import { validationService, type ValidationResult } from '@/lib/validation';
import { cn, a11yUtils, performanceUtils, debounce } from '@/lib/utils';

interface ValidationPageProps {}

export default function ValidationPage({}: ValidationPageProps) {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Performance monitoring
  const measureValidation = useRef<(() => void) | null>(null);

  // Debounced input validation
  const debouncedValidation = debounce(async (inputCode: string) => {
    if (inputCode.trim() && inputCode !== validationService.getExpectedCode()) {
      // Preview validation without counting as attempt
      const previewResult = await validationService.validateCode(inputCode);
      // Don't store result, just show real-time feedback
    }
  }, 500);

  useEffect(() => {
    // Focus input on mount for accessibility
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);
    
    // Clear previous results on change
    if (validationResult) {
      setValidationResult(null);
    }

    // Debounced validation for UX
    debouncedValidation(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      a11yUtils.announce('Por favor, digite um código antes de validar', 'assertive');
      return;
    }

    setIsValidating(true);
    measureValidation.current = performanceUtils.measurePerformance('code_validation');

    try {
      const result = await validationService.validateCode(code);
      setValidationResult(result);
      setAttempts(prev => prev + 1);

      // Announce result to screen readers
      const announcement = result.isValid 
        ? `Código válido! ${MESSAGES.SUCCESS.text}`
        : `Código inválido. ${MESSAGES.ERROR.text}`;
      
      a11yUtils.announce(announcement, 'assertive');

      // Measure performance
      if (measureValidation.current) {
        measureValidation.current();
      }

    } catch (error) {
      console.error('Validation error:', error);
      a11yUtils.announce('Erro ao validar código. Tente novamente.', 'assertive');
      
      setValidationResult({
        isValid: false,
        sanitizedInput: code,
        feedback: MESSAGES.ERROR,
        attemptId: `error_${Date.now()}`,
        timestamp: new Date(),
        securityFlags: ['VALIDATION_ERROR']
      });
    } finally {
      setIsValidating(false);
    }
  };

  const resetForm = () => {
    setCode('');
    setValidationResult(null);
    validationService.resetAttempts();
    setAttempts(0);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    a11yUtils.announce('Formulário limpo. Campo pronto para novo código.', 'polite');
  };

  return (
    <div className="halloween-validation-page min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg mx-auto w-full">
          
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-halloween-orange mb-2 animate-text-flicker">
              Validação do Código
            </h1>
            <p className="text-gray-300">
              {MESSAGES.HALLOWEEN_FLAVOR.VALIDATION_PROMPT}
            </p>
          </div>

          {/* Validation Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={cn(
              'halloween-form-card p-6 rounded-xl',
              'bg-gradient-to-br from-halloween-dark-gray to-black',
              'border-2 border-halloween-orange/50 shadow-2xl',
              'animate-fade-in-up'
            )}>
              
              {/* Input Field */}
              <div className="mb-6">
                <label 
                  htmlFor="code-input"
                  className="block text-sm font-medium text-halloween-orange mb-2"
                >
                  Código Secreto
                </label>
                <input
                  ref={inputRef}
                  id="code-input"
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder={MESSAGES.PLACEHOLDERS.CODE_INPUT}
                  disabled={isValidating}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg font-mono text-lg',
                    'bg-black/50 border-2 text-white placeholder-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-halloween-orange focus:border-transparent',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'transition-all duration-200',
                    {
                      'border-halloween-orange/50': !validationResult,
                      'border-green-500 bg-green-500/10': validationResult?.isValid,
                      'border-red-500 bg-red-500/10': validationResult && !validationResult.isValid,
                    }
                  )}
                  aria-describedby="code-input-help code-input-status"
                  aria-invalid={validationResult ? !validationResult.isValid : undefined}
                  maxLength={50}
                  autoComplete="off"
                  spellCheck={false}
                />
                <p id="code-input-help" className="mt-2 text-sm text-gray-400">
                  {MESSAGES.ACCESSIBILITY.INPUT_FIELD}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isValidating || !code.trim()}
                className={cn(
                  'w-full px-6 py-3 rounded-lg font-bold text-lg',
                  'bg-halloween-orange text-black',
                  'hover:bg-halloween-orange/90 hover:scale-105',
                  'focus:outline-none focus:ring-4 focus:ring-halloween-orange focus:ring-offset-2 focus:ring-offset-halloween-dark',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                  'transition-all duration-300 transform flex items-center justify-center gap-2'
                )}
                aria-describedby="submit-button-help"
              >
                {isValidating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
                    <span>{MESSAGES.HALLOWEEN_FLAVOR.LOADING}</span>
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    <span>{MESSAGES.BUTTONS.VALIDATE}</span>
                  </>
                )}
              </button>
              <p id="submit-button-help" className="mt-2 text-xs text-gray-500">
                {MESSAGES.ACCESSIBILITY.SUBMIT_BUTTON}
              </p>
            </div>

            {/* Validation Result */}
            {validationResult && (
              <div 
                className={cn(
                  'halloween-result-card p-6 rounded-xl border-2 animate-fade-in-up',
                  {
                    'bg-green-900/20 border-green-500': validationResult.isValid,
                    'bg-red-900/20 border-red-500': !validationResult.isValid,
                  }
                )}
                role="alert"
                aria-live="assertive"
                id="code-input-status"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">
                    {validationResult.isValid ? '🎯' : '💀'}
                  </span>
                  <div className="flex-1">
                    <h3 className={cn(
                      'font-bold text-lg mb-2',
                      {
                        'text-green-400': validationResult.isValid,
                        'text-red-400': !validationResult.isValid,
                      }
                    )}>
                      {validationResult.isValid ? 'Código Correto!' : 'Código Incorreto'}
                    </h3>
                    <p className="text-white mb-4">
                      {validationResult.feedback.text}
                    </p>
                    
                    {/* Success Actions */}
                    {validationResult.isValid && (
                      <div className="flex gap-3">
                        <button
                          onClick={resetForm}
                          className="px-4 py-2 bg-halloween-orange/20 text-halloween-orange rounded hover:bg-halloween-orange/30 transition-colors"
                        >
                          {MESSAGES.BUTTONS.RESET}
                        </button>
                      </div>
                    )}
                    
                    {/* Error Actions */}
                    {!validationResult.isValid && (
                      <div className="flex gap-3">
                        <button
                          onClick={resetForm}
                          className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                        >
                          {MESSAGES.BUTTONS.TRY_AGAIN}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Attempt Counter */}
                {attempts > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-400">
                    Tentativas: {attempts}
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Halloween Atmosphere */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Os detetives estão aguardando... 👻</p>
          </div>
        </div>
      </main>

      {/* Floating Halloween Effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-10 text-3xl animate-pulse" style={{animationDelay: '0s'}}>
          🔍
        </div>
        <div className="absolute bottom-20 left-10 text-2xl animate-bounce" style={{animationDelay: '2s'}}>
          💀
        </div>
        <div className="absolute top-1/2 right-20 text-xl animate-spin" style={{animationDuration: '8s'}}>
          🦇
        </div>
      </div>
    </div>
  );
}