import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MESSAGES } from '@/lib/messages'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Halloween Party Code Game',
  description: 'Um jogo misterioso de códigos para a festa de Halloween. Descubra os segredos e desvende as pistas.',
  keywords: ['halloween', 'jogo', 'código', 'mistério', 'festa'],
  authors: [{ name: 'Halloween Party Team' }],
  openGraph: {
    title: 'Halloween Party Code Game',
    description: 'Um jogo misterioso de códigos para a festa de Halloween',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Halloween Party Code Game',
    description: 'Um jogo misterioso de códigos para a festa de Halloween',
  },
  robots: {
    index: false, // Don't index this party game
    follow: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="msapplication-TileColor" content="#ff6b35" />
        
        {/* Prevent zoom on iOS */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body 
        className={`${inter.className} min-h-screen bg-halloween-dark text-white antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-halloween-orange focus:text-black focus:rounded focus:font-bold"
          aria-label={MESSAGES.ACCESSIBILITY.SKIP_TO_MAIN}
        >
          {MESSAGES.NAVIGATION.SKIP_TO_MAIN}
        </a>

        {/* Main application container */}
        <div className="halloween-container min-h-screen flex flex-col">
          {/* Background Halloween effects */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="halloween-bg-pattern opacity-5"></div>
            <div className="halloween-floating-elements">
              {/* Animated background elements would go here */}
            </div>
          </div>

          {/* Main content wrapper */}
          <main 
            id="main-content" 
            className="relative flex-1 flex flex-col"
            role="main"
            aria-label={MESSAGES.ACCESSIBILITY.MAIN_CONTENT}
          >
            {children}
          </main>

          {/* Footer with Halloween credits */}
          <footer 
            className="relative mt-auto py-4 px-4 text-center text-sm text-gray-400 border-t border-halloween-orange/20"
            role="contentinfo"
            aria-label={MESSAGES.ACCESSIBILITY.FOOTER}
          >
            <p className="animate-text-flicker">
              👻 Halloween Party 2024 - Prepare-se para os sustos... 🎃
            </p>
          </footer>
        </div>

        {/* Screen reader announcements container */}
        <div 
          id="announcements" 
          aria-live="polite" 
          aria-atomic="true" 
          className="sr-only"
        ></div>

        {/* Development tools in development mode only */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100 transition-opacity">
            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded">
              Dev Mode
            </div>
          </div>
        )}

        {/* Halloween sound effects placeholder */}
        <div id="halloween-audio-container" className="sr-only" aria-hidden="true">
          {/* Audio elements would be dynamically inserted here */}
        </div>
      </body>
    </html>
  )
}