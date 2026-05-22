import './TributeHero.css';
import bgImage from '../assets/img-tsuru/tsuru-1.jpg'; // Using the first photo as background

export default function TributeHero() {
  return (
    <section className="hero-wrapper">
      <div className="hero-layer hero-background">
        <img src={bgImage} alt="Jose Padron's Tsuru" />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-layer hero-content">
        <h2 className="hero-subtitle">En Memoria de</h2>
        <h1 className="hero-title">Jose Padron</h1>
        <p className="hero-nickname">"Rulas"</p>
        
        <div className="scroll-indicator">
          <span>Descubre su legado</span>
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  );
}
