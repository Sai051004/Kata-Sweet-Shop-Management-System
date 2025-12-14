import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false); // Local loading state
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        const result = await login(formData.username, formData.password);
        setIsLoading(false); // Stop loading provided result returns

        if (result.success) {
            toast.success('Welcome back!');
            navigate('/');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="auth-container animate-fade-in">
            <div className="card auth-card">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={isLoading}
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? 'Logging in... (Waking up server)' : 'Login'}
                    </button>
                    <p className="text-center mt-4" style={{ color: 'var(--text-muted)' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
