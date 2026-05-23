import { useEffect, useCallback } from 'react';
import './CarDetails.css';

export default function CarDetails({ car, onBack }) {
  // Accessibility: focus management on mount
  useEffect(() => {
    const heading = document.getElementById('details-heading');
    if (heading) {
      heading.focus();
    }
  }, []);

  const handleBack = useCallback(() => {
    if (!document.startViewTransition) {
      onBack();
      return;
    }
    
    // We want the image in the list view to receive the view-transition-name 
    // so it morphs back properly.
    const imgEl = document.getElementById(`gallery-img-${car.id}`);
    if (imgEl) imgEl.style.viewTransitionName = 'selected-photo';
    
    // Add back-transition class to HTML root for faster exit transition styles
    document.documentElement.classList.add('back-transition');
    
    const transition = document.startViewTransition(() => {
      onBack();
    });
    
    transition.finished.finally(() => {
      if (imgEl) imgEl.style.viewTransitionName = '';
      document.documentElement.classList.remove('back-transition');
    });
  }, [car.id, onBack]);

  // Close details view on swipe from left/right edges
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    const swipeThreshold = 50; // minimum horizontal distance
    const edgeThreshold = 100; // start near screen edges (in pixels)
    const maxDiffY = 50;       // maximum vertical distance to prevent vertical scroll triggers

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches.length !== 1) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = Math.abs(touchEndY - touchStartY);

      if (diffY < maxDiffY) {
        // Swipe left from right edge (moves finger right to left)
        const isSwipeLeft = diffX < -swipeThreshold && touchStartX > window.innerWidth - edgeThreshold;
        // Swipe right from left edge (moves finger left to right)
        const isSwipeRight = diffX > swipeThreshold && touchStartX < edgeThreshold;

        if (isSwipeLeft || isSwipeRight) {
          handleBack();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [car, onBack, handleBack]);

  return (
    <div className="details-container">
      <button className="back-button glass-panel" onClick={handleBack} aria-label="Volver a la galería">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Volver
      </button>

      <div className="details-content">
        <div className="details-image-container">
          {/* This image has the view-transition-name so it morphs from the thumbnail */}
          <img 
            src={car.src} 
            alt={car.title} 
            className="details-hero-image" 
          />
        </div>
        
        <div className="details-info glass-panel">
          <h2 id="details-heading" tabIndex="-1">Nissan Tsuru</h2>
          <h3 className="details-subtitle">{car.title}</h3>
          <p className="details-description">
            {car.description}
          </p>
        </div>
      </div>
    </div>
  );
}
