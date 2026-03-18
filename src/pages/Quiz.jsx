import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const SCORE_LABELS = {
  5: "Bu men haqimda! 🔥",
  4: "Ko'pincha shunday 😊",
  3: "Ba'zida 😐",
  2: "Kamdan-kam 😕",
  1: "Bu men emasman 👎",
};

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get('/quiz/questions/').then(res => {
      setQuestions(res.data);
      setLoading(false);
    }).catch(() => navigate('/login'));
  }, [navigate]);

  const handleAnswer = (score) => {
    const newAnswers = { ...answers, [questions[current].id]: score };
    setAnswers(newAnswers);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const formatted = Object.entries(answers).map(([question, score]) => ({ question: parseInt(question), score }));
    try {
      await API.post('/quiz/submit/', { answers: formatted });
      navigate('/results');
    } catch {
      alert('Xato yuz berdi!');
    }
    setSubmitting(false);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '24px' }}>Yuklanmoqda... ⏳</div>;

  const progress = ((current + 1) / questions.length) * 100;
  const question = questions[current];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ opacity: 0.7 }}>Savol {current + 1} / {questions.length}</span>
            <span className="gradient-text" style={{ fontWeight: '600' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', height: '8px' }}>
            <div style={{ background: 'linear-gradient(90deg, #f093fb, #f5576c)', borderRadius: '10px', height: '8px', width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', lineHeight: 1.5 }}>{question.text}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[5, 4, 3, 2, 1].map(score => (
            <button key={score} onClick={() => handleAnswer(score)}
              style={{ background: answers[question.id] === score ? 'linear-gradient(90deg, #f093fb, #f5576c)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '16px', color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
              {SCORE_LABELS[score]}
            </button>
          ))}
        </div>

        {current === questions.length - 1 && Object.keys(answers).length === questions.length && (
          <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '18px', marginTop: '24px' }}
            onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Tahlil qilinmoqda... ⏳' : 'Natijani ko\'rish 🚀'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
