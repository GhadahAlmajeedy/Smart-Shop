import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Auth.css';

function Socials() {
  return (
    <>
      <p className="auth-or">أو سجل الدخول من</p>
      <div className="auth-socials">
        <a href="#" className="in" aria-label="linkedin"><i className="fab fa-linkedin-in" /></a>
        <a href="#" className="pin" aria-label="pinterest"><i className="fab fa-pinterest-p" /></a>
        <a href="#" className="fb" aria-label="facebook"><i className="fab fa-facebook-f" /></a>
        <a href="#" className="tw" aria-label="twitter"><i className="fab fa-twitter" /></a>
      </div>
    </>
  );
}

function AuthShell({ mode, children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-image">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" alt="Smart Shop" />
          <div className="auth-tabs">
            <Link to="/login" className={mode === 'login' ? 'on' : ''}>تسجيل الدخول</Link>
            <Link to="/register" className={mode === 'register' ? 'on' : ''}>انشاء حساب</Link>
          </div>
        </div>
        <div className="auth-form-side">
          <h2 className="auth-brand">Smart Shop</h2>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useCart();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('الرجاء تعبئة جميع الحقول'); return; }
    login('', form.email);
    navigate('/');
  };

  return (
    <AuthShell mode="login">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>تسجيل الدخول</h1>
        <p className="sub">ادخل بياناتك للدخول إلى حسابك</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="field"><i className="far fa-envelope" /><input name="email" type="email" placeholder="البريد الإلكتروني" value={form.email} onChange={handleChange} /></div>
        <div className="field"><i className="fas fa-lock" /><input name="password" type="password" placeholder="كلمة المرور" value={form.password} onChange={handleChange} /></div>
        <div className="row">
          <button type="submit" className="auth-submit">تسجيل الدخول</button>
          <a href="#" className="forgot">نسيت كلمة المرور؟</a>
        </div>
        <Socials />
      </form>
    </AuthShell>
  );
}

export function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useCart();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('الرجاء تعبئة جميع الحقول'); return; }
    if (form.password.length < 6) { setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل'); return; }
    login(form.name, form.email);
    navigate('/');
  };

  return (
    <AuthShell mode="register">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>انشاء حساب</h1>
        <p className="sub">ادخل بياناتك لإنشاء حساب جديد</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="field"><i className="far fa-user" /><input name="name" placeholder="الاسم" value={form.name} onChange={handleChange} /></div>
        <div className="field"><i className="far fa-envelope" /><input name="email" type="email" placeholder="البريد الإلكتروني" value={form.email} onChange={handleChange} /></div>
        <div className="field"><i className="fas fa-lock" /><input name="password" type="password" placeholder="كلمة المرور" value={form.password} onChange={handleChange} /></div>
        <div className="row">
          <button type="submit" className="auth-submit">انشاء حساب</button>
          <Link to="/login" className="forgot">لديك حساب بالفعل؟</Link>
        </div>
        <Socials />
      </form>
    </AuthShell>
  );
}
