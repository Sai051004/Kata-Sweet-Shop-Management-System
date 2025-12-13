import { useState, useEffect } from 'react';
import api from '../services/api';
import SweetCard from '../components/SweetCard';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [sweets, setSweets] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Sweet Form Data
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        image: null
    });

    // Admin Creation Data
    const [adminData, setAdminData] = useState({ username: '', password: '' });

    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
            return;
        }
        fetchSweets();
    }, [isAdmin, navigate]);

    const fetchSweets = async () => {
        try {
            const { data } = await api.get('/sweets');
            setSweets(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load sweets');
        }
    };

    // --- SWEET MANAGEMENT ---

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use FormData for file upload
        const data = new FormData();
        data.append('name', formData.name);
        data.append('category', formData.category);
        data.append('price', formData.price);
        data.append('quantity', formData.quantity);
        if (formData.image instanceof File) {
            data.append('image', formData.image);
        }

        try {
            if (isEditing) {
                // PUT request
                const res = await api.put(`/sweets/${editId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setSweets(sweets.map(s => s._id === editId ? res.data : s));
                toast.success('Sweet updated');
                setIsEditing(false);
                setEditId(null);
            } else {
                // POST request
                const res = await api.post('/sweets', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setSweets([...sweets, res.data]);
                toast.success('Sweet added');
            }
            // Reset form
            setFormData({ name: '', category: '', price: '', quantity: '', image: null });
            // Reset file input visually if needed (simple way: key or ref, sticking to state for now)
            document.getElementById('fileInput').value = '';
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/sweets/${id}`);
            setSweets(sweets.filter(s => s._id !== id));
            toast.success('Sweet deleted');
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleEdit = (sweet) => {
        setIsEditing(true);
        setEditId(sweet._id);
        setFormData({
            name: sweet.name,
            category: sweet.category,
            price: sweet.price,
            quantity: sweet.quantity,
            image: null // Don't preload existing image file object, users can optionally replace
        });
        window.scrollTo(0, 0);
    };

    // --- ADMIN CREATION ---

    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/create-admin', adminData);
            toast.success(`Admin '${adminData.username}' created!`);
            setAdminData({ username: '', password: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create admin');
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Admin Panel</h1>

            {/* Create Admin User Section */}
            <div className="card" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--primary-color)' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Create New Admin</h2>
                <form onSubmit={handleAdminSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
                    <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
                        <label className="input-label">Username</label>
                        <input
                            value={adminData.username}
                            onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            value={adminData.password}
                            onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                            className="input-field"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: '46px' }}>
                        Create Admin
                    </button>
                </form>
            </div>

            {/* Manage Sweets Section */}
            <div className="card" style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                    {isEditing ? 'Edit Sweet' : 'Add New Sweet'}
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Name</label>
                        <input name="name" value={formData.name} onChange={handleInput} className="input-field" required />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Category</label>
                        <input name="category" value={formData.category} onChange={handleInput} className="input-field" required />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Price (per piece)</label>
                        <input name="price" type="number" value={formData.price} onChange={handleInput} className="input-field" required />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Quantity</label>
                        <input name="quantity" type="number" value={formData.quantity} onChange={handleInput} className="input-field" required />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Image (Optional)</label>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="input-field"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                            {isEditing ? 'Update' : 'Add Sweet'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ name: '', category: '', price: '', quantity: '', image: null });
                                    setEditId(null);
                                    if (document.getElementById('fileInput')) document.getElementById('fileInput').value = '';
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Manage Inventory</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {sweets.map((sweet) => (
                    <SweetCard
                        key={sweet._id}
                        sweet={sweet}
                        onPurchase={() => toast('Admins cannot purchase from here', { icon: 'ℹ️' })}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        showControls={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
