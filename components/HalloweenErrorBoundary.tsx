'use client';

import React, { Component, ReactNode } from 'react';
import { MESSAGES } from '@/lib/messages';
import { errorUtils } from '@/lib/utils';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
}

export class HalloweenErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error for monitoring
    errorUtils.logError(error, 'ErrorBoundary');
    
    this.setState({
      error,
      errorInfo
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      // Default Halloween-themed error UI
      return (
        <div className="halloween-error-boundary min-h-screen flex items-center justify-center px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-8">
              <div className="text-8xl mb-4 animate-text-flicker">💀</div>
              <h1 className="text-3xl font-bold text-halloween-orange mb-4">
                Algo Sinistro Aconteceu
              </h1>
              <p className="text-gray-300 mb-6">
                {errorUtils.getUserFriendlyError(this.state.error)}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.resetError}
                className="px-6 py-3 bg-halloween-orange text-black font-bold rounded-lg hover:bg-halloween-orange/90 transition-colors"
              >
                🔄 Tentar Novamente
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="block mx-auto px-4 py-2 text-halloween-orange hover:text-white transition-colors"
              >
                👻 Voltar ao Início
              </button>
            </div>

            {/* Error details for development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-black/50 p-4 rounded border border-red-500">
                <summary className="cursor-pointer text-red-400 font-mono">
                  Detalhes do Erro (Desenvolvimento)
                </summary>
                <pre className="mt-4 text-xs text-red-300 whitespace-pre-wrap">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default HalloweenErrorBoundary;