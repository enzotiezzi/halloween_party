'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { halloweenUtils } from '@/lib/utils';

interface HalloweenTheme {
  colors: {
    orange: string;
    purple: string;
    dark: string;
    darkGray: string;
    lightGray: string;
  };
  animations: {
    spookyGlow: string;
    textFlicker: string;
    fadeInUp: string;
  };
  sounds: {
    enabled: boolean;
    volume: number;
  };
  effects: {
    backgroundAnimation: boolean;
    particleEffects: boolean;
    screenReader: boolean;
  };
}

interface HalloweenThemeContextType {
  theme: HalloweenTheme;
  updateTheme: (updates: Partial<HalloweenTheme>) => void;
  toggleSounds: () => void;
  toggleEffects: (effect: keyof HalloweenTheme['effects']) => void;
  getRandomAnimation: () => string;
}

const defaultTheme: HalloweenTheme = {
  colors: halloweenUtils.getThemeColors(),
  animations: {
    spookyGlow: 'animate-spooky-glow',
    textFlicker: 'animate-text-flicker',
    fadeInUp: 'animate-fade-in-up'
  },
  sounds: {
    enabled: true,
    volume: 0.5
  },
  effects: {
    backgroundAnimation: true,
    particleEffects: true,
    screenReader: true
  }
};

const HalloweenThemeContext = createContext<HalloweenThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Partial<HalloweenTheme>;
}

export function HalloweenThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState<HalloweenTheme>(() => ({
    ...defaultTheme,
    ...initialTheme
  }));

  // Load saved theme preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('halloween-theme-preferences');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        setTheme(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to parse saved theme preferences:', error);
      }
    }
  }, []);

  // Save theme preferences when changed
  useEffect(() => {
    localStorage.setItem('halloween-theme-preferences', JSON.stringify(theme));
  }, [theme]);

  // Apply CSS custom properties for theme colors
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--halloween-${key}`, value);
    });
  }, [theme.colors]);

  const updateTheme = (updates: Partial<HalloweenTheme>) => {
    setTheme(prev => ({
      ...prev,
      ...updates,
      colors: { ...prev.colors, ...(updates.colors || {}) },
      animations: { ...prev.animations, ...(updates.animations || {}) },
      sounds: { ...prev.sounds, ...(updates.sounds || {}) },
      effects: { ...prev.effects, ...(updates.effects || {}) }
    }));
  };

  const toggleSounds = () => {
    setTheme(prev => ({
      ...prev,
      sounds: {
        ...prev.sounds,
        enabled: !prev.sounds.enabled
      }
    }));
  };

  const toggleEffects = (effect: keyof HalloweenTheme['effects']) => {
    setTheme(prev => ({
      ...prev,
      effects: {
        ...prev.effects,
        [effect]: !prev.effects[effect]
      }
    }));
  };

  const getRandomAnimation = () => {
    return halloweenUtils.getRandomAnimation();
  };

  const contextValue: HalloweenThemeContextType = {
    theme,
    updateTheme,
    toggleSounds,
    toggleEffects,
    getRandomAnimation
  };

  return (
    <HalloweenThemeContext.Provider value={contextValue}>
      <div 
        className="halloween-theme-root"
        data-halloween-sounds={theme.sounds.enabled}
        data-halloween-effects={theme.effects.backgroundAnimation}
        data-halloween-particles={theme.effects.particleEffects}
      >
        {children}
      </div>
    </HalloweenThemeContext.Provider>
  );
}

export function useHalloweenTheme(): HalloweenThemeContextType {
  const context = useContext(HalloweenThemeContext);
  if (!context) {
    throw new Error('useHalloweenTheme must be used within a HalloweenThemeProvider');
  }
  return context;
}

// Utility hook for theme-aware components
export function useHalloweenAnimation() {
  const { getRandomAnimation, theme } = useHalloweenTheme();
  
  const getAnimation = (type?: 'glow' | 'flicker' | 'fade') => {
    if (type) {
      switch (type) {
        case 'glow': return theme.animations.spookyGlow;
        case 'flicker': return theme.animations.textFlicker;
        case 'fade': return theme.animations.fadeInUp;
        default: return getRandomAnimation();
      }
    }
    return getRandomAnimation();
  };

  return { getAnimation };
}

// Theme-aware sound hook
export function useHalloweenSounds() {
  const { theme } = useHalloweenTheme();
  
  const playSound = (soundName: 'error' | 'success' | 'hover') => {
    if (theme.sounds.enabled) {
      halloweenUtils.playSpookySound(soundName);
    }
  };

  return { 
    playSound, 
    soundsEnabled: theme.sounds.enabled,
    volume: theme.sounds.volume
  };
}

// CSS-in-JS styles for theme
export const halloweenThemeStyles = {
  container: 'bg-halloween-dark text-white min-h-screen',
  card: 'bg-halloween-dark-gray border border-halloween-orange/30 rounded-lg p-6',
  button: {
    primary: 'bg-halloween-orange text-black hover:bg-halloween-orange/90 transition-colors',
    secondary: 'bg-transparent border-2 border-halloween-orange text-halloween-orange hover:bg-halloween-orange/10',
    ghost: 'text-halloween-orange hover:text-white hover:bg-halloween-orange/10'
  },
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300', 
    accent: 'text-halloween-orange',
    danger: 'text-red-400',
    success: 'text-green-400'
  },
  animations: {
    glow: 'animate-spooky-glow',
    flicker: 'animate-text-flicker',
    fadeIn: 'animate-fade-in-up'
  }
};