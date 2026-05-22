import { useState, useEffect } from 'react';
import ImmersiveReveal from './components/ImmersiveReveal';
import VirtualJourney from './components/VirtualJourney';
import Gallery from './components/Gallery';
import DedicationWall from './components/DedicationWall';
import CarDetails from './components/CarDetails';
import AmbientSound from './components/AmbientSound';
import CustomCursor from './components/CustomCursor';
import InitialLoader from './components/InitialLoader';

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  const [scrollPos, setScrollPos] = useState(0);

  const handlePhotoSelect = (photo) => {
    setScrollPos(window.scrollY);
    setSelectedPhoto(photo);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedPhoto(null);
    setTimeout(() => {
      window.scrollTo({ top: scrollPos, behavior: 'instant' });
    }, 10);
  };

  return (
    <main className="app-container">
      {showLoader && <InitialLoader onComplete={() => setShowLoader(false)} />}
      <CustomCursor />
      <AmbientSound />
      
      <div className="view-landing" style={{ display: selectedPhoto ? 'none' : 'block' }}>
        <ImmersiveReveal />
        <VirtualJourney />
        <Gallery onPhotoSelect={handlePhotoSelect} />
        <DedicationWall />
      </div>

      {selectedPhoto && (
        <div className="view-details">
          <CarDetails car={selectedPhoto} onBack={handleBack} />
        </div>
      )}
    </main>
  );
}

export default App;
