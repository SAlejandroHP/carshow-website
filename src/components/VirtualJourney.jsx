import { useRef, useState, useEffect } from 'react';
import './VirtualJourney.css';
import { storyTexts } from '../data/tsuruData';

// We'll use some specific gallery images for the journey background
import img1 from '../assets/img-tsuru/tsuru-2.jpg';
import img2 from '../assets/img-tsuru/tsuru-4.jpg';
import img3 from '../assets/img-tsuru/tsuru-8.jpg';

const journeyImages = [img1, img2, img3];

export default function VirtualJourney() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor scroll position to update the timeline indicator
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const scrollLeft = scroller.scrollLeft;
      const width = scroller.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const scrollToStep = (idx) => {
    if (scrollerRef.current) {
      const width = scrollerRef.current.clientWidth;
      scrollerRef.current.scrollTo({
        left: width * idx,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="virtual-journey-wrapper">
      <div className="journey-header">
        <h2 className="journey-title">El Recorrido</h2>
        <p className="journey-subtitle">Arrastra o haz scroll para navegar por la historia</p>
      </div>

      <div className="journey-scroller" ref={scrollerRef}>
        {storyTexts.map((text, idx) => (
          <article className="journey-step" key={idx}>
            <div className="journey-bg">
              <img src={journeyImages[idx % journeyImages.length]} alt={`Etapa ${idx + 1}`} className="journey-img" />
              <div className="journey-overlay"></div>
            </div>
            
            <div className="journey-content">
              <div className="step-badge">Etapa {idx + 1}</div>
              <p className="step-text">"{text}"</p>
            </div>
          </article>
        ))}
      </div>

      <div className="journey-timeline">
        {storyTexts.map((_, idx) => (
          <button 
            key={idx} 
            className={`timeline-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToStep(idx)}
            aria-label={`Ir a etapa ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
