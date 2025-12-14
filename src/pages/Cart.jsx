import { Container, Row, Col, Button, Card, ListGroup, Image, Modal } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Tu carrito está vacío</h2>
          <p className="text-muted">Agrega productos para continuar</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Carrito de Compras</h1>
      <Row>
        <Col lg={8}>
          <ListGroup>
            {cart.map((item) => (
              <ListGroup.Item key={item.id} className="mb-2">
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <Image src={item.image} alt={item.title} fluid rounded />
                  </Col>
                  <Col xs={9} md={4}>
                    <h5>{item.title}</h5>
                    <small className="text-muted">{item.platform}</small>
                  </Col>
                  <Col xs={6} md={2} className="text-center">
                    <strong>${item.price}</strong>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <FaMinus />
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </Col>
                  <Col xs={12} md={1} className="text-center mt-2 mt-md-0">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col lg={4}>
          <Card className="shadow">
            <Card.Body>
              <h4>Resumen del Pedido</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <strong>${getTotal()}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Total:</span>
                <h4 className="text-success">${getTotal()}</h4>
              </div>
              <Button
                variant="success"
                className="w-100"
                onClick={handleCheckout}
              >
                Proceder al Pago
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Pago Exitoso!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="py-4">
            <h1 className="text-success mb-3">✓</h1>
            <h4>Tu compra ha sido procesada correctamente</h4>
            <p className="text-muted">Gracias por tu compra en MATTPACHE GAMES</p>
            <p><strong>Total pagado: ${getTotal()}</strong></p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;
