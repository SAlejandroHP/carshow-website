import './Hero.css';
import bgImage from '../assets/img-tsuru/tsuru-1.jpg';

export default function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="hero-image-container">
        <img src={bgImage} alt="El Tsuru de Rulas" className="hero-img" />
        <div className="hero-vignette"></div>
      </div>
      
      <div className="hero-text-container">
        <h2 className="hero-pretitle">EN MEMORIA DE JOSÉ PADRÓN "RULAS" (199X — 2026)</h2>
        <h1 className="hero-title">Rulas</h1>
        <p className="hero-subtitle">"El camino fue más bello porque lo recorrimos contigo. Tu motor sigue rugiendo en el viento."</p>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-line"></span>
      </div>
    </section>
  );
}
