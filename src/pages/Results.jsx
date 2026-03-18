import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const FIELD_INFO = {
  backend: { name: 'Backend Development', icon: '⚙️', color: '#f093fb' },
  frontend: { name: 'Frontend Development', icon: '🎨', color: '#4facfe' },
  data_science: { name: 'Data Science', icon: '📊', color: '#43e97b' },
  ml: { name: 'Machine Learning', icon: '🤖', color: '#fa709a' },
  ai_engineering: { name: 'AI Engineering', icon: '🧠', color: '#f5576c' },
  flutter: { name: 'Flutter Mobile', icon: '📱', color: '#a18cd1' },
  android: { name: 'Android Dev', icon: '🤖', color: '#43e97b' },
  ios: { name: 'iOS Development', icon: '🍎', color: '#4facfe' },
  devops: { name: 'DevOps', icon: '🚀', color: '#fda085' },
  cybersecurity: { name: 'Cybersecurity', icon: '🔐', color: '#f5576c' },
  blockchain: { name: 'Blockchain', icon: '⛓️', color: '#f093fb' },
  game_dev: { name: 'Game Dev', icon: '🎮', color: '#43e97b' },
  ui_ux: { name: 'UI/UX Design', icon: '✏️', color: '#4facfe' },
  cloud: { name: 'Cloud Engineering', icon: '☁️', color: '#a18cd1' },
  qa: { name: 'QA Testing', icon: '🧪', color: '#fda085' },
};

function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.post('/ai_analysis/analyze/').then(res => {
      setResults(res.data);
      setLoading(false);
    }).catch(() => navigate('/login'));
  }, [navigate]);

  if (loading) return (
  <div style={{ textAlign: 'center', padding: '100px' }}>
    <div style={{
      width: '60px', height: '60px',
      border: '4px solid rgba(255,255,255,0.1)',
      borderTop: '4px solid #f093fb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 24px',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Tahlil qilinmoqda...</h2>
    <p style={{ opacity: 0.55, fontSize: '16px' }}>Javoblaringiz ko'rib chiqilmoqda</p>
  </div>
);

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '12px' }}>
          Sening <span className="gradient-text">natijang</span> 🎯
        </h1>
        <p style={{ opacity: 0.6, fontSize: '18px' }}>Javoblaringiz asosida eng mos yo'nalishlar</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
        {results.map((result, i) => {
          const info = FIELD_INFO[result.field_name] || { name: result.field_name, icon: '💻', color: '#f093fb' };
          return (
            <div key={i} className="card" style={{ borderLeft: `4px solid ${info.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{info.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '20px' }}>{info.name}</h3>
                    {i === 0 && <span style={{ background: 'linear-gradient(90deg,#f093fb,#f5576c)', borderRadius: '20px', padding: '2px 10px', fontSize: '12px' }}>Eng mos ✨</span>}
                  </div>
                </div>
                <span className="gradient-text" style={{ fontSize: '32px', fontWeight: '800' }}>{result.percentage}%</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', height: '8px' }}>
                <div style={{ background: `linear-gradient(90deg, ${info.color}, #f5576c)`, borderRadius: '10px', height: '8px', width: `${result.percentage}%`, transition: 'width 1s' }} />
              </div>
              <button className="btn-secondary" style={{ marginTop: '16px', width: '100%' }}
                onClick={() => navigate(`/videos?field=${result.field_name}`)}>
                Demo darslarni ko'rish →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results; 
