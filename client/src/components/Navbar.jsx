import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiShoppingBag, FiHeart, FiClock, FiUser, FiHome } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar animate-slide-down">
            <div className="container navbar-content">
                <div className="nav-left">
                    <Link to="/" className="logo">
                        SweetShop
                    </Link>
                </div>

                <div className="nav-right">
                    <Link to="/" className="nav-link" title="Home"><FiHome /> Home</Link>

                    {isAdmin && (
                        <Link to="/admin" className="nav-link">Admin Panel</Link>
                    )}

                    {user && !isAdmin && (
                        <>
                            <Link to="/favorites" className="nav-link" title="Favorites"><FiHeart /> Favorites</Link>
                            <Link to="/cart" className="nav-link" title="Cart"><FiShoppingBag /> Cart</Link>
                            <Link to="/history" className="nav-link" title="Orders"><FiClock /> Orders</Link>
                        </>
                    )}

                    {user ? (
                        <>
                            <div className="nav-link user-pill">
                                <FiUser /> <span>{user.username}</span>
                            </div>
                            <button onClick={handleLogout} className="btn btn-secondary" title="Logout">
                                <FiLogOut /> <span className="logout-text">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
