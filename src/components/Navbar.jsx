import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { cartCount, cartItems, cartTotal, updateQuantity, removeFromCart,
          isCartOpen, setIsCartOpen, user, logout } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onClick = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false); };
    window.addEventListener('scroll', onScroll);
    document.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/', label: 'الرئيسية' },
    { to: '/products', label: 'المنتجات' },
    { to: '/products?category=men', label: 'رجالي' },
    { to: '/products?category=women', label: 'نسائي' },
    { to: '/products?category=kids', label: 'أطفال' },
  ];

  return (
    <>
      <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <div className="logo-icon"><i className="fas fa-store" /></div>
            <div className="logo-text">
              <span className="logo-main">سمارت</span>
              <span className="logo-sub">شوب</span>
            </div>
          </Link>

          <ul className="nav-links">
            {navLinks.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(true)} aria-label="بحث">
              <i className="fas fa-search" />
            </button>

            <div className="user-menu-wrap" ref={userRef}>
              <button className="nav-icon-btn" onClick={() => setUserOpen(o => !o)} aria-label="الحساب">
                <i className="far fa-user" />
              </button>
              {userOpen && (
                <div className="user-dropdown">
                  {user ? (
                    <>
                      <div className="ud-head">
                        <span className="ud-avatar"><i className="far fa-user" /></span>
                        <div>
                          <strong>{user.name}</strong>
                          <small>{user.email}</small>
                        </div>
                      </div>
                      <Link to="/" className="active" onClick={() => setUserOpen(false)}><i className="far fa-id-card" /> لوحة التحكم</Link>
                      <Link to="/" onClick={() => setUserOpen(false)}><i className="far fa-address-book" /> تفاصيل الحساب</Link>
                      <button onClick={() => { logout(); setUserOpen(false); }}><i className="fas fa-arrow-right-from-bracket" /> تسجيل الخروج</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="active" onClick={() => setUserOpen(false)}><i className="fas fa-arrow-right-to-bracket" /> تسجيل الدخول</Link>
                      <Link to="/register" onClick={() => setUserOpen(false)}><i className="far fa-address-card" /> تسجيل جديد</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/products" className="nav-icon-btn" aria-label="المفضلة"><i className="far fa-heart" /></Link>

            <button className="nav-icon-btn cart-btn" onClick={() => setIsCartOpen(true)} aria-label="السلة">
              <i className="fas fa-shopping-cart" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="القائمة">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-panel" onClick={e => e.stopPropagation()}>
            <button className="search-close" onClick={() => setSearchOpen(false)} aria-label="إغلاق"><i className="fas fa-xmark" /></button>
            <form onSubmit={handleSearch}>
              <label>عن ماذا تبحث ؟</label>
              <div className="search-field">
                <input autoFocus placeholder="اكتب كلمة للبحث ..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <button type="submit" aria-label="بحث"><i className="fas fa-search" /></button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />}
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <button className="cart-close" onClick={() => setIsCartOpen(false)} aria-label="إغلاق"><i className="fas fa-xmark" /></button>
        <div className="cart-items">
          {cartItems.length === 0 && <p className="cart-empty">السلة فارغة</p>}
          {cartItems.map(item => (
            <div key={item.cartKey} className="cart-row">
              <button className="cart-remove" onClick={() => removeFromCart(item.cartKey)} aria-label="حذف">x</button>
              <div className="cart-info">
                <strong>{item.name}</strong>
                <span className="cart-x">X{item.quantity}</span>
                <small>{item.price} ر.س</small>
                <div className="cart-qty">
                  <button onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}>+</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}>-</button>
                </div>
              </div>
              <img src={item.image} alt="" />
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <button onClick={() => { setIsCartOpen(false); navigate(cartItems.length ? '/checkout' : '/products'); }}>ادفع</button>
          <span>المجموع : {cartTotal} جنية</span>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li><Link to="/cart" onClick={closeMenu}><i className="fas fa-shopping-cart" /> السلة ({cartCount})</Link></li>
          <li><Link to="/login" onClick={closeMenu}><i className="fas fa-user" /> تسجيل الدخول</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="mobile-overlay" onClick={closeMenu} />}
    </>
  );
}
