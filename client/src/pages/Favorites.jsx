import { useState, useEffect } from 'react';
import api from '../services/api';
import SweetCard from '../components/SweetCard';
import { toast } from 'react-hot-toast';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const { data } = await api.get('/users/favorites');
            setFavorites(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const toggleFav = async (id) => {
        try {
            const { data } = await api.post(`/users/favorites/${id}`);
            // If removed, filter out local state
            // If logic returns full list of IDs, we might need full objects.
            // My backend returns list of IDs.
            // Wait, my getFavorites populates. But toggle returns IDs.
            // So simplest is to remove from local list if it was there.
            setFavorites(favorites.filter(s => s._id !== id));
            toast.success('Removed from favorites');
        } catch (error) {
            toast.error('Update failed');
        }
    };

    // We need logic to add to cart from here too
    const addToCart = async (id) => {
        try {
            await api.post('/users/cart', { sweetId: id, quantity: 1 });
            toast.success('Added to Cart');
        } catch (error) {
            toast.error('Failed to add');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1>Your Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {favorites.map(sweet => (
                        <SweetCard
                            key={sweet._id}
                            sweet={sweet}
                            onAddToCart={addToCart}
                            onToggleFav={toggleFav}
                            isFav={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
