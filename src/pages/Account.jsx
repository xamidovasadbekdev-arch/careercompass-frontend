import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    Promise.all([
      API.get('/auth/me/'),
      API.get('/quiz/my-answers/'),
    ]).then(([userRes, answersRes]) => {
      setUser(userRes.data);
      setLoading(false);

      // Natijalar ham olish
      if (answersRes.data.count > 0) {
        API.post('/ai_analysis/analyze/').then(res => {
          setResults(res.data);
        });
      }
    }).catch(() => navigate('/login'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const handleRetakeTest = async () => {
    // Eski javoblarni o'chirish
    try {
      await API.delete('/quiz/reset/');
    } catch {}
    navigate('/quiz');
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', fontSize: '24px' }}>
      Yuklanmoqda... ⏳
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>

      {/* Profile card */}
      <div className="card" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '800',
          }}>
            {user?.first_name?.[0] || user?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700' }}>
              {user?.first_name} {user?.last_name}
            </h2>
            <p style={{ opacity: 0.6, fontSize: '14px' }}>{user?.email}</p>
            <p style={{ opacity: 0.4, fontSize: '13px' }}>@{user?.username}</p>
          </div>
        </div>
        <button
          className="btn-secondary"
          style={{ padding: '10px 24px', fontSize: '14px' }}
          onClick={handleLogout}>
          Chiqish
        </button>
      </div>

      {/* Test natijalari */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px' }}>📊 Test natijalari</h3>
          <button
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '14px' }}
            onClick={handleRetakeTest}>
            🔄 Qayta test yech
          </button>
        </div>

        {results.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {results.map((result, i) => {
              const info = FIELD_INFO[result.field_name] || { name: result.field_name, icon: '💻', color: '#f093fb' };
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{info.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '500' }}>{info.name}</span>
                      <span className="gradient-text" style={{ fontWeight: '700' }}>{result.percentage}%</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', height: '6px' }}>
                      <div style={{
                        background: `linear-gradient(90deg, ${info.color}, #f5576c)`,
                        borderRadius: '10px', height: '6px',
                        width: `${result.percentage}%`,
                      }} />
                    </div>
                  </div>
                  <button
                    style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '6px 12px', color: 'white', cursor: 'pointer', fontSize: '13px' }}
                    onClick={() => navigate(`/roadmap?field=${result.field_name}`)}>
                    Roadmap →
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
            <p>Hali test yechilmagan</p>
            <button
              className="btn-primary"
              style={{ marginTop: '16px', padding: '12px 32px' }}
              onClick={() => navigate('/quiz')}>
              Testni boshlash →
            </button>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="card" style={{ cursor: 'pointer', textAlign: 'center' }}
          onClick={() => navigate('/results')}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
          <h3 style={{ fontSize: '16px' }}>Natijalarni ko'rish</h3>
          <p style={{ opacity: 0.5, fontSize: '13px', marginTop: '4px' }}>To'liq tahlil</p>
        </div>
        <div className="card" style={{ cursor: 'pointer', textAlign: 'center' }}
          onClick={() => navigate('/')}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏠</div>
          <h3 style={{ fontSize: '16px' }}>Bosh sahifa</h3>
          <p style={{ opacity: 0.5, fontSize: '13px', marginTop: '4px' }}>Yo'nalishlarni ko'rish</p>
        </div>
      </div>
    </div>
  );
}

export default Account;