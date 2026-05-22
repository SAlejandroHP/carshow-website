import { useEffect } from 'react';
import './CarDetails.css';

export default function CarDetails({ car, onBack }) {
  // Accessibility: focus management on mount
  useEffect(() => {
    const heading = document.getElementById('details-heading');
    if (heading) {
      heading.focus();
    }
  }, []);

  const handleBack = () => {
    if (!document.startViewTransition) {
      onBack();
      return;
    }
    
    // We want the image in the list view to receive the view-transition-name 
    // so it morphs back properly. We don't have to do it manually if we 
    // kept the ID on the image in the list view, but since the list view 
    // might be unmounted, we handle it in App.jsx or rely on React re-rendering 
    // it before the transition completes.
    
    const transition = document.startViewTransition(() => {
      onBack();
    });
    
    transition.finished.finally(() => {
      // Cleanup happens in CarGallery via useEffect or just not needed 
      // since we only apply it during the click. But to be safe, we remove any lingering.
      const el = document.getElementById(`thumb-${car.id}`);
      if (el) el.style.viewTransitionName = '';
    });
  };

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
