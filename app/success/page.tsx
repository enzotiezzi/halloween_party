'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MESSAGES } from '@/lib/messages';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-900/40 via-halloween-dark to-green-900/40">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Floating success elements */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{animationDelay: '0s'}}>🎯</div>
        <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-pulse" style={{animationDelay: '1s'}}>🔍</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-pulse" style={{animationDelay: '1.5s'}}>📜</div>
        
        {/* Confetti effect */}
        <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>⭐</div>
        <div className="absolute top-1/3 right-1/3 text-3xl animate-bounce" style={{animationDelay: '0.8s'}}>🌟</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl animate-pulse" style={{animationDelay: '1.2s'}}>✨</div>
        <div className="absolute bottom-1/4 right-1/4 text-4xl animate-pulse" style={{animationDelay: '0.6s'}}>💫</div>
        <div className="absolute top-1/2 left-1/2 text-2xl animate-spin" style={{animationDuration: '3s'}}>⚡</div>
      </div>

      {/* Main Content */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-12">
        <div className={cn(
          "max-w-4xl mx-auto text-center transition-all duration-1000 transform",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          
          {/* Success Icon */}
          <div className="mb-8 animate-bounce">
            <div className="text-9xl mb-4">🎉</div>
            <div className="text-7xl animate-spooky-glow">🕵️‍♂️✨</div>
          </div>

          {/* Success Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-green-400 mb-6 animate-text-flicker">
            CÓDIGO CORRETO!
          </h1>

          <p className="text-2xl md:text-3xl text-halloween-orange font-bold mb-8 animate-spooky-glow px-6 py-4 bg-halloween-orange/20 rounded-xl inline-block">
            Vocês decifraram o primeiro enigma com maestria!
          </p>

          {/* Message Box */}
          <div className={cn(
            "relative bg-black/70 p-10 md:p-12 rounded-2xl mb-8 mx-auto max-w-3xl",
            "border-4 border-green-400 shadow-2xl",
            "animate-success-glow"
          )}>
            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 text-5xl animate-bounce">🎯</div>
            <div className="absolute -top-4 -right-4 text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
            <div className="absolute -bottom-4 -left-4 text-5xl animate-pulse">🔍</div>
            <div className="absolute -bottom-4 -right-4 text-5xl animate-pulse" style={{animationDelay: '1s'}}>📜</div>

            <div className="relative z-10">
              <div className="text-7xl mb-6 animate-bounce">🔍📜</div>
              
              <p className="text-2xl md:text-3xl text-green-300 leading-relaxed font-bold mb-8">
                {MESSAGES.SUCCESS.text}
              </p>
              
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent my-8"></div>
              
              <p className="text-xl md:text-2xl text-yellow-300 font-semibold animate-text-flicker">
                Mas cuidado... este é apenas o começo do mistério...
              </p>
            </div>

            {/* Glowing border animation */}
            <div className="absolute inset-0 rounded-2xl border-4 border-green-400/50 animate-spooky-glow pointer-events-none"></div>
          </div>

          {/* Encouragement */}
          <div className="mb-10">
            <p className="text-2xl md:text-3xl text-halloween-orange font-bold animate-text-flicker mb-4">
              ✨ Os espíritos estão impressionados com sua dedução! ✨
            </p>
            <p className="text-xl text-green-300">
              Continue a investigação e desvende todos os segredos...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/validate"
              className={cn(
                'group px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300',
                'bg-halloween-orange text-black hover:bg-halloween-orange/90',
                'transform hover:scale-110 hover:-rotate-2',
                'focus:outline-none focus:ring-4 focus:ring-halloween-orange focus:ring-offset-2 focus:ring-offset-halloween-dark',
                'shadow-2xl hover:shadow-halloween-orange/50',
                'flex items-center gap-3'
              )}
            >
              <span className="text-3xl group-hover:animate-spin">🔄</span>
              <span>Tentar Outro Código</span>
            </Link>
            
            <Link
              href="/"
              className={cn(
                'group px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300',
                'bg-green-600 text-white hover:bg-green-700',
                'transform hover:scale-110 hover:rotate-2',
                'focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-halloween-dark',
                'shadow-2xl hover:shadow-green-500/50',
                'flex items-center gap-3'
              )}
            >
              <span className="text-3xl">🏠</span>
              <span>Voltar ao Início</span>
            </Link>
          </div>

          {/* Additional decorative text */}
          <div className="mt-12 text-gray-400 text-sm">
            <p className="animate-pulse">Os mistérios aguardam pelos verdadeiros detetives... 🕵️</p>
          </div>
        </div>
      </main>

      {/* Fullscreen Glowing Effect */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-green-500/10 via-transparent to-transparent animate-pulse" aria-hidden="true"></div>
    </div>
  );
}