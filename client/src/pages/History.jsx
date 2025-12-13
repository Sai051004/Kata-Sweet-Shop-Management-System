import { useState, useEffect } from 'react';
import api from '../services/api';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const { data } = await api.get('/users/history');
            // Sort by date desc
            setHistory(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1>Order History</h1>
            {history.length === 0 ? (
                <p>No past orders.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {history.map((order, idx) => (
                        <div key={idx} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                <span style={{ color: '#666' }}>Date: {new Date(order.date).toLocaleString()}</span>
                                <span className="badge badge-success">Total: Rs {order.totalAmount}</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {order.items.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>Rs {item.price * item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
