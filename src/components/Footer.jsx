import './Footer.css';

const Footer = () => {
  return (
    <footer className="saak-footer">
      <div className="saak-footer-content">
        <p className="saak-quote">
          Cotizaciones: <a href="https://wa.me/525618672494?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización" target="_blank" rel="noopener noreferrer" className="saak-link">56 1867 2494</a>
        </p>
        <p className="saak-powered">
          Powered by <a href="mailto:contacto@saak-solutions.com" className="saak-link">saak-solutions</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
