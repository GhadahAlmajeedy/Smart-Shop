
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

// HERO SLIDES
const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80',
    small: 'براندات نسائية عالمية',
    title: 'أحدث أدوات الجمال',
    desc: 'اكتشفي أحدث صيحات الموضة والجمال',
  },
  {
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&q=80',
    small: 'أحدث صيحات الموضة',
    title: 'أناقتك تبدأ من هنا',
    desc: 'تشكيلة مميزة تناسب جميع الأذواق',
  },
  {
    img: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=700&q=80',
    small: 'ملابس رياضية عالمية',
    title: 'تألقي بإطلالة جديدة',
    desc: 'اختاري إطلالتك المفضلة الآن',
  },
];

// FEATURES
const features = [
  { icon: 'fa-truck-fast', title: 'توصيل مجاني', desc: 'لجميع الطلبات فوق 300 ريال' },
  { icon: 'fa-rotate-left', title: 'استرجاع مضمون', desc: 'استرداد كامل خلال 30 يوم' },
  { icon: 'fa-headset', title: 'دعم فني', desc: 'فريق دعم متاح دائماً' },
  { icon: 'fa-tags', title: 'عروض حصرية', desc: 'خصومات على أحدث المنتجات' },
];

// BRANDS
const brands = [
  'LACOSTE',
  'VANS',
  'TED BAKER',
  'UNDER ARMOUR',
  'TOMMY HILFIGER',
  'LACOSTE',
  'TED BAKER'
];

// GALLERY
const gallery = [
  {
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    title: 'مع النقل صيحات الموضة والفاشون',
    sub: 'أحدث تصاميم الملابس الرجالية'
  },
  {
    img: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&q=80',
    title: 'اشترِ بالجودة وفيك شوقك',
    sub: 'ملابس رياضية بأسعار مميزة'
  },
  {
    img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80',
    title: 'استمتعي بالأزياء فيشوه في الشروقات',
    sub: 'تشكيلة نسائية متنوعة'
  },
];

const KIDS_END = Date.now() + 1000 * 60 * 60 * 24 * 5;

// COUNTDOWN
function useCountdown(target) {
  const calc = () => {
    const d = Math.max(0, target - Date.now());

    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor(d / 3600000) % 24,
      minutes: Math.floor(d / 60000) % 60,
      seconds: Math.floor(d / 1000) % 60,
    };
  };

  const [t, setT] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return t;
}

const pad = (n) => String(n).padStart(2, '0');

