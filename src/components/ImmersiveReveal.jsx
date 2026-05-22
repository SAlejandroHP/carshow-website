import { useEffect, useRef } from 'react';
import './ImmersiveReveal.css';
import bgImage from '../assets/img-tsuru/tsuru-1.jpg';

export default function ImmersiveReveal() {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    // Check if CSS scroll-driven animations are supported
    const isSupported = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
    
    if (!isSupported && containerRef.current && imageWrapperRef.current) {
      // JS Fallback for browsers (like Firefox) that don't support it yet
      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const container = containerRef.current;
            if (container && imageWrapperRef.current) {
              const rect = container.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              
              let progress = (windowHeight - rect.top) / (windowHeight * 1.5);
              if (progress < 0) progress = 0;
              if (progress > 1) progress = 1;
              
              const rotateX = 60 - (60 * progress);
              const scale = 0.6 + (0.4 * progress);
              const translateY = 20 - (20 * progress);
              
              imageWrapperRef.current.style.transform = `translate3d(0, ${translateY}vh, 0) rotateX(${rotateX}deg) scale(${scale})`;
            }
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      // Initial call
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="immersive-reveal-container" ref={containerRef}>
      <div className="immersive-sticky-wrapper">
        
        <div className="immersive-image-wrapper" ref={imageWrapperRef}>
          <img src={bgImage} alt="El Tsuru de Rulas" className="immersive-img" />
          <div className="immersive-vignette"></div>
        </div>
        
        <div className="immersive-text-overlay">
          <h2 className="immersive-pretitle">EN MEMORIA DE JOSÉ PADRÓN "RULAS" (199X — 2026)</h2>
          <h1 className="immersive-title">Rulas</h1>
          <div className="scroll-indicator-reveal">
            <span>SCROLL</span>
            <div className="line"></div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
