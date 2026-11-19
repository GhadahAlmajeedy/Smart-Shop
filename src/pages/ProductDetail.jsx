import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import PageBanner from '../components/PageBanner';
import './ProductDetail.css';

const reviewsData = [
  { name: 'منتج رائع', text: 'الجودة والتغليف كانت ممتازة جداً، أنصح به الجميع وبشدة.', rating: 5, date: '2 سبتمبر 2025', img: 'https://i.pravatar.cc/80?img=12' },
  { name: 'منتج رائع', text: 'خامة ممتازة والمقاس مناسب تماماً، سأكرر الشراء قريباً.', rating: 5, date: '2 سبتمبر 2025', img: 'https://i.pravatar.cc/80?img=32' },
  { name: 'منتج رائع', text: 'التوصيل سريع والمنتج مطابق للصورة، شكراً لكم.', rating: 5, date: '2 سبتمبر 2025', img: 'https://i.pravatar.cc/80?img=47' },
];

const Stars = ({ n }) => (
  <span className="stars">
    {[1, 2, 3, 4, 5].map(s => <i key={s} className={`fas fa-star ${s <= Math.round(n) ? 'filled' : ''}`} />)}
  </span>
);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('reviews');

  if (!product) return (
    <div className="page-wrapper not-found-state">
      <h2>المنتج غير موجود</h2>
      <button className="pill-btn" onClick={() => navigate('/products')}>العودة للمنتجات</button>
    </div>
  );

  const gallery = product.images?.length ? product.images : [product.image];
  const thumbs = [...gallery, ...gallery, ...gallery].slice(0, 5);
  const related = products.filter(p => p.id !== product.id).slice(0, 5);

  const add = (go) => {
    if (!size)  { alert('الرجاء اختيار المقاس'); return; }
    if (!color) { alert('الرجاء اختيار اللون'); return; }
    addToCart(product, size, color, qty);
    if (go) navigate('/cart');
  };

  return (
    <div className="page-wrapper detail-page">
      <PageBanner crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'المنتجات', to: '/products' }, { label: product.name }]} />

      <div className="container detail-grid">
        {/* Images (right) */}
        <div className="detail-images">
          <div className="main-img-wrap">
            <img src={thumbs[activeImg % thumbs.length]} alt={product.name} />
          </div>
          <div className="thumb-row">
            {thumbs.map((img, i) => (
              <button key={i} className={activeImg === i ? 'active' : ''} onClick={() => setActiveImg(i)}>
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Info (left) */}
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="detail-price">
            <b>{product.price} ر.س</b>
            {product.oldPrice && <s>{product.oldPrice} ر.س</s>}
          </div>
          <Stars n={product.rating} />
          <p className="detail-desc">{product.description}</p>

          <div className="opt">
            <label>اللون :</label>
            <div className="color-options">
              {product.colors.map(c => (
                <button key={c} className={color === c ? 'active' : ''} style={{ background: c }} onClick={() => setColor(c)} aria-label={c} />
              ))}
            </div>
          </div>

          <div className="opt">
            <label>الوزن :</label>
            <div className="size-options">
              {product.sizes.map(s => (
                <button key={s} className={size === s ? 'active' : ''} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="qty-row">
            <div className="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
            <button className="add-btn" onClick={() => add(false)}>أضف للسلة</button>
          </div>
          <p className="stock-note"><i className="fas fa-circle-check" /> {product.stock > 0 ? 'متاح للتوصيل' : 'غير متوفر'}</p>

          <button className="buy-btn" onClick={() => add(true)}>اشتري الآن</button>

          <div className="share">
            <span>شاركه عبر مواقع التواصل</span>
            <a href="#" className="s-wa"><i className="fab fa-whatsapp" /></a>
            <a href="#" className="s-yt"><i className="fab fa-youtube" /></a>
            <a href="#" className="s-fb"><i className="fab fa-facebook-f" /></a>
            <a href="#" className="s-tw"><i className="fab fa-twitter" /></a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container detail-tabs">
        <div className="tabs-nav">
          {[['desc', 'الوصف'], ['info', 'معلومات إضافية'], ['reviews', 'التقييمات']].map(([k, l]) => (
            <button key={k} className={tab === k ? 'active' : ''} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>

        {tab === 'desc' && <p className="tab-text">{product.description}</p>}
        {tab === 'info' && (
          <ul className="tab-text">
            <li>الفئة: {product.category}</li>
            <li>المقاسات: {product.sizes.join(' - ')}</li>
            <li>المتوفر: {product.stock} قطعة</li>
          </ul>
        )}
        {tab === 'reviews' && (
          <div className="reviews-wrap">
            <div className="reviews-list">
              <h4>{product.reviews} تقييمات</h4>
              {reviewsData.map((r, i) => (
                <div key={i} className="review">
                  <img src={r.img} alt="" />
                  <div>
                    <strong>{r.name}</strong>
                    <p>{r.text}</p>
                    <Stars n={r.rating} />
                    <small>{r.date}</small>
                  </div>
                </div>
              ))}
            </div>
            <form className="review-form" onSubmit={e => e.preventDefault()}>
              <h4>أضف تقييم</h4>
              <Stars n={0} />
              <input placeholder="الاسم" />
              <textarea rows="6" placeholder="تقييمك" />
              <div className="two"><input placeholder="الاسم" /><input placeholder="البريد الإلكتروني" /></div>
              <button className="add-btn">إرسال</button>
            </form>
          </div>
        )}
      </div>

      <section className="container related-block">
        <h3 className="underlined">منتجات مشابهة</h3>
        <div className="related-grid">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
