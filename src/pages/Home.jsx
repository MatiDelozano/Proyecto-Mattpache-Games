import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Spinner, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import PaginationComponent from '../components/PaginationComponent';
import { FaSearch } from 'react-icons/fa';

const PRODUCTS_PER_PAGE = 8;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [source, setSource] = useState('');
  const [serverTime, setServerTime] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/products');
      const result = await response.json();

      setProducts(result.data);       // 🔥 importante
      setSource(result.source);
      setServerTime(result.serverTime);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const invalidateCache = async () => {
    await fetch('http://localhost:3000/cache/invalidate', {
      method: 'POST'
    });

    fetchProducts();
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === '') return products;

    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

    return products.filter(product => {
      const gameTitle = (product.title || '').toLowerCase();
      return gameTitle.includes(lowerCaseSearchTerm);
    });
  }, [products, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      <h1 className="text-center mb-3">Catálogo de Juegos</h1>

      {/* 🔥 PANEL REDIS */}
      <div className="text-center mb-4 p-3 border rounded bg-light">
        <div>
          Fuente:
          {source === "CACHE" ? (
            <Badge bg="success" className="ms-2">CACHE</Badge>
          ) : (
            <Badge bg="danger" className="ms-2">DATABASE</Badge>
          )}
        </div>
        <div className="mt-2">
          Tiempo servidor: <strong>{serverTime} ms</strong>
        </div>
        <Button
          variant="outline-dark"
          size="sm"
          className="mt-2"
          onClick={invalidateCache}
        >
          Invalidar Cache
        </Button>
      </div>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Buscar juegos..."
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

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center mt-5">
          <p>No se encontraron juegos que coincidan con "{searchTerm}".</p>
        </div>
      )}

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {paginatedProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default Home;