import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FIELDS = [
  {
    id: 'backend', name: 'Backend Development', icon: '⚙️', color: '#f093fb',
    salary: '$800-3000', demand: 'Juda yuqori',
    skills: ['Python', 'Django', 'PostgreSQL', 'API'],
    desc: 'Server tomoni mantiqini, ma\'lumotlar bazasini va API larni yaratadi.',
    daily: ['API endpoint yozish va test qilish', 'Database modellarini loyihalash', 'Xatolarni topib tuzatish', 'Kod review qilish'],
  },
  {
    id: 'frontend', name: 'Frontend Development', icon: '🎨', color: '#4facfe',
    salary: '$700-2500', demand: 'Yuqori',
    skills: ['React', 'HTML', 'CSS', 'JavaScript'],
    desc: 'Foydalanuvchi ko\'radigan interfeys va vizual qismlarni yaratadi.',
    daily: ['UI komponentlar yaratish', 'Backend API bilan integratsiya', 'Responsive dizayn qilish', 'Performance optimizatsiya'],
  },
  {
    id: 'data_science', name: 'Data Science', icon: '📊', color: '#43e97b',
    salary: '$1000-4000', demand: 'Juda yuqori',
    skills: ['Python', 'Pandas', 'ML', 'Statistics'],
    desc: 'Katta ma\'lumotlarni tahlil qilib, biznes qarorlarini yaxshilaydi.',
    daily: ['Ma\'lumotlarni tozalash', 'Statistik tahlil qilish', 'Grafik va vizualizatsiyalar', 'Hisobot tayyorlash'],
  },
  {
    id: 'ml', name: 'Machine Learning', icon: '🤖', color: '#fa709a',
    salary: '$1200-5000', demand: 'Eng yuqori',
    skills: ['PyTorch', 'TensorFlow', 'Math', 'Python'],
    desc: 'Aqlli modellar va algoritmlarini yaratib, muammolarni avtomatik hal qiladi.',
    daily: ['Model arxitekturasini loyihalash', 'Dataset tayyorlash', 'Model natijalarini baholash', 'Production ga deploy qilish'],
  },
  {
    id: 'flutter', name: 'Flutter Mobile', icon: '📱', color: '#a18cd1',
    salary: '$800-3000', demand: 'Yuqori',
    skills: ['Dart', 'Flutter', 'Firebase', 'UI'],
    desc: 'iOS va Android uchun bir vaqtda mobile ilovalar yaratadi.',
    daily: ['Mobile UI screen yaratish', 'State management', 'API integratsiya qilish', 'App store ga publish'],
  },
  {
    id: 'devops', name: 'DevOps', icon: '🚀', color: '#fda085',
    salary: '$1000-4000', demand: 'Yuqori',
    skills: ['Docker', 'K8s', 'AWS', 'CI/CD'],
    desc: 'Dasturiy ta\'minotni deploy va boshqarish jarayonlarini avtomatlashtiradi.',
    daily: ['CI/CD pipeline sozlash', 'Server monitoring', 'Docker container boshqarish', 'Xavfsizlik masalalari'],
  },
  {
    id: 'cybersecurity', name: 'Cybersecurity', icon: '🔐', color: '#f5576c',
    salary: '$1200-5000', demand: 'Juda yuqori',
    skills: ['Linux', 'Networking', 'Hacking', 'Security'],
    desc: 'Tizim va ma\'lumotlarni kiberhujumlardan himoya qiladi.',
    daily: ['Zaifliklarni tekshirish', 'Penetration testing', 'Xavfsizlik hisobotlari', 'Hodisalarga javob berish'],
  },
  {
    id: 'ui_ux', name: 'UI/UX Design', icon: '✏️', color: '#4facfe',
    salary: '$600-2500', demand: 'O\'rta',
    skills: ['Figma', 'Design', 'Research', 'Prototype'],
    desc: 'Foydalanuvchi uchun qulay va chiroyli interfeys dizayn qiladi.',
    daily: ['Foydalanuvchi tadqiqoti', 'Wireframe yaratish', 'Figma da dizayn', 'Developerlar bilan hamkorlik'],
  },
  {
    id: 'android', name: 'Android Development', icon: '📲', color: '#43e97b',
    salary: '$800-3500', demand: 'Yuqori',
    skills: ['Kotlin', 'Java', 'Android', 'Firebase'],
    desc: 'Android qurilmalar uchun maxsus ilovalar yaratadi.',
    daily: ['Activity va Fragment yaratish', 'API bilan integratsiya', 'App optimizatsiya', 'Google Play ga yuklash'],
  },
  {
    id: 'cloud', name: 'Cloud Engineering', icon: '☁️', color: '#a18cd1',
    salary: '$1200-5000', demand: 'Eng yuqori',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform'],
    desc: 'Bulut texnologiyalari asosida kengaytiriladigan tizimlar quradi.',
    daily: ['Cloud infratuzilma loyihalash', 'Xarajatlarni optimallashtirish', 'Avtomatik scaling sozlash', 'Backup va recovery'],
  },
  {
    id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: '#f093fb',
    salary: '$1500-6000', demand: 'O\'sib bormoqda',
    skills: ['Solidity', 'Web3', 'Ethereum', 'DeFi'],
    desc: 'Markazlashmagan ilovalar va aqlli shartnomalar yaratadi.',
    daily: ['Smart contract yozish', 'Blockchain network bilan ishlash', 'DApp frontend yaratish', 'Xavfsizlik audit'],
  },
  {
    id: 'game_dev', name: 'Game Development', icon: '🎮', color: '#fda085',
    salary: '$700-3000', demand: 'O\'rta',
    skills: ['Unity', 'C#', 'Unreal', 'Physics'],
    desc: 'Kompyuter va mobil o\'yinlar yaratadi.',
    daily: ['Game mechanics programmlash', 'Level dizayn qilish', 'Animatsiya va fizika', 'Performance optimizatsiya'],
  },
];

