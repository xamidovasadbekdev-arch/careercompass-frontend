import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login/', form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);

      // Avval test yechganmi tekshir
      const answersRes = await API.get('/quiz/my-answers/');
      if (answersRes.data.count > 0) {
        navigate('/results');  // allaqachon yechgan → natijaga o't
      } else {
        navigate('/quiz');     // hali yechmagan → testga o't
      }
    } catch (err) {
      setError("Email yoki parol noto'g'ri!");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px' }}>
        <h2 className="gradient-text" style={{ fontSize: '28px', marginBottom: '8px', textAlign: 'center' }}>
          Kirish
        </h2>
        <p style={{ opacity: 0.6, textAlign: 'center', marginBottom: '32px' }}>
          Xush kelibsiz!
        </p>
        {error && (
          <div style={{ background: 'rgba(245,87,108,0.2)', border: '1px solid #f5576c', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#f5576c' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {[
            { key: 'email', placeholder: 'Email', type: 'email' },
            { key: 'password', placeholder: 'Parol', type: 'password' },
          ].map(({ key, placeholder, type }) => (
            <input
              key={key}
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '16px', marginBottom: '12px', outline: 'none' }}
              required
            />
          ))}
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '16px', marginTop: '8px' }}
            disabled={loading}>
            {loading ? 'Yuklanmoqda...' : 'Kirish →'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', opacity: 0.6 }}>
          Akkaunt yo'qmi?{' '}
          <span
            style={{ color: '#f093fb', cursor: 'pointer' }}
            onClick={() => navigate('/register')}>
            Ro'yxatdan o'tish
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;