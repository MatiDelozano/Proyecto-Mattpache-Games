import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/producto/${product.id}`);
  };

  return (
    <Card
      className="h-100 shadow-sm"
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      onClick={handleClick}
    >
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          <strong>Plataforma:</strong> {product.platform}<br />
          <strong>Género:</strong> {product.genre}<br />
          <strong>Año:</strong> {product.releaseYear}
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-success mb-0">${product.price}</h4>
            {product.offer && (
              <Badge bg="danger">OFERTA</Badge>
            )}
          </div>
          <Button variant="primary" className="w-100 mt-2" onClick={handleClick}>
            Ver Detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
