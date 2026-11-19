import { Link } from 'react-router-dom';
import './PageBanner.css';

export default function PageBanner({ crumbs = [] }) {
  return (
    <div className="page-banner">
      <div className="container banner-inner">
        <div className="banner-text">
          <h1>تسوق احدث المنتجات العصرية</h1>
          <p className="banner-crumbs">
            {crumbs.map((c, i) => (
              <span key={i}>
                {i > 0 && <i className="fas fa-chevron-left" />}
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </p>
        </div>
        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" alt="" />
      </div>
    </div>
  );
}
