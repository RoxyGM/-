import type { ReactNode } from 'react';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '../../types';
import type { HistoricalEvent } from '../../types';
import './EventCard.css';

interface EventCardProps {
  event: HistoricalEvent | null;
  onClose: () => void;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="event-card__section">
      <h3 style={{ color: '#EAB308', fontSize: '0.95rem', letterSpacing: '0.05em', marginBottom: '6px', textTransform: 'uppercase' }}>
        {title}
      </h3>
      <div style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#D1D5DB' }}>
        {children}
      </div>
    </section>
  );
}

export function EventCard({ event, onClose }: EventCardProps) {
  if (!event) return null;

  // Извлечение координат (поддержка и latitude/longitude, и массива coordinates)
  let lat = event.latitude;
  let lng = event.longitude;
  if ((lat === undefined || lng === undefined) && Array.isArray(event.coordinates)) {
    lat = event.coordinates[0];
    lng = event.coordinates[1];
  }

  const needsWarning = event.needsVerification || event.isLocationApproximate || event.isDateApproximate;

  return (
    <div className="event-card-overlay" role="dialog" aria-modal="true" aria-label={event.name}>
      <div className="event-card-backdrop" onClick={onClose} />
      <aside className="event-card">
        <button className="event-card__close" onClick={onClose} aria-label="Жабу">
          ×
        </button>

        {/* Категория */}
        <div className="event-card__eyebrow">
          <span className="event-card__category">
            {CATEGORY_ICONS[event.category] || '📌'} {CATEGORY_LABELS[event.category] || event.category}
          </span>
        </div>

        <h2 className="event-card__title">{event.name}</h2>

        {/* Плашка сомнительных данных */}
        {needsWarning && (
          <div style={{
            padding: '10px 14px',
            marginBottom: '16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FCA5A5',
            fontSize: '0.85rem'
          }}>
            ⚠️ <strong>Тарихи дерек ескертуі:</strong> Бұл оқиғаның деректері, өтетін орны немесе датасы қосымша академикалық тексеруді талап етеді (шамамен алынған).
          </div>
        )}

        {/* Метаданные */}
        <div className="event-card__meta">
          <div>
            <span className="event-card__meta-label">ЖЫЛ</span>
            <span className="event-card__meta-value">
              {event.year}
              {event.yearEnd && event.yearEnd !== event.year ? `–${event.yearEnd}` : ''}
            </span>
          </div>
          {event.dateLabel && (
            <div>
              <span className="event-card__meta-label">КҮНІ</span>
              <span className="event-card__meta-value">
                {event.dateLabel}
                {event.isDateApproximate && <em> (шамамен)</em>}
              </span>
            </div>
          )}
          {event.location && (
            <div>
              <span className="event-card__meta-label">ОРНЫ</span>
              <span className="event-card__meta-value">
                {event.location}
                {event.isLocationApproximate && <em> (шамамен)</em>}
              </span>
            </div>
          )}
          {typeof lat === 'number' && typeof lng === 'number' && (
            <div>
              <span className="event-card__meta-label">КООРДИНАТТАРЫ</span>
              <span className="event-card__meta-value">
                {lat.toFixed(2)}, {lng.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {event.imageUrl && (
          <img className="event-card__image" src={event.imageUrl} alt={event.name} />
        )}

        {/* Участники */}
        {Array.isArray(event.participants) && event.participants.length > 0 && (
          <Section title="Қатысушы тараптар мен тұлғалар">
            <p>{event.participants.join(' — ')}</p>
          </Section>
        )}

        {/* Командующие */}
        {event.commanders && (
          <Section title="Қолбасшылар мен басшылар">
            {typeof event.commanders === 'object' && !Array.isArray(event.commanders) ? (
              <div>
                {event.commanders.kazakh && <p><strong>Қазақ қолбасшылары:</strong> {event.commanders.kazakh.join(', ')}</p>}
                {event.commanders.opponents && <p><strong>Қарсыластар:</strong> {event.commanders.opponents.join(', ')}</p>}
              </div>
            ) : (
              <p>{(event.commanders as string[]).join(', ')}</p>
            )}
          </Section>
        )}

        {/* 1. Описание */}
        {event.description && (
          <Section title="Оқиғаның қысқаша мәні">
            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#F3F4F6' }}>
              {event.description}
            </p>
          </Section>
        )}

        {/* 2. Причины */}
        {event.cause && (
          <Section title="1. Шайқастың / Оқиғаның себептері">
            <p>{event.cause}</p>
          </Section>
        )}

        {/* 3. Ход событий */}
        {event.course && (
          <Section title="2. Оқиғаның барысы">
            <p>{event.course}</p>
          </Section>
        )}

        {/* Разделение сторон */}
        {Array.isArray(event.sides) && event.sides.length > 0 && (
          <Section title="Тараптардың күштері мен ұстанымы">
            <ul className="event-card__sides">
              {event.sides.map((s, idx) => (
                <li key={idx}>
                  <strong>{s.side}</strong> — {s.description}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 4. Итоги */}
        {(event.result || event.outcome || event.casualties) && (
          <Section title="3. Нәтижесі мен салдары">
            {event.result && <p>{event.result}</p>}
            {event.outcome && <p><strong>Қорытынды:</strong> {event.outcome}</p>}
            {event.casualties && <p><strong>Шығындар / Деректер:</strong> {event.casualties}</p>}
          </Section>
        )}

        {/* 5. Историческое значение */}
        {event.significance && (
          <Section title="4. Тарихи маңызы">
            <p style={{ fontStyle: 'italic', color: '#E2E8F0' }}>{event.significance}</p>
          </Section>
        )}

        {/* Источники */}
        {Array.isArray(event.sources) && event.sources.length > 0 && (
          <Section title="Дереккөздер мен әдебиеттер">
            <ul className="event-card__sources">
              {event.sources.map((s, i) => (
                <li key={i}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.title}
                    </a>
                  ) : (
                    s.title
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </aside>
    </div>
  );
}