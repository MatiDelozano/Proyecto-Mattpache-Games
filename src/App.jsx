
import { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/administracion/dashboard" replace />;
  }

  return <Login />;
};

function App() {
  

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="d-flex flex-column min-vh-100">
            {}
            <Header /> 
            <main className="flex-grow-1">
              <Routes>
                {}
                <Route path="/" element={<Home />} /> 
                <Route path="/producto/:id" element={<ProductDetail />} />
                {}
                <Route path="/ofertas" element={<Offers />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/administracion" element={<AdminRoute />} />
                <Route
                  path="/administracion/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
