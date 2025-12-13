import { FiShoppingCart, FiEdit, FiTrash2, FiHeart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const SweetCard = ({ sweet, onPurchase, onDelete, onEdit, onAddToCart, onToggleFav, isFav, showControls = false }) => {
    // Determine image source
    const imageSrc = sweet.image
        ? `http://localhost:5000${sweet.image}`
        : `https://placehold.co/400x300?text=${sweet.name.replace(' ', '+')}`;

    const isOutOfStock = sweet.quantity === 0;

    return (
        <div className="card sweet-card animate-fade-in">
            {/* Favorite Toggle */}
            {!showControls && onToggleFav && (
                <button
                    onClick={() => onToggleFav(sweet._id)}
                    className={`fav-btn ${isFav ? 'active' : ''}`}
                    title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                >
                    <FiHeart fill={isFav ? 'currentColor' : 'none'} />
                </button>
            )}

            <div className="sweet-card-img-wrapper">
                <img
                    src={imageSrc}
                    alt={sweet.name}
                    className="sweet-card-img"
                />
            </div>

            <div className="sweet-details">
                <div className="sweet-header">
                    <h3 className="sweet-title">{sweet.name}</h3>
                    <span className="sweet-price">Rs {sweet.price} / pc</span>
                </div>

                <p className="sweet-category">
                    Category: <strong>{sweet.category}</strong>
                </p>

                <div className="sweet-meta">
                    <span className={`badge ${isOutOfStock ? "badge-danger" : "badge-success"}`}>
                        {isOutOfStock ? "Out of Stock" : `${sweet.quantity} in stock`}
                    </span>
                </div>

                <div className="sweet-actions">
                    {!showControls ? (
                        <button
                            className="btn btn-primary btn-block"
                            disabled={isOutOfStock}
                            onClick={() => onAddToCart && onAddToCart(sweet._id)}
                        >
                            <FiShoppingCart style={{ marginRight: '0.5rem' }} />
                            Add to Cart
                        </button>
                    ) : (
                        <>
                            {onEdit && (
                                <button className="btn btn-secondary icon-btn" onClick={() => onEdit(sweet)}>
                                    <FiEdit />
                                </button>
                            )}
                            {onDelete && (
                                <button className="btn btn-danger icon-btn" onClick={() => onDelete(sweet._id)}>
                                    <FiTrash2 />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SweetCard;