const STATS = [
  { value: '12+', label: "IT yo'nalish", icon: '🎯' },
  { value: '40', label: 'Savol', icon: '📝' },
  { value: '5 min', label: 'Vaqt', icon: '⏱️' },
  { value: '100%', label: 'Bepul', icon: '🎁' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Ro\'yxatdan o\'t', desc: 'Tez va oson — faqat email va parol kerak', icon: '👤' },
  { step: '02', title: '40 ta savol yech', desc: 'Qiziqishlar, kuchli tomonlar va maqsadlar haqida', icon: '📝' },
  { step: '03', title: 'Natijangni ko\'r', desc: '3 ta eng mos yo\'nalish foiz bilan ko\'rsatiladi', icon: '📊' },
  { step: '04', title: 'Roadmap ol', desc: 'Junior darajaga olib chiqadigan shaxsiy yo\'l xaritasi', icon: '🗺️' },
];

function Landing() {
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % FIELDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>

      {/* HERO */}
      <div style={{
        minHeight: '90vh', display: 'flex', alignItems: 'center',
        padding: '60px', maxWidth: '1200px', margin: '0 auto', gap: '60px',
      }}>
        {/* Left */}
        <div style={{
          flex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(240,147,251,0.12)', border: '1px solid rgba(240,147,251,0.25)',
            borderRadius: '20px', padding: '8px 18px', fontSize: '14px',
            color: '#f093fb', marginBottom: '28px',
          }}>
            🎯 Karyerangni to'g'ri yo'naltiramiz
          </div>

          <h1 style={{ fontSize: '64px', fontWeight: '900', lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-1px' }}>
            O'zingga mos<br />
            <span className="gradient-text">IT yo'nalishni</span><br />
            top!
          </h1>

          <p style={{ fontSize: '18px', opacity: 0.65, marginBottom: '44px', lineHeight: 1.8, maxWidth: '480px' }}>
            40 ta savol orqali sening qiziqishlaring va kuchli tomonlaringni tahlil qilamiz.
            Junior darajaga olib chiqadigan shaxsiy roadmap olasiz.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {isLoggedIn ? (
              <>
                <button className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}
                  onClick={() => navigate('/results')}>
                  Natijalarimni ko'rish →
                </button>
                <button className="btn-secondary" style={{ fontSize: '17px', padding: '16px 36px' }}
                  onClick={() => navigate('/account')}>
                  Akkauntim
                </button>
              </>
            ) : (
              <>
                <button className="btn-primary" style={{ fontSize: '17px', padding: '16px 36px' }}
                  onClick={() => navigate('/register')}>
                  Testni boshlash →
                </button>
                <button className="btn-secondary" style={{ fontSize: '17px', padding: '16px 36px' }}
                  onClick={() => navigate('/login')}>
                  Kirish
                </button>
              </>
            )}
          </div>

          {/* Mini stats */}
          <div style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
            {[
              { val: '500+', label: 'Foydalanuvchi' },
              { val: '12+', label: 'Yo\'nalish' },
              { val: '95%', label: 'Muvaffaqiyat' },
            ].map((s, i) => (
              <div key={i}>
                <div className="gradient-text" style={{ fontSize: '28px', fontWeight: '800' }}>{s.val}</div>
                <div style={{ opacity: 0.5, fontSize: '13px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — animated cards */}
        <div style={{
          flex: 1, position: 'relative', height: '500px',
          opacity: visible ? 1 : 0, transition: 'all 1s ease 0.3s',
        }}>
          {FIELDS.slice(0, 6).map((field, i) => (
            <div key={i} className="card" style={{
              position: 'absolute', top: `${i * 72}px`,
              left: i % 2 === 0 ? '0' : '60px', width: '300px',
              transition: 'all 0.6s ease',
              opacity: activeIndex === i ? 1 : 0.25,
              transform: activeIndex === i ? 'scale(1.06) translateX(12px)' : 'scale(0.97)',
              borderLeft: `3px solid ${field.color}`,
              zIndex: activeIndex === i ? 10 : 1, padding: '16px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>{field.icon}</span>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>{field.name}</div>
                  <div style={{ opacity: 0.5, fontSize: '13px' }}>💰 {field.salary}/oy</div>
                </div>
                {activeIndex === i && (
                  <div style={{
                    marginLeft: 'auto', background: `${field.color}22`,
                    border: `1px solid ${field.color}44`, borderRadius: '12px',
                    padding: '3px 10px', fontSize: '12px', color: field.color,
                  }}>
                    {field.demand}
                  </div>
                )}
              </div>
              {activeIndex === i && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                  {field.skills.map((skill, j) => (
                    <span key={j} style={{
                      background: `${field.color}18`, borderRadius: '8px',
                      padding: '2px 8px', fontSize: '11px', color: field.color,
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: '80px 60px', background: 'rgba(255,255,255,0.02)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
          Qanday <span className="gradient-text">ishlaydi?</span>
        </h2>
        <p style={{ textAlign: 'center', opacity: 0.5, marginBottom: '56px', fontSize: '16px' }}>
          4 ta oson qadam
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px', maxWidth: '1000px', margin: '0 auto',
        }}>
          {HOW_IT_WORKS.map((item, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div style={{ fontSize: '44px', marginBottom: '16px' }}>{item.icon}</div>
              <div style={{
                background: 'linear-gradient(90deg, #f093fb, #f5576c)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontSize: '13px', fontWeight: '700', marginBottom: '8px', letterSpacing: '1px',
              }}>
                QADAM {item.step}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ opacity: 0.55, fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ padding: '80px 60px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {STATS.map((stat, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{stat.icon}</div>
              <div className="gradient-text" style={{ fontSize: '40px', fontWeight: '900' }}>{stat.value}</div>
              <div style={{ opacity: 0.55, marginTop: '6px', fontSize: '15px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FIELDS */}
      <div style={{ padding: '60px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
          Trend <span className="gradient-text">IT yo'nalishlar</span>
        </h2>
        <p style={{ textAlign: 'center', opacity: 0.5, marginBottom: '48px', fontSize: '16px' }}>
          Ustiga bosing — batafsil ma'lumot oling
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {FIELDS.map((field, i) => (
            <div key={i} className="card" style={{
              cursor: 'pointer', transition: 'all 0.3s',
              borderTop: `3px solid ${field.color}`,
              transform: selectedField?.id === field.id ? 'scale(1.02)' : 'scale(1)',
            }}
              onMouseEnter={e => { if (selectedField?.id !== field.id) e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { if (selectedField?.id !== field.id) e.currentTarget.style.transform = 'translateY(0)'; }}
              onClick={() => setSelectedField(selectedField?.id === field.id ? null : field)}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '36px' }}>{field.icon}</span>
                <span style={{
                  background: `${field.color}18`, border: `1px solid ${field.color}33`,
                  borderRadius: '20px', padding: '4px 10px', fontSize: '11px', color: field.color,
                }}>
                  {field.demand}
                </span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>{field.name}</h3>
              <p style={{ opacity: 0.55, fontSize: '13px', marginBottom: '14px', lineHeight: 1.6 }}>{field.desc}</p>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {field.skills.map((skill, j) => (
                  <span key={j} style={{
                    background: `${field.color}15`, border: `1px solid ${field.color}30`,
                    borderRadius: '10px', padding: '3px 10px', fontSize: '12px', color: field.color,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* Expanded */}
              {selectedField?.id === field.id ? (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', marginTop: '4px' }}>

                  {/* Maosh va talab */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                      <div style={{ opacity: 0.45, fontSize: '12px', marginBottom: '4px' }}>O'rtacha maosh</div>
                      <div style={{ color: field.color, fontWeight: '800', fontSize: '18px' }}>{field.salary}/oy</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ opacity: 0.45, fontSize: '12px', marginBottom: '4px' }}>Bozor talabi</div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>{field.demand}</div>
                    </div>
                  </div>

                  {/* Nima bilan shug'ullanadi */}
                  <div style={{
                    background: 'rgba(255,255,255,0.04)', borderRadius: '10px',
                    padding: '14px', marginBottom: '14px',
                  }}>
                    <div style={{ opacity: 0.5, fontSize: '12px', marginBottom: '6px' }}>💼 Nima bilan shug'ullanadi</div>
                    <p style={{ fontSize: '13px', lineHeight: 1.7, opacity: 0.8 }}>{field.desc}</p>
                  </div>

                  {/* Kunlik hayot */}
                  <div style={{
                    background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '14px',
                  }}>
                    <div style={{ opacity: 0.5, fontSize: '12px', marginBottom: '10px' }}>📅 Kunlik ish hayoti</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {field.daily?.map((item, k) => (
                        <div key={k} style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          fontSize: '13px', opacity: 0.75,
                        }}>
                          <span style={{ color: field.color, fontSize: '16px' }}>→</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div style={{ opacity: 0.35, fontSize: '13px', textAlign: 'center', paddingTop: '4px' }}>
                  Batafsil ko'rish ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        textAlign: 'center', padding: '100px 60px',
        background: 'linear-gradient(135deg, rgba(240,147,251,0.08), rgba(245,87,108,0.08))',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '16px', lineHeight: 1.1 }}>
          Karyerangni <span className="gradient-text">hoziroq</span><br />boshlash vaqti!
        </h2>
        <p style={{ opacity: 0.55, marginBottom: '40px', fontSize: '18px', lineHeight: 1.7 }}>
          Atigi 5 daqiqa — va sening IT karyerang yo'li aniq bo'ladi
        </p>
        {isLoggedIn ? (
          <button className="btn-primary" style={{ fontSize: '20px', padding: '18px 60px' }}
            onClick={() => navigate('/results')}>
            Natijalarimni ko'rish 🎯
          </button>
        ) : (
          <button className="btn-primary" style={{ fontSize: '20px', padding: '18px 60px' }}
            onClick={() => navigate('/register')}>
            Bepul boshlash 🚀
          </button>
        )}
      </div>

    </div>
  );
}

export default Landing;