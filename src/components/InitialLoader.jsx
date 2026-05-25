import { useEffect, useState } from 'react';
import './InitialLoader.css';
import appIcon from '../assets/Icono.png';

export default function InitialLoader({ onComplete }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Keep loader for 2 seconds, then fade out
    const timer = setTimeout(() => {
      setIsFading(true);
      // Wait for fade out animation to finish before unmounting
      setTimeout(() => {
        onComplete();
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`initial-loader ${isFading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <img src={appIcon} alt="Logo Rulas" className="loader-logo" />
        <h1 className="loader-title">Rulas</h1>
        <p className="loader-subtitle">El camino fue más bello porque lo recorrimos contigo.</p>
        <div className="loader-progress"></div>
      </div>
    </div>
  );
}
