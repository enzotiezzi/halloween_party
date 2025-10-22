'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MESSAGES } from '@/lib/messages';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const attempts = searchParams.get('attempts') || '1';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-900/40 via-halloween-dark to-red-900/40">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Floating spooky elements */}
        <div className="absolute top-10 left-10 text-6xl animate-text-flicker">💀</div>
        <div className="absolute top-20 right-20 text-5xl animate-text-flicker" style={{animationDelay: '0.5s'}}>👻</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-pulse" style={{animationDelay: '1s'}}>⚰️</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-pulse" style={{animationDelay: '1.5s'}}>🦇</div>
        
        {/* Additional spooky elements */}
        <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce" style={{animationDelay: '0.3s'}}>☠️</div>
        <div className="absolute top-1/3 right-1/3 text-3xl animate-text-flicker" style={{animationDelay: '0.8s'}}>🕷️</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl animate-pulse" style={{animationDelay: '1.2s'}}>🕸️</div>
        <div className="absolute bottom-1/4 right-1/4 text-4xl animate-text-flicker" style={{animationDelay: '0.6s'}}>🔮</div>
        <div className="absolute top-1/2 left-1/2 text-2xl animate-spin" style={{animationDuration: '5s'}}>💀</div>
      </div>

      {/* Main Content */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-12">
        <div className={cn(
          "max-w-4xl mx-auto text-center transition-all duration-1000 transform",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          
          {/* Error Icon */}
          <div className="mb-8 animate-pulse">
            <div className="text-9xl mb-4 animate-text-flicker">💀</div>
            <div className="text-7xl animate-text-flicker" style={{animationDelay: '0.3s'}}>👻🔮</div>
          </div>

          {/* Error Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-red-400 mb-6 animate-text-flicker">
            CÓDIGO INCORRETO
          </h1>

          <p className="text-2xl md:text-3xl text-red-300 font-bold mb-8 px-6 py-4 bg-red-900/30 rounded-xl inline-block border-2 border-red-500/50">
            As trevas se aproximam...
          </p>

          {/* Message Box */}
          <div className={cn(
            "relative bg-black/80 p-10 md:p-12 rounded-2xl mb-8 mx-auto max-w-3xl",
            "border-4 border-red-500 shadow-2xl shadow-red-900/50",
            "animate-spooky-glow"
          )}>
            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 text-5xl animate-text-flicker">💀</div>
            <div className="absolute -top-4 -right-4 text-5xl animate-text-flicker" style={{animationDelay: '0.5s'}}>👻</div>
            <div className="absolute -bottom-4 -left-4 text-5xl animate-pulse">⚰️</div>
            <div className="absolute -bottom-4 -right-4 text-5xl animate-pulse" style={{animationDelay: '1s'}}>🦇</div>

            <div className="relative z-10">
              <div className="text-7xl mb-6 animate-text-flicker">💀⚰️</div>
              
              <p className="text-3xl md:text-4xl text-red-300 leading-relaxed font-bold mb-8 animate-text-flicker tracking-wide">
                {MESSAGES.ERROR.text}
              </p>
              
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent my-8"></div>
              
              <p className="text-xl md:text-2xl text-orange-300 font-semibold">
                Os espíritos não estão satisfeitos... Tente novamente, se tiver coragem.
              </p>
            </div>

            {/* Glowing border animation */}
            <div className="absolute inset-0 rounded-2xl border-4 border-red-500/50 animate-spooky-glow pointer-events-none"></div>
          </div>

          {/* Attempts Counter */}
          {parseInt(attempts) > 1 && (
            <div className="mb-8 animate-pulse">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-red-900/40 rounded-xl border-2 border-red-500/50">
                <span className="text-4xl">💀</span>
                <div className="text-left">
                  <p className="text-sm text-red-400 uppercase tracking-wide">Tentativas Realizadas</p>
                  <p className="text-4xl font-bold text-red-300">{attempts}</p>
                </div>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="mb-10 animate-text-flicker">
            <p className="text-2xl md:text-3xl text-halloween-orange font-bold mb-4">
              ⚠️ O tempo está se esgotando... ⚠️
            </p>
            <p className="text-xl text-red-300">
              Concentre-se e tente novamente, detetive!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/validate"
              className={cn(
                'group px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300',
                'bg-red-600 text-white hover:bg-red-700',
                'transform hover:scale-110 hover:-rotate-2',
                'focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-halloween-dark',
                'shadow-2xl hover:shadow-red-500/50',
                'flex items-center gap-3 border-2 border-red-400'
              )}
            >
              <span className="text-3xl group-hover:animate-bounce">💀</span>
              <span>Tentar Novamente</span>
            </Link>
            
            <Link
              href="/"
              className={cn(
                'group px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300',
                'bg-transparent border-2 border-gray-500 text-gray-400 hover:border-gray-400 hover:text-white hover:bg-gray-800/50',
                'transform hover:scale-105',
                'focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-halloween-dark',
                'flex items-center gap-3'
              )}
            >
              <span className="text-3xl">🏠</span>
              <span>Voltar ao Início</span>
            </Link>
          </div>

          {/* Additional decorative text */}
          <div className="mt-12 text-gray-500 text-sm animate-pulse">
            <p>As sombras observam cada movimento... 👁️</p>
          </div>
        </div>
      </main>

      {/* Fullscreen Dark Effect */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-red-900/10 via-transparent to-transparent animate-pulse" aria-hidden="true"></div>
    </div>
  );
}