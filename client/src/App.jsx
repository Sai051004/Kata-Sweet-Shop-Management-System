import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import History from './pages/History';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Login />; // Redirect to login if not auth
};

// Admin Route Wrapper
const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (user && isAdmin) ? children : <div>Access Denied</div>;
};

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />

          <Route path="/history" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />
        </Routes>
      </div>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
