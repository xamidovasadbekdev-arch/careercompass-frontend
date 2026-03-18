import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../services/api';

function Videos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const field = searchParams.get('field');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (field) {
      API.get(`/demo/videos/?field=${field}`)
        .then(res => {
          setVideos(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError('Videolarni yuklashda xato yuz berdi!');
          setLoading(false);
        });
    }
  }, [field]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', fontSize: '24px' }}>
      Videolar yuklanmoqda... ⏳
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/results')}
        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px', opacity: 0.7, marginBottom: '32px' }}>
        ← Orqaga
      </button>

      <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>
        Demo <span className="gradient-text">darslar</span>
      </h1>
      <p style={{ opacity: 0.6, marginBottom: '40px' }}>Ko'rib yoqsa — yo'nalishingni tanlа!</p>

      {error && (
        <div style={{ background: 'rgba(245,87,108,0.2)', border: '1px solid #f5576c', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#f5576c' }}>
          {error}
        </div>
      )}

      {videos.length === 0 && !error ? (
        <div style={{ textAlign: 'center', padding: '60px', opacity: 0.6 }}>
          Videolar topilmadi 😕
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {videos.map((video, i) => (
            <div
              key={i}
              className="card"
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => window.open(video.video_url, '_blank')}>
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '15px', marginBottom: '8px', lineHeight: 1.4 }}>{video.title}</h3>
              <p style={{ opacity: 0.6, fontSize: '13px' }}>📺 {video.channel}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <button
          className="btn-primary"
          style={{ padding: '16px 50px', fontSize: '18px' }}
          onClick={() => navigate(`/roadmap?field=${field}`)}>
          Bu yo'nalishni tanlayman! 🚀
        </button>
      </div>
    </div>
  );
}

export default Videos;
