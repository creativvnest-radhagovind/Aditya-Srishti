import { Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// Raga Bhupali (Pentatonic auspicious Indian scale in C4: Sa, Re, Ga, Pa, Dha, Sa')
interface MelodyNote {
  freq: number; // 0 represents a serene breath pause
  duration: number; // seconds
  glide?: number; // portamento time in seconds
}

const BHUPALI_PHRASES: MelodyNote[] = [
  // Phrase 1: Gentle Alap ascent (Sa - Re - Ga - Pa)
  { freq: 261.63, duration: 1.4 },
  { freq: 293.66, duration: 0.9, glide: 0.14 },
  { freq: 329.63, duration: 1.6, glide: 0.16 },
  { freq: 392.0, duration: 1.8, glide: 0.18 },
  { freq: 0, duration: 0.8 },

  // Phrase 2: Mangal phrase (Ga - Pa - Dha - Sa' - Dha - Pa)
  { freq: 329.63, duration: 0.8 },
  { freq: 392.0, duration: 0.9, glide: 0.12 },
  { freq: 440.0, duration: 1.2, glide: 0.14 },
  { freq: 523.25, duration: 1.9, glide: 0.18 },
  { freq: 440.0, duration: 0.9, glide: 0.14 },
  { freq: 392.0, duration: 1.6, glide: 0.16 },
  { freq: 0, duration: 0.9 },

  // Phrase 3: Upper ornamental turn (Pa - Dha - Sa' - Re' - Sa' - Dha - Pa)
  { freq: 392.0, duration: 0.85 },
  { freq: 440.0, duration: 0.9, glide: 0.12 },
  { freq: 523.25, duration: 1.1, glide: 0.14 },
  { freq: 587.33, duration: 1.3, glide: 0.14 },
  { freq: 523.25, duration: 1.1, glide: 0.15 },
  { freq: 440.0, duration: 1.0, glide: 0.14 },
  { freq: 392.0, duration: 1.6, glide: 0.18 },
  { freq: 0, duration: 1.0 },

  // Phrase 4: Peaceful descent back to Sa (Ga - Re - Sa - low Dha - Sa)
  { freq: 329.63, duration: 1.0 },
  { freq: 293.66, duration: 1.0, glide: 0.14 },
  { freq: 261.63, duration: 1.4, glide: 0.16 },
  { freq: 220.0, duration: 1.1, glide: 0.16 },
  { freq: 261.63, duration: 2.4, glide: 0.2 },
  { freq: 0, duration: 1.4 },
];

const TARGET_GAIN = 0.22;

export function WeddingAudioPlayer() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const melodyBusRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const noteIdxRef = useRef(0);
  const activeOscRef = useRef<OscillatorNode | null>(null);
  const activeHarmonicRef = useRef<OscillatorNode | null>(null);
  const activeEnvRef = useRef<GainNode | null>(null);
  const isMutedRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const scheduleNextNote = useCallback(() => {
    const ctx = ctxRef.current;
    const melodyBus = melodyBusRef.current;
    if (!ctx || !melodyBus || ctx.state !== 'running') return;

    const note = BHUPALI_PHRASES[noteIdxRef.current];
    noteIdxRef.current = (noteIdxRef.current + 1) % BHUPALI_PHRASES.length;

    const now = ctx.currentTime;

    if (note.freq > 0) {
      // Create or glide Bansuri flute voice
      if (
        !activeOscRef.current ||
        !activeHarmonicRef.current ||
        !activeEnvRef.current
      ) {
        const osc = ctx.createOscillator();
        const harmonic = ctx.createOscillator();
        const harmonicGain = ctx.createGain();
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        const fluteFilter = ctx.createBiquadFilter();
        const noteEnv = ctx.createGain();

        osc.type = 'sine';
        harmonic.type = 'triangle';
        harmonicGain.gain.value = 0.12;

        vibrato.type = 'sine';
        vibrato.frequency.value = 4.6;
        vibratoGain.gain.value = 2.8;

        fluteFilter.type = 'lowpass';
        fluteFilter.frequency.value = 1350;
        fluteFilter.Q.value = 0.7;

        noteEnv.gain.setValueAtTime(0.0001, now);

        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        vibratoGain.connect(harmonic.frequency);

        osc.connect(fluteFilter);
        harmonic.connect(harmonicGain);
        harmonicGain.connect(fluteFilter);
        fluteFilter.connect(noteEnv);
        noteEnv.connect(melodyBus);

        osc.frequency.setValueAtTime(note.freq, now);
        harmonic.frequency.setValueAtTime(note.freq * 2, now);

        osc.start(now);
        harmonic.start(now);
        vibrato.start(now);

        activeOscRef.current = osc;
        activeHarmonicRef.current = harmonic;
        activeEnvRef.current = noteEnv;
      }

      const osc = activeOscRef.current;
      const harmonic = activeHarmonicRef.current;
      const env = activeEnvRef.current;

      const glideTime = note.glide ?? 0.08;
      osc.frequency.cancelScheduledValues(now);
      osc.frequency.setTargetAtTime(note.freq, now, glideTime * 0.45);

      harmonic.frequency.cancelScheduledValues(now);
      harmonic.frequency.setTargetAtTime(note.freq * 2, now, glideTime * 0.45);

      // Gentle breath swell envelope
      env.gain.cancelScheduledValues(now);
      env.gain.setTargetAtTime(0.32, now, 0.16);
      if (note.duration > 0.6) {
        env.gain.setTargetAtTime(0.22, now + note.duration * 0.65, 0.25);
      }
    } else if (activeEnvRef.current) {
      // Soft breath pause between phrases
      activeEnvRef.current.gain.cancelScheduledValues(now);
      activeEnvRef.current.gain.setTargetAtTime(0.0001, now, 0.18);
    }

    timerRef.current = window.setTimeout(scheduleNextNote, note.duration * 1000);
  }, []);

  const initAudioEngine = useCallback(async () => {
    if (ctxRef.current) {
      if (ctxRef.current.state === 'suspended' && !isMutedRef.current) {
        await ctxRef.current.resume();
        setIsPlaying(true);
        if (!timerRef.current) {
          scheduleNextNote();
        }
      }
      return;
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(isMutedRef.current ? 0.0001 : TARGET_GAIN, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Warm Courtyard Reverb / Echo Bus for Bansuri
    const melodyBus = ctx.createGain();
    melodyBus.gain.value = 1.0;

    const delay = ctx.createDelay(1.0);
    delay.delayTime.value = 0.36;

    const feedback = ctx.createGain();
    feedback.gain.value = 0.3;

    const echoFilter = ctx.createBiquadFilter();
    echoFilter.type = 'lowpass';
    echoFilter.frequency.value = 950;

    melodyBus.connect(masterGain);
    melodyBus.connect(delay);
    delay.connect(echoFilter);
    echoFilter.connect(feedback);
    feedback.connect(delay);
    echoFilter.connect(masterGain);
    melodyBusRef.current = melodyBus;

    // Soft Tanpura Drone (Sa - Pa - Sa)
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 340;

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.14;
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    const droneNotes = [
      { freq: 130.81, type: 'triangle' as OscillatorType, level: 0.35 }, // C3 Sa
      { freq: 196.0, type: 'sine' as OscillatorType, level: 0.25 }, // G3 Pa
      { freq: 261.63, type: 'sine' as OscillatorType, level: 0.15 }, // C4 Sa
    ];

    droneNotes.forEach((d) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = d.type;
      osc.frequency.value = d.freq;
      g.gain.value = d.level;
      osc.connect(g);
      g.connect(droneFilter);
      osc.start();
    });

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (!isMutedRef.current) {
      setIsPlaying(true);
      scheduleNextNote();
    }
  }, [scheduleNextNote]);

  // Start hidden audio automatically on the user's very first interaction anywhere on the page
  useEffect(() => {
    if (hasInteracted) return;

    const handleFirstInteraction = () => {
      setHasInteracted(true);
      void initAudioEngine();
    };

    window.addEventListener('pointerdown', handleFirstInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener('keydown', handleFirstInteraction, {
      once: true,
      passive: true,
    });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted, initAudioEngine]);

  // Handle tab visibility politely
  useEffect(() => {
    const onVisibilityChange = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      if (document.hidden && ctx.state === 'running') {
        void ctx.suspend();
      } else if (!document.hidden && !isMutedRef.current && hasInteracted) {
        void ctx.resume();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [hasInteracted]);

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (ctxRef.current) {
        void ctxRef.current.close();
      }
    };
  }, []);

  const toggleMute = async () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    isMutedRef.current = nextMuted;

    if (!hasInteracted) {
      setHasInteracted(true);
    }

    if (!ctxRef.current) {
      await initAudioEngine();
      return;
    }

    const ctx = ctxRef.current;
    const masterGain = masterGainRef.current;
    if (!masterGain) return;

    const now = ctx.currentTime;
    if (nextMuted) {
      masterGain.gain.setTargetAtTime(0.0001, now, 0.12);
      setIsPlaying(false);
    } else {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      masterGain.gain.setTargetAtTime(TARGET_GAIN, now, 0.18);
      setIsPlaying(true);
      if (!timerRef.current) {
        scheduleNextNote();
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Hidden accessible audio status region */}
      <span className="sr-only" aria-live="polite">
        {isPlaying && !isMuted
          ? 'मंगल बाँसुरी संगीत बज रहा है'
          : 'मंगल संगीत म्यूट है'}
      </span>

      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => void toggleMute()}
        aria-pressed={!isMuted}
        aria-label={isMuted ? 'मंगल संगीत चालू करें' : 'मंगल संगीत म्यूट करें'}
        title={isMuted ? 'संगीत चालू करें (Unmute)' : 'संगीत बंद करें (Mute)'}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded bg-[#FCFBF8]/95 backdrop-blur-md border border-[#4D5736]/35 text-[#4D5736] shadow-[0_10px_28px_-10px_rgba(34,40,24,0.28)] hover:bg-[#E2EBE3] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D5736]"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-[#5F6655] shrink-0" />
            <span className="text-xs font-ui font-medium text-[#5F6655]">
              म्यूट
            </span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-[#4D5736] shrink-0" />
            <span className="text-xs font-ui font-medium text-[#4D5736]">
              {isPlaying ? 'मंगल ध्वनि' : 'संगीत'}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
