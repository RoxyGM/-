import React, { useRef, useEffect } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const AboutPanel: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-slate-200 leading-relaxed space-y-8 h-full overflow-y-auto">
      {/* Eyebrow */}
      <AnimatedSection delay={0}>
        <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-semibold tracking-wide">
          Оқу жобасы
        </span>
      </AnimatedSection>

      {/* Title */}
      <AnimatedSection delay={100}>
        <h2 className="text-3xl font-serif font-bold text-amber-100 mb-2">Жоба туралы</h2>
        <div className="h-px w-24 bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 mb-3" />
      </AnimatedSection>

      {/* Main description */}
      <AnimatedSection delay={200}>
        <p className="text-lg text-slate-300 leading-relaxed">
          «Қазақ тарихының атласы» — Қазақстан тарихы бойынша жасалған интерактивті веб-карта. Жобаның мақсаты — қазақ мемлекеттілігінің қалыптасуына байланысты мемлекеттер мен хандықтардың аумақтары қалай өзгергенін және әртүрлі тарихи кезеңдерде қандай негізгі оқиғалар болғанын көрсету.
        </p>
      </AnimatedSection>

      {/* Usage section */}
      <AnimatedSection delay={300}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Картаны қалай пайдалану керек
          </h3>
          
          <ul className="list-none space-y-3 ml-2">
            {[
              { icon: 'calendar', text: 'Экранның төменгі жағындағы уақыт шкаласынан жылды таңдаңыз — карта автоматты түрде жаңарады.' },
              { icon: 'play', text: 'Жылдар бойынша автоматты түрде қарау үшін «Тарихты бастау» түймесін басыңыз.' },
              { icon: 'info', text: 'Толық ақпаратты ашу үшін шайқас немесе оқиға маркерін басыңыз.' },
              { icon: 'filter', text: 'Белгілі бір оқиға түрлерін немесе мемлекеттерді көрсету үшін сол жақтағы сүзгілерді пайдаланыңыз.' }
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-300 p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-default">
                <div className="w-8 h-8 flex items-center justify-center bg-amber-500/10 rounded-full text-amber-400 shrink-0">
                  {item.icon === 'calendar' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {item.icon === 'play' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {item.icon === 'info' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {item.icon === 'filter' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  )}
                </div>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Accuracy section */}
      <AnimatedSection delay={400}>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Деректердің дәлдігі
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-lg border-l-2 border-amber-500/30">
            Картадағы тарихи мемлекеттер мен хандықтардың шекаралары шамамен алынған реконструкция болып табылады. Көшпелі мемлекеттердің нақты шекаралары қозғалмалы болған және ғылыми пікірталастардың тақырыбы болып қала береді.
          </p>
        </div>
      </AnimatedSection>

      {/* Tech section */}
      <AnimatedSection delay={500}>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Технологиялар
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-lg border-l-2 border-amber-500/30">
            Жоба React және TypeScript негізінде Leaflet интерактивті карта кітапханасын және OpenStreetMap базалық картографиялық қабатын пайдалану арқылы жүзеге асырылды.
          </p>
          
          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['React', 'TypeScript', 'Leaflet', 'Vite'].map((tech) => (
              <span key={tech} className="inline-flex items-center px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-400">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Footer info */}
      <AnimatedSection delay={600}>
        <div className="pt-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-500 text-center">
            © 2024 Қазақ тарихының атласы. Барлық құқықтар қорғалған.
          </p>
        </div>
      </AnimatedSection>

      {/* Scrollbar styling */}
      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(30, 145, 180, 0.3);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(15, 163, 59, 0.6);
        }
      `}</style>
    </div>
  );
};

export default AboutPanel;
