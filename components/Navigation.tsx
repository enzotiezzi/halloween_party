'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MESSAGES } from '@/lib/messages';
import { cn, halloweenUtils } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigationItems = [
    {
      href: '/',
      label: MESSAGES.NAVIGATION.CODE_PAGE,
      ariaLabel: 'Ir para página de descoberta do código',
      isActive: pathname === '/'
    },
    {
      href: '/validate',
      label: MESSAGES.NAVIGATION.VALIDATION_PAGE,
      ariaLabel: 'Ir para página de validação do código',
      isActive: pathname === '/validate'
    }
  ];

  if (!isClient) {
    return (
      <nav className={cn('halloween-nav-skeleton', className)} aria-hidden="true">
        <div className="animate-pulse bg-halloween-orange/20 h-10 w-32 rounded"></div>
        <div className="animate-pulse bg-halloween-orange/20 h-10 w-32 rounded"></div>
      </nav>
    );
  }

  return (
    <nav 
      className={cn(
        'halloween-navigation flex items-center justify-center gap-6 py-4 px-4',
        'border-b border-halloween-orange/30 backdrop-blur-sm',
        className
      )}
      role="navigation"
      aria-label={MESSAGES.ACCESSIBILITY.MAIN_CONTENT}
    >
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'halloween-nav-link relative px-6 py-3 rounded-lg font-medium transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-halloween-orange focus:ring-offset-2 focus:ring-offset-halloween-dark',
            'hover:bg-halloween-orange/10 hover:text-halloween-orange',
            'before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent',
            'hover:before:border-halloween-orange/50 hover:before:animate-spooky-glow',
            {
              'bg-halloween-orange text-black font-bold': item.isActive,
              'text-white hover:text-halloween-orange': !item.isActive,
              'animate-text-flicker': item.isActive
            }
          )}
          aria-label={item.ariaLabel}
          aria-current={item.isActive ? 'page' : undefined}
          onMouseEnter={() => halloweenUtils.playSpookySound('hover')}
        >
          <span className="relative z-10">
            {item.label}
          </span>
          
          {/* Active indicator */}
          {item.isActive && (
            <span 
              className="absolute -top-1 -right-1 w-3 h-3 bg-halloween-purple rounded-full animate-pulse"
              aria-hidden="true"
            />
          )}

          {/* Halloween decoration */}
          <span 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs opacity-60"
            aria-hidden="true"
          >
            {item.isActive ? '🎯' : '👻'}
          </span>
        </Link>
      ))}

      {/* Halloween atmosphere effect */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
        aria-hidden="true"
      >
        <div className="halloween-nav-mist opacity-20"></div>
      </div>
    </nav>
  );
}

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    isActive?: boolean;
  }>;
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav 
      className={cn('halloween-breadcrumb flex items-center gap-2 text-sm', className)}
      role="navigation"
      aria-label="Navegação estrutural"
    >
      <ol className="flex items-center gap-2" role="list">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2" role="listitem">
            {index > 0 && (
              <span className="text-halloween-orange/50" aria-hidden="true">
                👻
              </span>
            )}
            
            {item.href && !item.isActive ? (
              <Link
                href={item.href}
                className={cn(
                  'text-halloween-orange hover:text-white transition-colors',
                  'focus:outline-none focus:underline'
                )}
                onMouseEnter={() => halloweenUtils.playSpookySound('hover')}
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={cn(
                  'text-white',
                  { 'font-medium': item.isActive }
                )}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function BackButton({ 
  href, 
  onClick, 
  children, 
  className, 
  disabled = false 
}: BackButtonProps) {
  const buttonContent = (
    <span className="flex items-center gap-2">
      <span className="text-lg" aria-hidden="true">👻</span>
      {children || MESSAGES.NAVIGATION.BACK}
    </span>
  );

  const buttonClasses = cn(
    'halloween-back-button inline-flex items-center gap-2 px-4 py-2 rounded-lg',
    'bg-transparent border-2 border-halloween-orange/50 text-halloween-orange',
    'hover:bg-halloween-orange/10 hover:border-halloween-orange',
    'focus:outline-none focus:ring-2 focus:ring-halloween-orange focus:ring-offset-2 focus:ring-offset-halloween-dark',
    'transition-all duration-300 font-medium',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
    className
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onMouseEnter={() => halloweenUtils.playSpookySound('hover')}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      onMouseEnter={() => !disabled && halloweenUtils.playSpookySound('hover')}
    >
      {buttonContent}
    </button>
  );
}