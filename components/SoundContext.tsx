import React, { createContext, useContext, useState, useEffect } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClickSound: () => void;
  playSuccessSound: () => void;
  playHoverSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('oits_sound_effects');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    localStorage.setItem('oits_sound_effects', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const getAudioContext = () => {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        setAudioCtx(ctx);
        return ctx;
      }
      return null;
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext play ignored
    }
  };

  const playSuccessSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      
      // Dual tone chord
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.2);
      });
    } catch {
      // AudioContext play ignored
    }
  };

  const playHoverSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // AudioContext play ignored
    }
  };

  useEffect(() => {
    if (!soundEnabled) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, a, input[type="submit"], [role="button"]')) {
        playClickSound();
      }
    };

    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [soundEnabled, audioCtx]);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playClickSound, playSuccessSound, playHoverSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