// HOME PAGE
export default function Home() {
  const latest = products.slice(0, 8);
  const sliderRef = useRef(null);
  const t = useCountdown(KIDS_END);

  // HERO SLIDER STATE
  const [activeSlide, setActiveSlide] = useState(0);

  // AUTOMATIC SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // NEXT SLIDE
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // PREVIOUS SLIDE
  const prevSlide = () => {
    setActiveSlide((prev) =>
      (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  // PRODUCTS SLIDER
  const slide = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir * 260,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home">

      {/* HERO SLIDER */}
      <section className="hero">

        <div className="container hero-inner" key={activeSlide}>

          <div className="hero-image">

            <span className="blob blob-1" />
            <span className="blob blob-2" />

            <div className="hero-circle">

              <img
                key={heroSlides[activeSlide].img}
                src={heroSlides[activeSlide].img}
                alt={heroSlides[activeSlide].title}
              />

            </div>

          </div>

          <div className="hero-text">

            <p className="hero-small">
              {heroSlides[activeSlide].small}
            </p>

            <h1>
              {heroSlides[activeSlide].title}
            </h1>

            <p className="hero-small">
              {heroSlides[activeSlide].desc}
            </p>

            <Link to="/products" className="pill-btn">
              تسوق الآن
            </Link>

          </div>

        </div>

        {/* ARROWS AND DOTS */}
        <div className="hero-dots">

          <button
            className="arrow-btn"
            onClick={prevSlide}
            aria-label="السابق"
          >
            <i className="fas fa-chevron-right" />
          </button>

          {heroSlides.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              aria-label={`الشريحة ${index + 1}`}
              className="hero-dot"
              style={{
                width: '8px',
                height: '8px',
                padding: 0,
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                background: activeSlide === index ? '#00b5d5' : '#bbb',
                transform: activeSlide === index ? 'scale(1.3)' : 'scale(1)',
                transition: '0.3s'
              }}
            />
          ))}

          <button
            className="arrow-btn"
            onClick={nextSlide}
            aria-label="التالي"
          >
            <i className="fas fa-chevron-left" />
          </button>

        </div>

      </section>

      {/* FEATURES */}
      <section className="container features">

        {features.map(f => (
          <div key={f.title} className="feature">

            <i className={`fas ${f.icon}`} />

            <div>
              <strong>{f.title}</strong>
              <span>{f.desc}</span>
            </div>

          </div>
        ))}

      </section>

      {/* PROMO BANNERS */}
      <section className="container promos">

        <div className="promo promo-blue">

          <img
            src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80"
            alt=""
          />

          <div>
            <h3>ملابس الأطفال</h3>
            <p>خصم %50</p>
            <Link to="/products?category=kids">تسوق الآن</Link>
          </div>

        </div>

        <div className="promo promo-pink">

          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"
            alt=""
          />

          <div>
            <h3>خصم كبير</h3>
            <p>فساتين بناتي</p>
            <Link to="/products?category=women">تسوق الآن</Link>
          </div>

        </div>

      </section>

      {/* LATEST PRODUCTS */}
      <section className="container latest">

        <h2 className="underlined">أحدث المنتجات</h2>

        <div className="products-grid">

          {latest.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}

        </div>

      </section>

      {/* KIDS COUNTDOWN */}
      <section className="kids-banner">

        <img
          className="kid kid-left"
          src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&q=80"
          alt=""
        />

        <div className="kids-center">

          <p>اكبر خصم على الاطلاق</p>

          <h2>احدث ملابس الاطفال</h2>

          <div className="countdown">

            <div>
              <b>{pad(t.days)}</b>
              <span>يوم</span>
            </div>

            <div>
              <b>{pad(t.hours)}</b>
              <span>ساعة</span>
            </div>

            <div>
              <b>{pad(t.minutes)}</b>
              <span>دقيقة</span>
            </div>

            <div className="sec">
              <b>{pad(t.seconds)}</b>
              <span>ثانية</span>
            </div>

          </div>

          <Link to="/products?category=kids" className="pill-btn purple">
            تسوق الان
          </Link>

        </div>

        <img
          className="kid kid-right"
          src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&q=80"
          alt=""
        />

      </section>

      {/* SLIDER + CATEGORIES SIDEBAR */}
      <section className="container slider-section">

        <aside className="cat-sidebar">

          <div className="cat-head">تسوق من الأقسام</div>

          {categories.map(c => (
            <Link
              key={c.id}
              to={`/products?category=${c.slug}`}
            >
              {c.name}
            </Link>
          ))}

        </aside>

        <div className="slider-wrap">

          <button
            className="arrow-btn right"
            onClick={() => slide(1)}
            aria-label="التالي"
          >
            <i className="fas fa-chevron-right" />
          </button>

          <div className="slider" ref={sliderRef}>

            {products.slice(0, 8).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}

          </div>

          <button
            className="arrow-btn left"
            onClick={() => slide(-1)}
            aria-label="السابق"
          >
            <i className="fas fa-chevron-left" />
          </button>

        </div>

      </section>

      {/* BRANDS */}
      <section className="container brands">

        <h3>البراندات</h3>

        <div className="brands-row">

          {brands.map((b, i) => (
            <span key={i}>{b}</span>
          ))}

        </div>

      </section>

      {/* GALLERY */}
      <section className="container gallery">

        {gallery.map((g, i) => (

          <figure
            key={i}
            className={i === 1 ? 'mid' : ''}
          >

            {i === 1 && (
              <figcaption className="top-cap">
                {g.title}
              </figcaption>
            )}

            <img src={g.img} alt="" />

            {i !== 1 && (
              <figcaption>
                <strong>{g.title}</strong>
                <span>{g.sub}</span>
              </figcaption>
            )}

          </figure>

        ))}

      </section>

    </div>
  );
}
