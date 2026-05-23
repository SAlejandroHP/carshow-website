import { useState } from 'react';
import './FamilyMessage.css';
import familyImg from '../assets/personal/Imagen-con-hijos.jpeg';

export default function FamilyMessage() {
  const [selectedMember, setSelectedMember] = useState(null);

  const letters = {
    guadalupe: {
      name: "Guadalupe",
      relation: "Hija Mayor",
      letter: "Guadalupe, mi niña grande: el camino a veces presenta curvas inesperadas y el asfalto del corazón se vuelve inestable. Pero nunca olvides lo valiosa, fuerte y hermosa que eres. Te mereces un amor que te brinde paz, que sea sólido, respetuoso y sincero, tal como yo siempre te respeté. No dejes que las tormentas nublen tu camino ni te quedes viviendo en el ayer; mira hacia adelante con la frente en alto. Rueda libre y segura, porque mi amor te acompaña en cada paso y estoy sumamente orgulloso de ti."
    },
    andrea: {
      name: "Andrea",
      relation: "Hija de en medio",
      letter: "Andrea, mi guerrera: verte buscar tu propio bienestar, sanando con tanta valentía paso a paso y levantándote con orgullo cada vez que la vida te pone a prueba, me llena el alma de alegría. Eres fuerte y capaz de reconstruirte ante cualquier caída. Aunque te hayan fallado, tu luz interior sigue brillando con una fuerza increíble. No te detengas nunca. Cada vez que mires al cielo y pienses en mí, recuerda que te sonrío con orgullo por la gran mujer en la que te has convertido. Sigue adelante."
    },
    christian: {
      name: "Christian",
      relation: "Hijo Menor",
      letter: "Christian, mi campeón, el más pequeño: estás por iniciar el viaje más maravilloso, respetable y desafiante de tu vida: el de ser padre. No temas, el instinto y la sabiduría para guiar ya están dentro de ti. Sé lo duro que trabajas de sol a sol con esa sonrisa constante para proteger a tu madre y a los tuyos, ocultando tus temores y la falta que te hago. No tienes que cargar con todo el peso del mundo tú solo, hijo; está bien sentir miedo y pedir ayuda. Vas a ser un papá extraordinario y yo guiaré tu mano en cada kilómetro del camino."
    },
    anel: {
      name: "Anel",
      relation: "Esposa",
      letter: "Anel, mi gran compañera de vida: sé que el silencio de la casa a veces pesa demasiado y que me extrañas con todo tu ser. Pero te pido que encuentres paz en tu corazón y te cuides con el mismo amor con el que cuidaste de todos nosotros. Tu fuerza siempre fue mi motor. Aunque ya no pueda estar físicamente a tu lado para abrazarte en las noches frías, mi amor por ti es eterno y mi espíritu sigue aquí, sosteniendo tu mano y velando por nuestro hogar. Gracias por ser el pilar de nuestra familia."
    }
  };

  return (
    <section className="family-section-wrapper">
      <div className="family-container">
        <div className="family-header">
          <span className="family-pretitle">SU LEGADO MÁS VALIOSO</span>
          <h2 className="family-title">Siempre en el Asfalto de sus Vidas</h2>
        </div>

        <div className="family-grid">
          {/* Column 1: Image container */}
          <div className="family-image-container">
            <div className="glass-frame">
              <img 
                src={familyImg} 
                alt="Pepe con sus hijos" 
                className="family-img" 
                loading="lazy"
              />
              <div className="frame-overlay"></div>
            </div>
          </div>

          {/* Column 2: Public message */}
          <div className="family-content-container">
            <div className="public-message-card">
              <div className="card-decor">
                <span className="quote-mark">“</span>
              </div>
              <p className="public-text">
                "Hijos míos: <strong>Guadalupe</strong>, <strong>Andrea</strong> y <strong>Christian</strong>. El motor que impulsó mi vida y mis sueños siempre fueron ustedes. Aunque hoy no me vean al volante en la tierra, sigo viajando a su lado en cada kilómetro de sus vidas, protegiéndolos y amándolos en el viento. Estoy inmensamente orgulloso de los seres humanos en los que se han convertido, de su fuerza y de sus grandes corazones. Nunca caminan solos en la carretera de la vida. <strong>¡Oh sí!</strong> Siempre estaré presente."
              </p>
              <p className="public-signature">— Papá (Pepe)</p>
            </div>

            {/* Interactive Section */}
            <div className="letters-interactive-section">
              <h3 className="letters-heading">Un mensaje para mis hijos y esposa:</h3>
              <div className="letters-tabs">
                {Object.keys(letters).map((key) => (
                  <button
                    key={key}
                    className={`tab-btn ${selectedMember === key ? 'active' : ''}`}
                    onClick={() => setSelectedMember(selectedMember === key ? null : key)}
                  >
                    {letters[key].name}
                    <span className="tab-relation">{letters[key].relation}</span>
                  </button>
                ))}
              </div>

              {selectedMember && (
                <div className="letter-display-box fade-in">
                  <button className="close-letter-btn" onClick={() => setSelectedMember(null)} aria-label="Cerrar carta">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="letter-header">
                    <span className="letter-to">Para: {letters[selectedMember].name}</span>
                    <span className="letter-date">Con amor eterno</span>
                  </div>
                  <p className="letter-content">"{letters[selectedMember].letter}"</p>
                  <div className="letter-footer">
                    <span className="letter-from">
                      — {selectedMember === 'anel' ? 'Pepe' : 'Papá'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
