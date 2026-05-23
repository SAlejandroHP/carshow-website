import { useMemo } from 'react';
import './Gallery.css';
import { galleryData } from '../data/tsuruData';

export default function Gallery({ onPhotoSelect }) {
  const images = useMemo(() => {
    // Skipping the first 2 images as they are used in Hero and Story
    const modules = import.meta.glob('../assets/img-tsuru/*.jpg', { eager: true, query: '?url', import: 'default' });
    const allImages = Object.keys(modules).map((key, index) => {
      const filename = key.substring(key.lastIndexOf('/') + 1);
      const data = galleryData[filename] || { title: `Archivo 0${index + 1}`, description: "Una memoria inmortalizada en el asfalto." };
      return {
        id: `tsuru-${index}`,
        src: modules[key],
        filename,
        title: data.title,
        description: data.description
      };
    });
    return allImages.slice(2);
  }, []);

  const handleSelect = (photo) => {
    if (!document.startViewTransition) {
      onPhotoSelect(photo);
      return;
    }
    
    const imgEl = document.getElementById(`gallery-img-${photo.id}`);
    if (imgEl) imgEl.style.viewTransitionName = 'selected-photo';

    const transition = document.startViewTransition(() => {
      onPhotoSelect(photo);
    });

    transition.finished.finally(() => {
      if (imgEl) imgEl.style.viewTransitionName = '';
    });
  };

  return (
    <section className="gallery-wrapper">
      <div className="gallery-header">
        <h2 className="gallery-title">ARCHIVO</h2>
      </div>
      
      <div className="gallery-layout">
        {images.map((photo, index) => {
          // Create an asymmetrical class based on index
          const layoutClass = `gallery-item size-${(index % 3) + 1}`;
          
          return (
            <article 
              key={photo.id} 
              className={layoutClass}
              onClick={() => handleSelect(photo)}
            >
              <div className="img-reveal-container">
                <img 
                  id={`gallery-img-${photo.id}`}
                  src={photo.src} 
                  alt={photo.title} 
                  loading="lazy" 
                />
                <div className="card-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="badge-icon">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <span>Leer Historia</span>
                </div>
              </div>
              <div className="photo-footer">
                <p className="photo-label">{photo.title}</p>
                <span className="photo-action">
                  Ver más
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
