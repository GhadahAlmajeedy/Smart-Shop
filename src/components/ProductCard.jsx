import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const addSize = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size, product.colors?.[0] ?? '-');
  };

  return (
    <div className="product-card">
      <button
        className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
        onClick={handleWishlist}
        aria-label="المفضلة"
      >
        <i className={wishlisted ? 'fas fa-heart' : 'fas fa-heart'} />
      </button>

      <Link to={`/products/${product.id}`} className="card-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      <div className="card-body">
        <div className="card-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map(s => (
              <i key={s} className={`fas fa-star ${s <= Math.round(product.rating) ? 'filled' : ''}`} />
            ))}
          </div>
          <Link to={`/products/${product.id}`} className="card-title">{product.name}</Link>
        </div>

        <div className="card-price">
          <span className="price-current">{product.price} ج.م</span>
          {product.oldPrice && <span className="price-old">{product.oldPrice} ج.م</span>}
        </div>

        <div className="card-sizes">
          {(product.sizes || []).slice(0, 4).map((s, i) => (
            <button key={s} className={`size-box ${i === 3 ? 'last' : ''}`} onClick={e => addSize(e, s)} title="أضف للسلة">
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
