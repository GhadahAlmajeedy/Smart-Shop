import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import PageBanner from '../components/PageBanner';
import './Products.css';

const PER_PAGE = 9;
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const colors = ['#e74c3c', '#2ecc71', '#3498db', '#f39c12', '#9b59b6'];
const brands = ['لاكوست', 'فانس', 'تيد بيكر', 'أندر آرمر', 'تومي هيلفيجر'];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('default');
  const [maxPrice, setMaxPrice] = useState(700);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  const setCategory = (slug) => {
    const p = new URLSearchParams(searchParams);
    if (slug === 'all') p.delete('category'); else p.set('category', slug);
    p.delete('search');
    setSearchParams(p);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (categoryParam !== 'all') list = list.filter(p => p.categorySlug === categoryParam);
    const q = (searchParam || query).trim();
    if (q) list = list.filter(p => p.name.includes(q) || p.tags.some(t => t.includes(q)));
    if (filterParam === 'new') list = list.filter(p => p.isNew);
    list = list.filter(p => p.price <= maxPrice);
    if (size) list = list.filter(p => p.sizes.includes(size));
    if (color) list = list.filter(p => p.colors.includes(color));
    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [categoryParam, searchParam, filterParam, query, maxPrice, size, color, sort]);

  useEffect(() => setPage(1), [categoryParam, searchParam, query, maxPrice, size, color, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const featured = products.filter(p => p.isFeatured).slice(0, 3);
  const related = products.slice(0, 5);

  return (
    <div className="page-wrapper products-page">
      <PageBanner crumbs={[{ label: 'الرئيسية', to: '/' }, { label: 'المنتجات' }]} />

      <div className="container products-layout">
        {/* Sidebar (right) */}
        <aside className="products-sidebar">
          <div className="filter-group">
            <h4 className="filter-title">الفئات</h4>
            <ul className="filter-list">
              <li><button className={categoryParam === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>جميع المنتجات</button></li>
              {categories.map(c => (
                <li key={c.slug}>
                  <button className={categoryParam === c.slug ? 'active' : ''} onClick={() => setCategory(c.slug)}>{c.name}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">السعر</h4>
            <input type="range" min="50" max="700" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="price-range" />
            <div className="price-labels"><span>50 ر.س</span><span>{maxPrice} ر.س</span></div>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">المقاسات</h4>
            <div className="size-filter">
              {sizes.map(s => (
                <button key={s} className={size === s ? 'active' : ''} onClick={() => setSize(size === s ? '' : s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">اللون</h4>
            <div className="color-filter">
              {colors.map(c => (
                <button key={c} className={color === c ? 'active' : ''} style={{ background: c }} onClick={() => setColor(color === c ? '' : c)} aria-label={c} />
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">العلامة التجارية</h4>
            <ul className="filter-list plain">
              {brands.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">منتجات مميزة</h4>
            {featured.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} className="mini-product">
                <img src={p.image} alt="" />
                <div>
                  <span>{p.name}</span>
                  <b>{p.price} ر.س</b>
                </div>
              </Link>
            ))}
          </div>
        </aside>

        {/* Main (left) */}
        <div className="products-main">
          <div className="products-toolbar">
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">الافتراضي</option>
              <option value="price-asc">السعر: الأقل أولاً</option>
              <option value="price-desc">السعر: الأعلى أولاً</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>
            <div className="toolbar-search">
              <input placeholder="ابحث..." value={query} onChange={e => setQuery(e.target.value)} />
              <button aria-label="بحث"><i className="fas fa-search" /></button>
            </div>
          </div>

          {shown.length === 0 ? (
            <div className="no-results">لا توجد منتجات مطابقة</div>
          ) : (
            <div className="products-grid-wrap">
              {shown.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}><i className="fas fa-angle-right" /></button>
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button disabled={page === pages} onClick={() => setPage(p => p + 1)}><i className="fas fa-angle-left" /></button>
          </div>
        </div>
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
