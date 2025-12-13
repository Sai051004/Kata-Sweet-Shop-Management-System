import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const { data } = await api.get('/users/cart');
            setCart(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const removeFromCart = async (sweetId) => {
        try {
            const { data } = await api.delete(`/users/cart/${sweetId}`);
            setCart(data);
            toast.success('Removed from cart');
        } catch (error) {
            toast.error('Failed to remove');
        }
    };

    const handleCheckout = async () => {
        try {
            const { data } = await api.post('/users/checkout');
            toast.success(`Purchase successful! Total: Rs ${data.order.totalAmount}`);
            setCart([]);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Checkout failed');
        }
    };

    if (loading) return <div>Loading...</div>;

    const total = cart.reduce((sum, item) => sum + (item.sweet.price * item.quantity), 0);

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <>
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #ddd' }}>
                                    <th style={{ padding: '1rem' }}>Item</th>
                                    <th style={{ padding: '1rem' }}>Price</th>
                                    <th style={{ padding: '1rem' }}>Qty</th>
                                    <th style={{ padding: '1rem' }}>Total</th>
                                    <th style={{ padding: '1rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.sweet._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '1rem' }}>{item.sweet.name}</td>
                                        <td style={{ padding: '1rem' }}>Rs {item.sweet.price} / pc</td>
                                        <td style={{ padding: '1rem' }}>{item.quantity}</td>
                                        <td style={{ padding: '1rem' }}>Rs {item.sweet.price * item.quantity}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => removeFromCart(item.sweet._id)}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h2>Total: Rs {total}</h2>
                        <button className="btn btn-primary" onClick={handleCheckout} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
