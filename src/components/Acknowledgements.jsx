import './Acknowledgements.css';

const acknowledgementsData = [
  {
    id: 1,
    title: "Organización General",
    subtitle: "Sus Hijos y Esposa",
    description: "Con profundo amor, respeto y dedicación, se encargaron de coordinar cada detalle de este homenaje para mantener vivo su recuerdo.",
    decorNumber: "01",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Ceremonia y Misa",
    subtitle: "Su Madre",
    description: "Con fe y devoción eterna, hizo posible la ceremonia religiosa en la Iglesia de Alcalá para encomendar su eterno descanso y unirnos en oración.",
    decorNumber: "02",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2s-1.5 2.5-1.5 4c0 1.5 1.5 3 1.5 3s1.5-1.5 1.5-3c0-1.5-1.5-4-1.5-4z" />
        <rect x="9" y="10" width="6" height="12" rx="1" />
        <path d="M7 22h10" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Caravana y Show de Autos",
    subtitle: "Sus Amigos Más Cercanos",
    description: "Compañeros de ruta y de vida que, al finalizar la misa, organizaron el desfile y recorrido sobre el asfalto en su honor con los motores encendidos.",
    decorNumber: "03",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Identidad del Evento",
    subtitle: "Su Sobrino e Ahijado Ismael",
    description: "Plasmó el cariño y el recuerdo de su legado automotriz diseñando las playeras conmemorativas que hoy vestimos con orgullo.",
    decorNumber: "04",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.38 3.46L16 6a2 2 0 0 1-2-2V2H10v2a2 2 0 0 1-2 2L3.62 3.46a1 1 0 0 0-1.34.45L.38 7.38a1 1 0 0 0 .45 1.34L4 10.24V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9.76l3.18-1.52a1 1 0 0 0 .45-1.34l-1.9-3.47a1 1 0 0 0-1.35-.45z" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Espacio Digital y Web",
    subtitle: "Su Sobrino",
    description: "Creó y desarrolló este sitio web especial para preservar su historia, conectar corazones y mantener en marcha su memoria en el mundo digital.",
    decorNumber: "05",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  }
];

export default function Acknowledgements() {
  return (
    <section className="acknowledgements-wrapper">
      <div className="ack-container">
        <div className="ack-header">
          <span className="ack-pretitle">Con Gratitud y Cariño</span>
          <h2 className="ack-title">Agradecimientos</h2>
        </div>

        <div className="ack-grid">
          {acknowledgementsData.map((ack) => (
            <article key={ack.id} className="ack-card">
              <div className="ack-card-decor">{ack.decorNumber}</div>
              <div className="ack-card-icon">
                {ack.icon}
              </div>
              <h3 className="ack-card-title">{ack.title}</h3>
              <span className="ack-card-sub">{ack.subtitle}</span>
              <p className="ack-card-desc">{ack.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
