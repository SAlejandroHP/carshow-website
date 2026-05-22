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
        <p className="gallery-date">Fecha del Evento Conmemorativo: [Fecha]</p>
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
              </div>
              <p className="photo-label">{photo.title}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
