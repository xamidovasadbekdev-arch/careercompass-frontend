import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const isLanding = location.pathname === '/';

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(15,12,41,0.95)',
      backdropFilter: 'blur(10px)',
    }}>
      <h2
        className="gradient-text"
        style={{ fontSize: '22px', fontWeight: '800', cursor: 'pointer' }}
        onClick={() => navigate('/')}>
        CareerCompass
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isLoggedIn ? (
          <>
            <button
              className="btn-secondary"
              style={{ padding: '10px 20px', fontSize: '14px' }}
              onClick={() => navigate('/results')}>
              📊 Natijalarim
            </button>
            <button
              className="btn-secondary"
              style={{ padding: '10px 20px', fontSize: '14px' }}
              onClick={() => navigate('/account')}>
              👤 Akkaunt
            </button>
            <button
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '14px' }}
              onClick={handleLogout}>
              Chiqish
            </button>
          </>
        ) : (
          <>
            {!isLanding && (
              <button
                className="btn-secondary"
                style={{ padding: '10px 20px', fontSize: '14px' }}
                onClick={() => navigate('/login')}>
                Kirish
              </button>
            )}
            <button
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '14px' }}
              onClick={() => navigate('/register')}>
              Boshlash 🚀
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;