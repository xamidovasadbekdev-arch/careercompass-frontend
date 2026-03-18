import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../services/api';

const STAGE_DETAILS = {
  'Python basics': {
    topics: ['Variables, data types', 'Loops va conditions', 'Functions va OOP', 'File handling', 'Error handling'],
    resources: ['Python.org rasmiy docs', 'Corey Schafer YouTube', 'Automate the Boring Stuff'],
    tip: 'Har kuni kamida 1 ta kichik loyiha qil — amaliyot nazariyadan muhimroq!',
  },
  'Django': {
    topics: ['Models va migrations', 'Views va URLs', 'Templates', 'Forms', 'Admin panel'],
    resources: ['Django rasmiy docs', 'Dennis Ivy YouTube', 'Django for Beginners book'],
    tip: 'CRUD loyiha qilib ko\'r — bu Django ni tushunishning eng yaxshi yo\'li.',
  },
  'Django REST Framework': {
    topics: ['Serializers', 'ViewSets', 'Authentication', 'Permissions', 'Filtering'],
    resources: ['DRF rasmiy docs', 'Very Academy YouTube', 'DRF tutorial'],
    tip: 'Postman bilan har bir endpointni sinab ko\'r.',
  },
  'PostgreSQL': {
    topics: ['SQL asoslari', 'JOIN lar', 'Indexes', 'Transactions', 'Optimization'],
    resources: ['PostgreSQL docs', 'SQLZoo.net', 'Mode Analytics SQL tutorial'],
    tip: 'Real loyihada ishlatmasdan SQL ni to\'liq o\'rganib bo\'lmaydi.',
  },
  'Git & GitHub': {
    topics: ['Git asoslari', 'Branch va merge', 'Pull request', 'Conflict hal qilish', 'GitHub Actions'],
    resources: ['Git rasmiy docs', 'Atlassian Git tutorial', 'GitHub Skills'],
    tip: 'Har kuni commit qil — bu odatga aylansin!',
  },
  'Deploy': {
    topics: ['Linux asoslari', 'Nginx sozlash', 'Gunicorn', 'Docker basics', 'Railway/Render deploy'],
    resources: ['DigitalOcean tutorials', 'Railway docs', 'Docker docs'],
    tip: 'Birinchi deploydan qo\'rqma — xato bo\'ladi, lekin o\'rganasan!',
  },
  'Pandas & NumPy': {
    topics: ['DataFrame asoslari', 'Data cleaning', 'Groupby va merge', 'NumPy arrays', 'Vectorization'],
    resources: ['Pandas docs', 'Kaggle kurslari', 'Keith Galli YouTube'],
    tip: 'Kaggle dataset yuklab amaliyot qil.',
  },
  'Data Visualization': {
    topics: ['Matplotlib asoslari', 'Seaborn', 'Plotly', 'Dashboard yaratish', 'Storytelling with data'],
    resources: ['Matplotlib docs', 'Seaborn gallery', 'Data Viz Society'],
    tip: 'Har bir grafik bir narsa aytishi kerak — ortiqcha bezak qo\'yma.',
  },
  'Statistics': {
    topics: ['Ehtimollik nazariyasi', 'Distribyutsiyalar', 'Hypothesis testing', 'Regression', 'Bayesian statistics'],
    resources: ['Khan Academy Statistics', 'StatQuest YouTube', 'Think Stats book'],
    tip: 'Matematikadan qo\'rqma — statistika amaliyot bilan aniq bo\'ladi.',
  },
  'Machine Learning': {
    topics: ['Linear/Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM', 'Model evaluation'],
    resources: ['Scikit-learn docs', 'Andrew Ng Coursera', 'Hands-on ML book'],
    tip: 'Algoritm formulasini yodlashdan ko\'ra — qachon qaysi algoritmni ishlatishni bil.',
  },
  'Deep Learning': {
    topics: ['Neural network asoslari', 'CNN', 'RNN va LSTM', 'Transfer learning', 'PyTorch/TensorFlow'],
    resources: ['Fast.ai kursi', 'Deep Learning book (Goodfellow)', '3Blue1Brown YouTube'],
    tip: 'GPU kerak emas boshida — Google Colab bepul GPU beradi!',
  },
  'Python & Math': {
    topics: ['Python asoslari', 'Linear algebra', 'Calculus asoslari', 'Probability', 'NumPy bilan math'],
    resources: ['3Blue1Brown YouTube', 'Khan Academy Math', 'Gilbert Strang Linear Algebra'],
    tip: 'Math qiyin ko\'rinadi, lekin visualizatsiya bilan tushunish oson.',
  },
  'ML basics': {
    topics: ['Supervised learning', 'Unsupervised learning', 'Feature engineering', 'Cross-validation', 'Sklearn'],
    resources: ['Google ML Crash Course', 'Kaggle Learn', 'ML Mastery blog'],
    tip: 'Kaggle kompetitsiyalarida ishtirok et — real tajriba olasan.',
  },
  'LLMs & Prompt Eng': {
    topics: ['LLM qanday ishlaydi', 'Prompt engineering', 'Few-shot learning', 'Fine-tuning', 'RAG arxitekturasi'],
    resources: ['OpenAI Cookbook', 'LangChain docs', 'Andrej Karpathy YouTube'],
    tip: 'Promptlarni sinab ko\'r — har xil natijalar olasan va tushunasan.',
  },
  'AI APIs': {
    topics: ['OpenAI API', 'LangChain', 'Vector databases', 'Embeddings', 'Agents yaratish'],
    resources: ['OpenAI docs', 'LangChain docs', 'Pinecone docs'],
    tip: 'Bitta kichik AI loyiha qil — chatbot, summarizer yoki classifier.',
  },
  'Dart basics': {
    topics: ['Dart sintaksis', 'OOP Dart da', 'Async/await', 'Collections', 'Null safety'],
    resources: ['Dart rasmiy docs', 'Dart tutorials', 'Flutter YouTube'],
    tip: 'Dart o\'rganish Flutter uchun kerak — biroq uzoq vaqt ketmaydi.',
  },
  'Flutter UI': {
    topics: ['Widget tizimi', 'Stateless vs Stateful', 'Layout widgets', 'Navigation', 'Styling'],
    resources: ['Flutter rasmiy docs', 'Flutter YouTube channel', 'Reso Coder YouTube'],
    tip: 'Flutter docs juda yaxshi — har bir widget haqida misol bor.',
  },
  'State Management': {
    topics: ['setState', 'Provider', 'Riverpod', 'BLoC asoslari', 'GetX'],
    resources: ['Riverpod docs', 'Flutter BLoC library', 'FilledStacks YouTube'],
    tip: 'Provider bilan boshlа, keyin Riverpod o\'rgan — bu eng zamonaviy usul.',
  },
  'API Integration': {
    topics: ['HTTP package', 'Dio library', 'JSON parsing', 'Authentication', 'Error handling'],
    resources: ['Dio package docs', 'Flutter cookbook', 'Johannes Milke YouTube'],
    tip: 'Backend API ni Postman da sinab ko\'r, keyin Flutter da ulа.',
  },
  'Linux basics': {
    topics: ['Terminal asoslari', 'File system', 'Permissions', 'Process management', 'Shell scripting'],
    resources: ['Linux Journey', 'The Linux Command Line book', 'TryHackMe Linux'],
    tip: 'Terminal dan qo\'rqma — 20-30 ta buyruqni bilib olsang yetarli.',
  },
  'Git & CI/CD': {
    topics: ['Git workflow', 'GitHub Actions', 'GitLab CI', 'Testing pipeline', 'Automated deploy'],
    resources: ['GitHub Actions docs', 'CircleCI tutorials', 'Fireship YouTube'],
    tip: 'Har bir commit da test ishlatadigan pipeline yoz — bu yaxshi odат.',
  },
  'Docker': {
    topics: ['Container nima', 'Dockerfile yozish', 'Docker Compose', 'Image optimization', 'Registry'],
    resources: ['Docker rasmiy docs', 'TechWorld with Nana YouTube', 'Play with Docker'],
    tip: 'docker-compose bilan ishlay boshlа — u eng ko\'p ishlatiladigan tool.',
  },
  'Kubernetes': {
    topics: ['K8s arxitekturasi', 'Pod va Deployment', 'Service va Ingress', 'ConfigMap va Secrets', 'Helm'],
    resources: ['Kubernetes rasmiy docs', 'TechWorld with Nana K8s kurs', 'Katacoda'],
    tip: 'K8s murakkab — avval Docker ni yaxshi o\'rgan, keyin K8s ga o\'t.',
  },
  'Cloud (AWS)': {
    topics: ['EC2 va S3', 'RDS va DynamoDB', 'Lambda functions', 'IAM va security', 'CloudWatch'],
    resources: ['AWS rasmiy docs', 'A Cloud Guru', 'Stephane Maarek Udemy'],
    tip: 'AWS Free Tier bilan boshlа — 12 oy bepul ko\'p resurslar bor.',
  },
  'Networking basics': {
    topics: ['TCP/IP', 'DNS va HTTP', 'Firewall', 'VPN', 'Wireshark bilan tahlil'],
    resources: ['Professor Messer YouTube', 'Cisco Networking Academy', 'TryHackMe'],
    tip: 'Networking asoslarini bilmasdan cybersecurity bo\'lmaydi.',
  },
  'Web Security': {
    topics: ['OWASP Top 10', 'SQL injection', 'XSS va CSRF', 'Authentication zaifliklar', 'SSL/TLS'],
    resources: ['OWASP rasmiy sayt', 'PortSwigger Web Academy (bepul!)', 'HackTheBox'],
    tip: 'PortSwigger Academy — bu sohaning eng yaxshi bepul manbasi.',
  },
  'Ethical Hacking': {
    topics: ['Penetration testing metodologiyasi', 'Kali Linux', 'Metasploit', 'Burp Suite', 'CTF'],
    resources: ['TryHackMe', 'HackTheBox', 'TCM Security kurslari'],
    tip: 'HackTheBox va TryHackMe platformalarda mashq qil — bu eng yaxshi amaliyot.',
  },
  'HTML & CSS': {
    topics: ['HTML semantika', 'CSS asoslari', 'Flexbox va Grid', 'Responsive design', 'CSS animatsiyalar'],
    resources: ['MDN Web Docs', 'Kevin Powell YouTube', 'CSS Tricks'],
    tip: 'Flexbox va Grid ni yaxshi o\'rganmasdan React ga o\'tma!',
  },
  'JavaScript': {
    topics: ['ES6+ sintaksis', 'DOM manipulation', 'Async/await va Promises', 'Fetch API', 'Modules'],
    resources: ['javascript.info', 'Traversy Media YouTube', 'You Don\'t Know JS book'],
    tip: 'JavaScript.info — bu tilni o\'rganish uchun eng yaxshi bepul manba.',
  },
  'React': {
    topics: ['Components va JSX', 'useState va useEffect', 'Props va state', 'React Router', 'Context API'],
    resources: ['React rasmiy docs', 'Scrimba React kursi', 'Jack Herrington YouTube'],
    tip: 'React docs yangilandi — official docs dan boshlа, u juda yaxshi.',
  },
  'Kotlin basics': {
    topics: ['Kotlin sintaksis', 'OOP Kotlin da', 'Coroutines', 'Extension functions', 'Data classes'],
    resources: ['Kotlin rasmiy docs', 'Philipp Lackner YouTube', 'Android Developer docs'],
    tip: 'Java bilsang Kotlin juda tez o\'rganiladi.',
  },
  'Android UI': {
    topics: ['XML layouts', 'RecyclerView', 'Fragments', 'Navigation component', 'Material Design'],
    resources: ['Android Developer docs', 'Philipp Lackner YouTube', 'Google Codelabs'],
    tip: 'Google Codelabs — Android uchun eng yaxshi amaliy mashqlar.',
  },
  'Jetpack Compose': {
    topics: ['Composable functions', 'State management', 'Layouts', 'Animation', 'Material 3'],
    resources: ['Jetpack Compose docs', 'Philipp Lackner YouTube', 'Google Codelabs Compose'],
    tip: 'Compose kelajak — XML o\'rniga Compose o\'rgan.',
  },
  'AWS basics': {
    topics: ['EC2 virtual server', 'S3 storage', 'RDS database', 'Lambda serverless', 'IAM security'],
    resources: ['AWS Free Tier', 'A Cloud Guru', 'AWS rasmiy docs'],
    tip: 'AWS Solutions Architect Associate sertifikati karyerang uchun juda foydali.',
  },
  'Infrastructure as Code': {
    topics: ['Terraform asoslari', 'Provider va resource', 'State management', 'Modules', 'Ansible'],
    resources: ['Terraform rasmiy docs', 'HashiCorp Learn', 'TechWorld with Nana'],
    tip: 'Terraform bilan infratuzilmangni kod sifatida boshqar — bu zamonaviy usul.',
  },
  'Solidity': {
    topics: ['Smart contract asoslari', 'Data types', 'Functions va events', 'ERC-20 token', 'Security patterns'],
    resources: ['Solidity rasmiy docs', 'CryptoZombies (bepul!)', 'Patrick Collins YouTube'],
    tip: 'CryptoZombies — Solidity ni o\'rganishning eng qiziqarli yo\'li.',
  },
  'Web3.js / Ethers.js': {
    topics: ['Wallet connection', 'Contract interaction', 'Transaction yuborish', 'Events listen', 'MetaMask'],
    resources: ['Ethers.js docs', 'Buildspace.so', 'Alchemy University'],
    tip: 'Buildspace — Web3 loyiha qilish uchun eng yaxshi bepul platforma.',
  },
  'Python / C# basics': {
    topics: ['O\'zgaruvchilar va tiplar', 'Shartlar va tsikllar', 'Funksiyalar', 'OOP asoslari', 'Collections'],
    resources: ['Python.org docs', 'Microsoft C# docs', 'Brackeys YouTube (Unity uchun)'],
    tip: 'Game dev uchun C# (Unity bilan) eng ko\'p ishlatiladigan til.',
  },
  'Unity basics': {
    topics: ['Unity interfeysi', 'GameObject va Component', 'Physics engine', 'Collider va Rigidbody', 'Prefabs'],
    resources: ['Unity rasmiy docs', 'Brackeys YouTube', 'Unity Learn platforma'],
    tip: 'Unity Learn platformasida bepul rasmiy kurslar bor — shu yerdan boshlа.',
  },
  'Game Physics': {
    topics: ['Rigidbody fizikasi', 'Collision detection', 'Gravity va forces', 'Raycasting', 'Character controller'],
    resources: ['Unity Physics docs', 'Brackeys Physics YouTube', 'Game Physics cookbook'],
    tip: 'Fizika parametrlarini o\'ynab ko\'r — shunday yaxshi tushuniladi.',
  },
  'Design basics': {
    topics: ['Rang nazariyasi', 'Tipografiya', 'Kompozitsiya', 'Grid tizimi', 'Vizual ierarxiya'],
    resources: ['Canva Design School', 'Google Fonts', 'Refactoring UI book'],
    tip: 'Refactoring UI kitobini o\'qi — developer uchun dizayn tushuntirilgan.',
  },
  'Figma': {
    topics: ['Figma interfeysi', 'Frame va Auto layout', 'Components va variants', 'Prototip yaratish', 'Handoff'],
    resources: ['Figma rasmiy docs', 'DesignCourse YouTube', 'Figma community fayllar'],
    tip: 'Figma community dan tayyor dizaynlarni clone qilib o\'rgan.',
  },
  'UX Research': {
    topics: ['User interview', 'Usability testing', 'User journey map', 'Persona yaratish', 'A/B testing'],
    resources: ['Nielsen Norman Group', 'UX Collective blog', 'Google UX Design Certificate'],
    tip: 'Foydalanuvchidan so\'ra — sening fikring emas, ularniki muhim.',
  },
  'Real Projects': {
    topics: ['GitHub portfolio', 'README yozish', 'CI/CD', 'Deploy qilish', 'Kod review'],
    resources: ['GitHub guides', 'roadmap.sh', 'LeetCode'],
    tip: '2-3 ta yaxshi loyiha 10 ta yomon loyihadan yaxshiroq!',
  },
};

