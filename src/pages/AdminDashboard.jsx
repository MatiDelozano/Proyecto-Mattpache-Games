import { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    genre: '',
    developer: '',
    releaseYear: '',
    image: '',
    offer: false,
    price: '',
    rating: ''
  });
  const { logout } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/videogames');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleShowModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        platform: '',
        genre: '',
        developer: '',
        releaseYear: '',
        image: '',
        offer: false,
        price: '',
        rating: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await fetch(`https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/videogames/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        toast.success('Producto actualizado correctamente', { autoClose: 500 });
      } else {
        await fetch('https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/videogames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        toast.success('Producto agregado correctamente', { autoClose: 500 });
      }

      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Error al guardar el producto', { autoClose: 500 });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await fetch(`https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/videogames/${id}`, {
          method: 'DELETE',
        });
        toast.success('Producto eliminado correctamente', { autoClose: 500 });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Error al eliminar el producto', { autoClose: 500 });
      }
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Panel de Administración</h1>
        <div>
          <Button variant="success" className="me-2" onClick={() => handleShowModal()}>
            <FaPlus /> Agregar Producto
          </Button>
          <Button variant="outline-danger" onClick={logout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Plataforma</th>
              <th>Género</th>
              <th>Desarrollador</th>
              <th>Año</th>
              <th>Precio</th>
              <th>Oferta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '50px', height: '75px', objectFit: 'cover' }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.platform}</td>
                <td>{product.genre}</td>
                <td>{product.developer}</td>
                <td>{product.releaseYear}</td>
                <td>${product.price}</td>
                <td>{product.offer ? 'Sí' : 'No'}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(product)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Plataforma</Form.Label>
              <Form.Control
                type="text"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Desarrollador</Form.Label>
              <Form.Control
                type="text"
                name="developer"
                value={formData.developer}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Año de Lanzamiento</Form.Label>
              <Form.Control
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Clasificación</Form.Label>
              <Form.Control
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="En Oferta"
                name="offer"
                checked={formData.offer}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingProduct ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
