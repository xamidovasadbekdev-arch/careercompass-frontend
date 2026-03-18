import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/register/', form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      navigate('/quiz');
    } catch (err) {
  if (err.response?.data) {
    const data = err.response.data;
    if (data.email) {
      setError("Bu email allaqachon ro'yxatdan o'tgan!");
    } else if (data.username) {
      setError("Bu username band! Boshqa username tanlang.");
    } else {
      setError("Xato yuz berdi. Ma'lumotlarni tekshiring.");
    }
  } else {
    setError("Server bilan bog'lanib bo'lmadi!");
  }
}
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '40px 20px',
      overflowY: 'auto',
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px' }}>
        <h2 className="gradient-text" style={{ fontSize: '28px', marginBottom: '8px', textAlign: 'center' }}>
          Ro'yxatdan o'tish
        </h2>
        <p style={{ opacity: 0.6, textAlign: 'center', marginBottom: '32px' }}>
          Karyerangni boshlash uchun
        </p>

        {error && (
          <div style={{
            background: 'rgba(245,87,108,0.2)',
            border: '1px solid #f5576c',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            color: '#f5576c',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ism"
            value={form.first_name}
            onChange={e => setForm({ ...form, first_name: e.target.value })}
            style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '16px', marginBottom: '12px', outline: 'none', boxSizing: 'border-box' }}
            required
          />
          <input
            type="text"
            placeholder="Familiya"
            value={form.last_name}
            onChange={e => setForm({ ...form, last_name: e.target.value })}
            style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '16px', marginBottom: '12px', outline: 'none', boxSizing: 'border-box' }}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '16px', marginBottom: '12px', outline: 'none', boxSizing: 'border-box' }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '16px', marginBottom: '12px', outline: 'none', boxSizing: 'border-box' }}
            required
          />
          <input
            type="password"
            placeholder="Parol (kamida 8 ta belgi)"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: 'white', fontSize: '16px', marginBottom: '20px', outline: 'none', boxSizing: 'border-box' }}
            required
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '16px' }}
            disabled={loading}
          >
            {loading ? 'Yuklanmoqda...' : "Ro'yxatdan o'tish 🚀"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', opacity: 0.6 }}>
          Akkaunt bormi?{' '}
          <span
            style={{ color: '#f093fb', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Kirish
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;