function Roadmap() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const field = searchParams.get('field');
  const [roadmap, setRoadmap] = useState(null);
  const [hours, setHours] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStep, setSelectedStep] = useState(null);

  useEffect(() => {
    if (field) {
      setLoading(true);
      API.get(`/roadmap/?field=${field}&hours_per_day=${hours}`)
        .then(res => {
          setRoadmap(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError('Roadmap yuklanmadi. Qayta urinib ko\'ring.');
          setLoading(false);
        });
    }
  }, [field, hours]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', fontSize: '24px' }}>
      Yuklanmoqda... ⏳
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
      <p style={{ opacity: 0.6, marginBottom: '24px' }}>{error}</p>
      <button className="btn-primary" onClick={() => navigate(-1)}>← Orqaga</button>
    </div>
  );

  if (!roadmap) return null;

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '860px', margin: '0 auto' }}>

      <button onClick={() => navigate(-1)} style={{
        background: 'none', border: 'none', color: 'white',
        cursor: 'pointer', fontSize: '16px', opacity: 0.6, marginBottom: '32px',
      }}>
        ← Orqaga
      </button>

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '8px' }}>
          <span className="gradient-text">{roadmap.title}</span> yo'li 🗺️
        </h1>
        <p style={{ opacity: 0.55, fontSize: '16px' }}>{roadmap.description}</p>
      </div>

      {/* Kunlik soat */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.7 }}>⏰ Kuniga necha soat ishlaysiz?</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map(h => (
            <button key={h} onClick={() => setHours(h)}
              style={{
                background: hours === h ? 'linear-gradient(90deg,#f093fb,#f5576c)' : 'rgba(255,255,255,0.06)',
                border: hours === h ? 'none' : '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px', padding: '12px 28px', color: 'white',
                cursor: 'pointer', fontSize: '15px', fontWeight: hours === h ? '700' : '400',
                transition: 'all 0.2s',
              }}>
              {h} soat
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '36px' }}>
        {[
          { value: `${roadmap.total_days} kun`, label: 'Jami vaqt', icon: '📅' },
          { value: `${roadmap.total_weeks} hafta`, label: 'Haftalar', icon: '📆' },
          { value: `${roadmap.total_months} oy`, label: 'Oylar', icon: '🗓️' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
            <div className="gradient-text" style={{ fontSize: '22px', fontWeight: '800' }}>{stat.value}</div>
            <div style={{ opacity: 0.5, fontSize: '13px', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Steps */}
      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        O'rganish bosqichlari
      </h2>
      <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: '24px' }}>
        Har bir bosqichga bosing — mavzular va resurslarni ko'ring
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {roadmap.steps.map((step, i) => {
          const details = STAGE_DETAILS[step.title];
          const isSelected = selectedStep === i;

          return (
            <div key={i} className="card" style={{
              borderLeft: `4px solid ${isSelected ? '#f093fb' : 'rgba(255,255,255,0.15)'}`,
              cursor: 'pointer', transition: 'all 0.3s',
              background: isSelected ? 'rgba(240,147,251,0.06)' : 'rgba(255,255,255,0.05)',
            }}
              onClick={() => setSelectedStep(isSelected ? null : i)}>

              {/* Step header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    background: isSelected ? 'linear-gradient(90deg,#f093fb,#f5576c)' : 'rgba(255,255,255,0.1)',
                    borderRadius: '50%', width: '36px', height: '36px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '15px', fontWeight: '800', flexShrink: 0, transition: 'all 0.3s',
                    color: 'white',
                  }}>
                    {step.order}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: '700' }}>{step.title}</h3>
                    <p style={{ opacity: 0.5, fontSize: '13px', marginTop: '2px' }}>{step.description}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>
                  <div className="gradient-text" style={{ fontSize: '22px', fontWeight: '800' }}>
                    {step.days_needed}
                  </div>
                  <div style={{ opacity: 0.45, fontSize: '12px' }}>kun</div>
                  <div style={{ opacity: 0.3, fontSize: '11px', marginTop: '4px' }}>
                    {isSelected ? '▲' : '▼'}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {isSelected && (
                <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                  {details ? (
                    <>
                      {/* Topics */}
                      <div style={{ marginBottom: '18px' }}>
                        <div style={{ opacity: 0.5, fontSize: '12px', marginBottom: '10px', letterSpacing: '0.5px' }}>
                          📚 O'RGANILADIGAN MAVZULAR
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {details.topics.map((topic, j) => (
                            <div key={j} style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px 14px',
                            }}>
                              <span style={{ color: '#f093fb', fontSize: '14px' }}>✓</span>
                              <span style={{ fontSize: '14px', opacity: 0.85 }}>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Resources */}
                      <div style={{ marginBottom: '18px' }}>
                        <div style={{ opacity: 0.5, fontSize: '12px', marginBottom: '10px', letterSpacing: '0.5px' }}>
                          🔗 FOYDALI RESURSLAR
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {details.resources.map((res, j) => (
                            <span key={j} style={{
                              background: 'rgba(240,147,251,0.1)',
                              border: '1px solid rgba(240,147,251,0.2)',
                              borderRadius: '20px', padding: '6px 14px',
                              fontSize: '13px', color: '#f093fb',
                            }}>
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tip */}
                      <div style={{
                        background: 'rgba(245,87,108,0.08)',
                        border: '1px solid rgba(245,87,108,0.2)',
                        borderRadius: '10px', padding: '14px 16px',
                      }}>
                        <span style={{ color: '#f5576c', fontSize: '13px', fontWeight: '600' }}>
                          💡 Maslahat:{' '}
                        </span>
                        <span style={{ fontSize: '13px', opacity: 0.8 }}>{details.tip}</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ opacity: 0.5, fontSize: '14px', padding: '8px' }}>
                      Bu bosqich haqida qo'shimcha ma'lumot tez orada qo'shiladi.
                    </div>
                  )}
                </div>
              )}

              {!isSelected && (
                <div style={{ marginTop: '10px', opacity: 0.3, fontSize: '12px' }}>
                  Bosing — mavzular va resurslarni ko'ring ↓
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final CTA */}
      <div style={{
        textAlign: 'center', marginTop: '48px', padding: '48px 32px',
        background: 'linear-gradient(135deg, rgba(240,147,251,0.08), rgba(245,87,108,0.08))',
        borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>
          Tayyor! Karyerang boshlanadi
        </h2>
        <p style={{ opacity: 0.55, marginBottom: '28px', lineHeight: 1.7 }}>
          Har kuni oz-ozdan o'rgan. Izchillik — muvaffaqiyatning asosi!
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-secondary" style={{ padding: '14px 32px', fontSize: '15px' }}
            onClick={() => navigate('/results')}>
            ← Natijalarga qaytish
          </button>
          <button className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}
            onClick={() => navigate('/')}>
            Bosh sahifa 🏠
          </button>
        </div>
      </div>

    </div>
  );
}

export default Roadmap;