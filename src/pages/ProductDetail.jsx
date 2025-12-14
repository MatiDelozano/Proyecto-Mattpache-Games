import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/videogames/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Producto agregado correctamente', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
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

  if (!product) {
    return (
      <Container className="py-5">
        <h2>Producto no encontrado</h2>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <div className="d-flex align-items-center gap-2 mb-3">
            <h1>{product.title}</h1>
            {product.offer && <Badge bg="danger" className="fs-6">OFERTA</Badge>}
          </div>
          <h2 className="text-success mb-4">${product.price}</h2>
          <hr />
          <div className="mb-3">
            <p><strong>Plataforma:</strong> {product.platform}</p>
            <p><strong>Género:</strong> {product.genre}</p>
            <p><strong>Desarrollador:</strong> {product.developer}</p>
            <p><strong>Año de Lanzamiento:</strong> {product.releaseYear}</p>
            <p><strong>Clasificación:</strong> {product.rating}</p>
          </div>
          <Button
            variant="success"
            size="lg"
            className="w-100"
            onClick={handleAddToCart}
          >
            Agregar al Carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
