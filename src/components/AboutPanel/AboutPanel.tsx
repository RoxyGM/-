import React from 'react';

export const AboutPanel: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-slate-200 leading-relaxed space-y-6 h-full overflow-y-auto">
      <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-semibold">
        Оқу жобасы
      </span>
      <h2 className="text-3xl font-serif font-bold text-amber-100">Жоба туралы</h2>
      
      <p className="text-slate-300">
        «Қазақ тарихының атласы» — Қазақстан тарихы бойынша жасалған интерактивті веб-карта. Жобаның мақсаты — қазақ мемлекеттілігінің қалыптасуына байланысты мемлекеттер мен хандықтардың аумақтары қалай өзгергенін және әртүрлі тарихи кезеңдерде қандай негізгі оқиғалар болғанын көрсету.
      </p>

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-amber-300">Картаны қалай пайдалану керек</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
          <li>Экранның төменгі жағындағы уақыт шкаласынан жылды таңдаңыз — карта автоматты түрде жаңарады.</li>
          <li>Жылдар бойынша автоматты түрде қарау үшін «Тарихты бастау» түймесін басыңыз.</li>
          <li>Толық ақпаратты ашу үшін шайқас немесе оқиға маркерін басыңыз.</li>
          <li>Белгілі бір оқиға түрлерін немесе мемлекеттерді көрсету үшін сол жақтағы сүзгілерді пайдаланыңыз.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-amber-300">Деректердің дәлдігі</h3>
        <p className="text-sm text-slate-300">
          Картадағы тарихи мемлекеттер мен хандықтардың шекаралары шамамен алынған реконструкция болып табылады. Көшпелі мемлекеттердің нақты шекаралары қозғалмалы болған және ғылыми пікірталастардың тақырыбы болып қала береді.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-amber-300">Технологиялар</h3>
        <p className="text-sm text-slate-300">
          Жоба React және TypeScript негізінде Leaflet интерактивті карта кітапханасын және OpenStreetMap базалық картографиялық қабатын пайдалану арқылы жүзеге асырылды.
        </p>
      </div>
    </div>
  );
};