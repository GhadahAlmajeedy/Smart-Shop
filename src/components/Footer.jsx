import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-links">
        <Link to="/">الرئيسية</Link>
        <Link to="/products">المنتجات</Link>
        <Link to="/cart">السلة</Link>
        <a href="#">نبذة عنا</a>
        <a href="#">الشروط والأحكام</a>
        <a href="#">اتصل بنا</a>
      </nav>

      <div className="footer-social">
        <a href="#" className="s-tw" aria-label="twitter"><i className="fab fa-twitter" /></a>
        <a href="#" className="s-fb" aria-label="facebook"><i className="fab fa-facebook-f" /></a>
        <a href="#" className="s-yt" aria-label="youtube"><i className="fab fa-youtube" /></a>
        <a href="#" className="s-wa" aria-label="whatsapp"><i className="fab fa-whatsapp" /></a>
      </div>

      <p className="footer-follow">ابق على تواصل</p>
      <p className="footer-copy">جميع حقوق النشر محفوظة لشركة سمارت شوب</p>
    </footer>
  );
}
