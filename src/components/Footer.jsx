import { Container } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <Container>
        <p className="mb-0">© {currentYear} MATTPACHE GAMES. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
};

export default Footer;
