import { Navbar, Nav, Container, Badge } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useCart } from '../contexts/CartContext';


const Header = () => { 
  const { getItemCount } = useCart();
  
  

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">MATTPACHE GAMES</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Formulario de búsqueda */}
          <Nav className="mx-auto" /> {}

          {/* Enlaces de Navegación */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">INICIO</Nav.Link>
            <Nav.Link as={Link} to="/ofertas">OFERTAS</Nav.Link>
            <Nav.Link as={Link} to="/administracion">ADMINISTRACIÓN</Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="position-relative">
              <FaShoppingCart size={20} />
              {getItemCount() > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {getItemCount()}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;