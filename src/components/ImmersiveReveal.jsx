import './ImmersiveReveal.css';
import bgImage from '../assets/img-tsuru/tsuru-1.jpg';

export default function ImmersiveReveal() {
  return (
    <section className="immersive-reveal-container">
      <div className="immersive-image-wrapper">
        <img src={bgImage} alt="El Tsuru de Rulas" className="immersive-img" />
        <div className="immersive-vignette"></div>
      </div>
      
      <div className="immersive-text-overlay">
        <h2 className="immersive-pretitle">EN MEMORIA DE JOSÉ PADRÓN GARCÍA "RULAS" <br /> <span style={{ whiteSpace: 'nowrap' }}>(1980 — 2016)</span></h2>
        <h1 className="immersive-title">Rulas</h1>
        <p className="immersive-invitation">Invitación a la ceremonia y al recorrido</p>
        <div className="immersive-event-info">
          <p className="event-date">Viernes 26 de Junio</p>
          <div className="event-details">
            <div className="event-row">
              <span className="event-label">Misa:</span>
              <span className="event-value">5:30 PM — Iglesia de Alcalá</span>
            </div>
            <div className="event-note">Duración de la misa: 1 hora aprox.</div>
            <div className="event-row caravan-row">
              <span className="event-label">Caravana:</span>
              <span className="event-value">Al terminar la misa</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator-reveal">
          <span>SCROLL</span>
          <div className="line"></div>
        </div>
      </div>
    </section>
  );
}
