// Utility functions for Halloween theme and accessibility

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID with optional prefix
 */
export function generateId(prefix = 'id'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Debounce function for input handling
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Formats date for Portuguese locale
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Halloween theme utilities
 */
export const halloweenUtils = {
  /**
   * Gets a random Halloween animation class
   */
  getRandomAnimation(): string {
    const animations = [
      'animate-spooky-glow',
      'animate-text-flicker',
      'animate-fade-in-up'
    ];
    
    return animations[Math.floor(Math.random() * animations.length)];
  },

  /**
   * Gets Halloween theme colors
   */
  getThemeColors() {
    return {
      orange: '#ff6b35',
      purple: '#8b5cf6',
      dark: '#0a0a0a',
      darkGray: '#1a1a1a',
      lightGray: '#f5f5f5'
    };
  },

  /**
   * Generates spooky sound effect trigger
   */
  playSpookySound(soundName: 'error' | 'success' | 'hover' = 'hover'): void {
    // In a real app, this would play actual sound effects
    console.log(`[Halloween SFX] Playing ${soundName} sound`);
    
    // Placeholder for actual audio implementation
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      // Audio implementation would go here
    }
  }
};

/**
 * Accessibility utilities
 */
export const a11yUtils = {
  /**
   * Announces message to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (typeof window === 'undefined') return;

    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.setAttribute('class', 'sr-only');
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  /**
   * Manages focus for keyboard navigation
   */
  trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };
    
    element.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  /**
   * Gets ARIA description for Halloween elements
   */
  getHalloweenAriaLabel(elementType: 'code-input' | 'success-message' | 'error-message' | 'navigation'): string {
    const labels = {
      'code-input': 'Digite o código secreto do Halloween. Campo obrigatório.',
      'success-message': 'Código correto! Mensagem de sucesso com próxima pista.',
      'error-message': 'Código incorreto. Mensagem de erro assombrada.',
      'navigation': 'Navegação principal do jogo de Halloween'
    };
    
    return labels[elementType];
  }
};

/**
 * Performance utilities
 */
export const performanceUtils = {
  /**
   * Lazy loading utility for images
   */
  observeImage(img: HTMLImageElement): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.src = image.dataset.src || '';
            image.classList.remove('lazy');
            imageObserver.unobserve(image);
          }
        });
      });
      
      imageObserver.observe(img);
    } else {
      // Fallback for older browsers
      img.src = img.dataset.src || '';
    }
  },

  /**
   * Measures performance timing
   */
  measurePerformance(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
      
      // In production, send to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'timing_complete', {
          name: name,
          value: Math.round(duration)
        });
      }
    };
  }
};

/**
 * Error handling utilities
 */
export const errorUtils = {
  /**
   * Logs error with context
   */
  logError(error: Error, context: string): void {
    console.error(`[Halloween Game Error] ${context}:`, error);
    
    // In production, send to error tracking service
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        tags: { context },
        extra: { timestamp: new Date().toISOString() }
      });
    }
  },

  /**
   * Creates user-friendly error message
   */
  getUserFriendlyError(error: Error): string {
    const errorMap: Record<string, string> = {
      'NetworkError': 'Erro de conexão. Verifique sua internet.',
      'ValidationError': 'Dados inválidos fornecidos.',
      'TimeoutError': 'Operação expirou. Tente novamente.',
      'SecurityError': 'Erro de segurança detectado.'
    };
    
    return errorMap[error.name] || 'Algo deu errado. Tente novamente.';
  }
};

/**
 * Local storage utilities with error handling
 */
export const storageUtils = {
  /**
   * Safely gets item from localStorage
   */
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get localStorage item: ${key}`, error);
      return null;
    }
  },

  /**
   * Safely sets item in localStorage
   */
  setItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Failed to set localStorage item: ${key}`, error);
      return false;
    }
  },

  /**
   * Safely removes item from localStorage
   */
  removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove localStorage item: ${key}`, error);
      return false;
    }
  }
};