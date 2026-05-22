import { useMemo } from 'react';
import './CarGallery.css';

export default function CarGallery({ onCarSelect }) {
  // Vite feature to import all images in a directory
  const images = useMemo(() => {
    const modules = import.meta.glob('../assets/img-tsuru/*.jpg', { eager: true, query: '?url', import: 'default' });
    return Object.keys(modules).map((key, index) => ({
      id: `tsuru-${index}`,
      src: modules[key],
      title: `Memoria ${index + 1}`
    }));
  }, []);

  const handleSelect = (car) => {
    // Only trigger View Transitions if supported
    if (!document.startViewTransition) {
      onCarSelect(car);
      return;
    }
    
    // The view transition magic happens here:
    // 1. Give the thumbnail a temporary unique view-transition-name
    const thumbnailEl = document.getElementById(`thumb-${car.id}`);
    if (thumbnailEl) {
      thumbnailEl.style.viewTransitionName = 'selected-car-img';
    }

    const transition = document.startViewTransition(() => {
      onCarSelect(car);
    });

    // Cleanup the transition name after it finishes
    transition.finished.finally(() => {
      if (thumbnailEl) {
        thumbnailEl.style.viewTransitionName = '';
      }
    });
  };

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2>La Colección</h2>
        <p>Un recorrido por su pasión, cada detalle cuenta una historia.</p>
      </div>
      
      <div className="gallery-grid">
        {images.map((car) => (
          <article 
            key={car.id} 
            className="gallery-card glass-panel"
            onClick={() => handleSelect(car)}
          >
            <div className="card-image-wrapper">
              <img 
                id={`thumb-${car.id}`}
                src={car.src} 
                alt={car.title} 
                className="card-image" 
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
