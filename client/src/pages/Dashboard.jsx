import { useState, useEffect } from 'react';
import api from '../services/api';
import SweetCard from '../components/SweetCard';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [filteredSweets, setFilteredSweets] = useState([]);
    const [favIds, setFavIds] = useState([]);

    // Filters
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetchSweets();
        fetchFavorites();
    }, []);

    useEffect(() => {
        let result = sweets;

        if (search) {
            result = result.filter(s =>
                s.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            result = result.filter(s => s.category === category);
        }

        if (maxPrice) {
            result = result.filter(s => s.price <= Number(maxPrice));
        }

        setFilteredSweets(result);
    }, [search, category, maxPrice, sweets]);

    const fetchSweets = async () => {
        try {
            const { data } = await api.get('/sweets');
            setSweets(data);
            setFilteredSweets(data); // Initial set
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch sweets');
        }
    };

    const fetchFavorites = async () => {
        try {
            const { data } = await api.get('/users/favorites');
            setFavIds(data.map(fav => fav._id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToCart = async (sweetId) => {
        try {
            await api.post('/users/cart', { sweetId, quantity: 1 });
            toast.success('Added to Cart');
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    const handleToggleFav = async (sweetId) => {
        try {
            const { data } = await api.post(`/users/favorites/${sweetId}`);
            setFavIds(data);
        } catch (error) {
            toast.error('Favorite update failed');
        }
    };

    const uniqueCategories = [...new Set(sweets.map(s => s.category))];

    return (
        <div className="container page-content">
            <h1 className="page-title animate-slide-down">Available Sweets</h1>

            {/* filters */}
            <div className="filters card animate-fade-in">
                <div className="filter-group">
                    <label className="filter-label">Search Name</label>
                    <input
                        className="input-field"
                        placeholder="e.g. Chocolate"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <label className="filter-label">Category</label>
                    <select
                        className="input-field"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Max Price: Rs {maxPrice || 'Any'}</label>
                    <select
                        className="input-field"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    >
                        <option value="">Any</option>
                        <option value="10">Below 10</option>
                        <option value="15">Below 15</option>
                        <option value="20">Below 20</option>
                        <option value="25">Below 25</option>
                        <option value="30">Below 30</option>
                        <option value="50">Below 50</option>
                    </select>
                </div>
            </div>

            <div className="sweet-grid">
                {filteredSweets.map((sweet) => (
                    <SweetCard
                        key={sweet._id}
                        sweet={sweet}
                        onAddToCart={handleAddToCart}
                        onToggleFav={handleToggleFav}
                        isFav={favIds.includes(sweet._id)}
                        showControls={false}
                    />
                ))}
            </div>

            {filteredSweets.length === 0 && <p className="no-results">No sweets found matching your criteria.</p>}
        </div>
    );
};

export default Dashboard;
