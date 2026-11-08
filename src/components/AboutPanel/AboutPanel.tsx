import React from 'react';

export const AboutPanel: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#fde047' }}>
        Жоба туралы
      </h2>

      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px', color: '#cbd5e1' }}>
        «Қазақ тарихының атласы» — Қазақстан тарихы бойынша жасалған интерактивті веб-карта. Жобаның мақсаты — қазақ мемлекеттілігінің қалыптасуына байланысты мемлекеттер мен хандықтардың аумақтары қалай өзгергенін көрсету.
      </p>

      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#fde047' }}>
        Картаны қалай пайдалану керек
      </h3>

      <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.8', color: '#cbd5e1' }}>
        <li>Экранның төменгі жағындағы уақыт шкаласынан жылды таңдаңыз.</li>
        <li>Жылдар бойынша автоматты түрде қарау үшін «Тарихты бастау» түймесін басыңыз.</li>
        <li>Толық ақпаратты ашу үшін шайқас немесе оқиға маркерін басыңыз.</li>
      </ul>

      <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #334155', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
        © 2024 Қазақ тарихының атласы. Барлық құқықтар қорғалған.
      </div>
    </div>
  );
};

export default AboutPanel;