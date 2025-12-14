import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Spinner, Form, InputGroup, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { FaSearch } from 'react-icons/fa';

const Offers = () => {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/videogames');
      const data = await response.json();
      
      const offers = data.filter(product => product.offer === true);
      setProducts(offers);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const filteredOffers = useMemo(() => {
      if (!searchTerm || searchTerm.trim() === '') return products;

      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

      return products.filter(product => {
          const gameTitle = (product.title || '').toLowerCase(); 
          return gameTitle.includes(lowerCaseSearchTerm);
      });
  }, [products, searchTerm]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Ofertas Especiales</h1>
      
      {/* BUSCADOR LOCAL */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Buscar ofertas..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button variant="outline-dark">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {filteredOffers.length === 0 ? (
        <div className="text-center">
          <h3>
            {searchTerm ? 
              `No se encontraron ofertas que coincidan con "${searchTerm}"` : 
              "No hay ofertas disponibles en este momento"
            }
          </h3>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredOffers.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Offers;