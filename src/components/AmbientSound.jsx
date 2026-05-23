import { useState, useEffect, useRef } from 'react';
import './AmbientSound.css';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const manuallyPausedRef = useRef(false);

  useEffect(() => {
    // Initialize the audio element with our local copyright-free track
    const audio = new Audio('/ambient.mp3');
    audio.loop = true;
    audio.volume = 0.25; // Warm, gentle background volume
    audioRef.current = audio;

    let hasStarted = false;

    const startAutoplay = async () => {
      if (manuallyPausedRef.current) return;
      if (hasStarted) return;

      try {
        await audio.play();
        setIsPlaying(true);
        hasStarted = true;
      } catch {
        console.warn('Autoplay blocked. Registering interaction listeners...');
        registerInteractionListeners();
      }
    };

    const handleInteraction = async () => {
      if (manuallyPausedRef.current) {
        cleanupListeners();
        return;
      }

      try {
        await audio.play();
        setIsPlaying(true);
        hasStarted = true;
        cleanupListeners();
      } catch (e) {
        console.error('Failed to play audio on user gesture:', e);
      }
    };

    const registerInteractionListeners = () => {
      document.addEventListener('click', handleInteraction, { once: true });
      document.addEventListener('keydown', handleInteraction, { once: true });
      document.addEventListener('touchstart', handleInteraction, { once: true });
      document.addEventListener('wheel', handleInteraction, { once: true });
      document.addEventListener('mousedown', handleInteraction, { once: true });
    };

    const cleanupListeners = () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('wheel', handleInteraction);
      document.removeEventListener('mousedown', handleInteraction);
    };

    startAutoplay();

    return () => {
      cleanupListeners();
      audio.pause();
    };
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      manuallyPausedRef.current = true;
    } else {
      manuallyPausedRef.current = false;
      audioRef.current.play().catch(err => {
        console.error('Failed to play audio on manual toggle:', err);
      });
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
