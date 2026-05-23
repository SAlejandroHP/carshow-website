import { useState, useEffect } from 'react';
import './DedicationWall.css';
import { supabase } from '../lib/supabaseClient';
import DedicationForm from './DedicationForm';
import { fallbackDedications } from '../data/tsuruData';

export default function DedicationWall() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Touch gesture states for mobile swipe support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const handleNewDedication = (newMsg) => {
    setMessages(prev => {
      const updated = [...prev, newMsg];
      // Automatically navigate to the newly added dedication
      setCurrentIndex(updated.length - 1);
      return updated;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
  };

  // Swipe gesture handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && messages.length > 1) {
      handleNext();
    }
    if (isRightSwipe && messages.length > 1) {
      handlePrev();
    }
  };

  useEffect(() => {
    async function fetchDedications() {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('dedications')
            .select('*')
            .order('id', { ascending: true });
          
          if (error) throw error;
          
          if (data && data.length > 0) {
            setMessages(data);
          } else {
            setMessages(fallbackDedications);
          }
        } catch (error) {
          console.error("Error fetching dedications:", error);
          setMessages(fallbackDedications);
        }
      } else {
        setMessages(fallbackDedications);
      }
      setLoading(false);
    }
    
    fetchDedications();
  }, []);

  return (
    <section className="wall-wrapper">
      <div className="wall-header">
        <h2>DEDICATORIAS</h2>
        <p>MEMORIAS QUE QUEDAN EN EL ASFALTO</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Cargando memorias...</p>
      ) : (
        <div className="carousel-container">
          {messages.length > 0 ? (
            <>
              <div 
                className="carousel-slide-wrapper"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {(() => {
                  const currentMsg = messages[currentIndex];
                  const isFamily = currentMsg.is_family || currentMsg.isFamily;
                  return (
                    <article 
                      key={currentMsg.id} 
                      className={`message-card carousel-slide ${isFamily ? 'family-card' : ''}`}
                    >
                      {isFamily && <span className="family-badge">Familia</span>}
                      <p className="message-text">"{currentMsg.text}"</p>
                      <p className="message-author">— {currentMsg.author}</p>
                    </article>
                  );
                })()}
              </div>

              <div className="carousel-controls">
                {messages.length > 1 && (
                  <button onClick={handlePrev} className="carousel-btn prev-btn" aria-label="Anterior">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
                    </svg>
                  </button>
                )}

                <span className="carousel-counter">
                  {currentIndex + 1} / {messages.length}
                </span>

                {messages.length > 1 && (
                  <button onClick={handleNext} className="carousel-btn next-btn" aria-label="Siguiente">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
                    </svg>
                  </button>
                )}
              </div>
            </>
          ) : (
            <article className="message-card placeholder-card">
              <p className="message-text">"Aún no hay dedicatorias. ¡Comparte tu memoria abajo!"</p>
              <p className="message-author">— Sistema</p>
            </article>
          )}
        </div>
      )}
      
      <DedicationForm onDedicationAdded={handleNewDedication} />
    </section>
  );
}
