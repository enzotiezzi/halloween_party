import { Navigation } from '@/components/Navigation';
import { MESSAGES } from '@/lib/messages';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="halloween-home-page min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Halloween Welcome */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-text-flicker">
              <span className="text-halloween-orange">HF</span>
              <span className="text-white">102</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-2">
              {MESSAGES.HALLOWEEN_FLAVOR.WELCOME}
            </p>
            <p className="text-lg text-halloween-orange animate-spooky-glow">
              {MESSAGES.HALLOWEEN_FLAVOR.CODE_HINT}
            </p>
          </div>

          {/* Code Display Card */}
          <div className={cn(
            'halloween-code-card relative max-w-lg mx-auto mb-8 p-8 rounded-xl',
            'bg-gradient-to-br from-halloween-dark-gray to-black',
            'border-2 border-halloween-orange/50 shadow-2xl',
            'animate-fade-in-up'
          )}>
            {/* Decorative corners */}
            <div className="absolute top-2 left-2 text-halloween-orange text-2xl" aria-hidden="true">
              👻
            </div>
            <div className="absolute top-2 right-2 text-halloween-orange text-2xl" aria-hidden="true">
              🎃
            </div>
            <div className="absolute bottom-2 left-2 text-halloween-orange text-2xl" aria-hidden="true">
              🦇
            </div>
            <div className="absolute bottom-2 right-2 text-halloween-orange text-2xl" aria-hidden="true">
              💀
            </div>

            {/* Main Code Display */}
            <div className="relative z-10">
              <h2 
                className="text-2xl font-bold text-halloween-orange mb-4"
                id="code-display-title"
              >
                Código Descoberto
              </h2>
              
              <div 
                className={cn(
                  'code-display-container p-6 rounded-lg mb-4',
                  'bg-black/50 border border-halloween-orange/30',
                  'font-mono text-4xl font-bold tracking-widest'
                )}
                role="img"
                aria-labelledby="code-display-title"
                aria-describedby="code-description"
              >
                <span className="text-halloween-orange animate-spooky-glow">
                  HF102
                </span>
              </div>

              <p 
                id="code-description"
                className="text-sm text-gray-400 mb-6"
              >
                {MESSAGES.ACCESSIBILITY.CODE_DISPLAY}
              </p>

            </div>

            {/* Glowing border effect */}
            <div 
              className="absolute inset-0 rounded-xl border-2 border-halloween-orange/20 animate-spooky-glow"
              aria-hidden="true"
            ></div>
          </div>

          {/* Halloween Instructions */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-300 mb-4">
              Você descobriu um código misterioso! Agora é hora de validá-lo e descobrir 
              o que os detetives estão procurando...
            </p>
          </div>
        </div>
      </section>

      {/* Halloween Atmosphere Effects */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {/* Floating Halloween elements */}
        <div className="halloween-floating-bat absolute top-20 left-10 text-2xl animate-bounce" style={{animationDelay: '0s'}}>
          🦇
        </div>
        <div className="halloween-floating-bat absolute top-32 right-20 text-2xl animate-bounce" style={{animationDelay: '1s'}}>
          🦇
        </div>
        <div className="halloween-floating-ghost absolute top-40 left-1/4 text-2xl animate-pulse" style={{animationDelay: '2s'}}>
          👻
        </div>
        <div className="halloween-floating-pumpkin absolute bottom-32 right-10 text-2xl animate-spin" style={{animationDuration: '10s'}}>
          🎃
        </div>
      </div>
    </div>
  );
}