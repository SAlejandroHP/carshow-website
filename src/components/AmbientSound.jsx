import { useState, useEffect, useRef } from 'react';
import './AmbientSound.css';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
  };

  const playSound = () => {
    initAudio();
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.05; // Soft volume
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Frequencies for a nostalgic, melancholy chord progression (e.g. Cmaj7 -> Amin7)
    // C4, E4, G4, B4
    const frequencies = [261.63, 329.63, 392.00, 493.88];
    
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      // Gentle modulation for ambient pad feel
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + (idx * 0.05); // Slow modulation
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 5;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      
      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 3); // Slow attack
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      
      oscillatorsRef.current.push({ osc, oscGain, lfo });
    });
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); // Slow release
      
      setTimeout(() => {
        oscillatorsRef.current.forEach(({ osc, oscGain, lfo }) => {
          try {
            osc.stop();
            lfo.stop();
            osc.disconnect();
            oscGain.disconnect();
            lfo.disconnect();
          } catch (e) {
            // Ignore if already stopped
          }
        });
        oscillatorsRef.current = [];
      }, 2000);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      playSound();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      className={`ambient-sound-btn ${isPlaying ? 'playing' : ''}`} 
      onClick={toggleSound}
      aria-label={isPlaying ? 'Pausar sonido ambiental' : 'Reproducir sonido ambiental'}
      title="Sonido ambiental nostálgico"
    >
      <div className="bars">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </button>
  );
}
