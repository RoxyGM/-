import { CATEGORY_ICONS, CATEGORY_LABELS } from '../../types';
import type { HistoricalEvent } from '../../types';
import './EventCard.css';

interface EventCardProps {
  event: HistoricalEvent | null;
  onClose: () => void;
}

export function EventCard({ event, onClose }: EventCardProps) {
  if (!event) return null;

  // Извлечение координат (поддержка latitude/longitude и массива coordinates)
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
        <div className="event-card__drag-handle" aria-hidden="true" />
        <button className="event-card__close" onClick={onClose} aria-label="Жабу" title="Жабу">
          ×
        </button>

        {/* 1. Тақырып және статусы */}
        <div className="event-card__eyebrow">
          <span className="event-card__category">
            {CATEGORY_ICONS[event.category] || '⚔️'} {CATEGORY_LABELS[event.category] || 'Шайқас'}
          </span>
          {event.outcome && (
            <span
              className={`event-card__outcome-badge ${
                event.outcome === 'Жеңіс'
                  ? 'event-card__outcome-badge--win'
                  : event.outcome === 'Жеңіліс'
                  ? 'event-card__outcome-badge--defeat'
                  : 'event-card__outcome-badge--draw'
              }`}
            >
              {event.outcome}
            </span>
          )}
        </div>

        <h2 className="event-card__title">{event.name}</h2>

        {/* Ескерту плашкасы (қажет болғанда) */}
        {needsWarning && (
          <div
            style={{
              padding: '10px 14px',
              marginBottom: '16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#FCA5A5',
              fontSize: '0.82rem',
              lineHeight: '1.45',
            }}
          >
            ⚠️ <strong>Академиялық ескерту:</strong> Бұл оқиғаның нақты локациясы немесе жекелеген мерзімдері жазба деректерде шамамен алынған және тарихнамалық нақтылауды қажет етеді.
          </div>
        )}

        {/* Жылдам мета-деректер */}
        <div className="event-card__meta">
          <div className="event-card__meta-item">
            <span className="event-card__meta-label">Дәуірі / Жылы</span>
            <span className="event-card__meta-value">
              {event.year}
              {event.yearEnd && event.yearEnd !== event.year ? `–${event.yearEnd}` : ''} жж.
            </span>
          </div>
          {event.dateLabel && (
            <div className="event-card__meta-item">
              <span className="event-card__meta-label">Нақты мерзімі</span>
              <span className="event-card__meta-value">{event.dateLabel}</span>
            </div>
          )}
          {event.location && (
            <div className="event-card__meta-item">
              <span className="event-card__meta-label">Аумақ</span>
              <span className="event-card__meta-value">{event.location}</span>
            </div>
          )}
          {typeof lat === 'number' && typeof lng === 'number' && (
            <div className="event-card__meta-item">
              <span className="event-card__meta-label">Координаталары</span>
              <span className="event-card__meta-value">
                {lat.toFixed(2)}° N, {lng.toFixed(2)}° E
              </span>
            </div>
          )}
        </div>

        {event.imageUrl && (
          <img className="event-card__image" src={event.imageUrl} alt={event.name} />
        )}

        {/* 2. Жергілікті орын және гео-бағдарлар */}
        {(event.region || event.location) && (
          <div className="event-card__section">
            <div className="event-card__section-header">
              <span className="event-card__section-icon">📍</span>
              <h3 className="event-card__section-title">Жергілікті орын мен географиялық бағдарлар</h3>
            </div>
            <div className="event-card__region-box">
              {event.region || event.location}
            </div>
          </div>
        )}

        {/* 3. Тараптар мен қолбасшылар */}
        {(event.sidesAndLeaders || event.commanders) && (
          <div className="event-card__section">
            <div className="event-card__section-header">
              <span className="event-card__section-icon">🛡️</span>
              <h3 className="event-card__section-title">Тараптар мен қолбасшылар</h3>
            </div>

            {event.sidesAndLeaders ? (
              <div className="event-card__sides-grid">
                <div className="event-card__side-card">
                  <div className="event-card__side-title">{event.sidesAndLeaders.sideA.name}</div>
                  <p className="event-card__side-leaders">
                    <strong>Басшылар:</strong> {event.sidesAndLeaders.sideA.leaders.join(', ')}
                  </p>
                  {event.sidesAndLeaders.sideA.forces && (
                    <div className="event-card__side-forces">
                      <strong>Әскер:</strong> {event.sidesAndLeaders.sideA.forces}
                    </div>
                  )}
                </div>

                <div className="event-card__side-card">
                  <div className="event-card__side-title">{event.sidesAndLeaders.sideB.name}</div>
                  <p className="event-card__side-leaders">
                    <strong>Басшылар:</strong> {event.sidesAndLeaders.sideB.leaders.join(', ')}
                  </p>
                  {event.sidesAndLeaders.sideB.forces && (
                    <div className="event-card__side-forces">
                      <strong>Әскер:</strong> {event.sidesAndLeaders.sideB.forces}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              event.commanders && (
                <div className="event-card__side-card">
                  {typeof event.commanders === 'object' && !Array.isArray(event.commanders) ? (
                    <div>
                      {event.commanders.kazakh && (
                        <p className="event-card__side-leaders">
                          <strong>Қазақ қолбасшылары:</strong> {event.commanders.kazakh.join(', ')}
                        </p>
                      )}
                      {event.commanders.opponents && (
                        <p className="event-card__side-leaders" style={{ marginTop: '6px' }}>
                          <strong>Қарсыластар:</strong> {event.commanders.opponents.join(', ')}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="event-card__side-leaders">
                      <strong>Қолбасшылар:</strong> {(event.commanders as string[]).join(', ')}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        )}

        {/* 4. Тарихи контекст пен себептері */}
        {(event.cause || event.description) && (
          <div className="event-card__section">
            <div className="event-card__section-header">
              <span className="event-card__section-icon">⚖️</span>
              <h3 className="event-card__section-title">Тарихи контекст пен себептері</h3>
            </div>
            <p className="event-card__prose">
              {event.cause || event.description}
            </p>
          </div>
        )}

        {/* 5. Қақтығыстың сипаты мен кезеңдері */}
        {((event.coursePhases && event.coursePhases.length > 0) || event.course) && (
          <div className="event-card__section">
            <div className="event-card__section-header">
              <span className="event-card__section-icon">⚔️</span>
              <h3 className="event-card__section-title">Қақтығыстың сипаты мен кезеңдері</h3>
            </div>

            {event.coursePhases && event.coursePhases.length > 0 ? (
              <ul className="event-card__phases">
                {event.coursePhases.map((phase, idx) => (
                  <li key={idx} className="event-card__phase-item">
                    <div className="event-card__phase-title">{phase.stage}</div>
                    <p className="event-card__phase-desc">{phase.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="event-card__prose">{event.course}</p>
            )}
          </div>
        )}

        {/* 6. Салдары мен мемлекеттілікке ықпалы */}
        {(event.significance || event.result || event.casualties) && (
          <div className="event-card__section">
            <div className="event-card__section-header">
              <span className="event-card__section-icon">🏛️</span>
              <h3 className="event-card__section-title">Салдары мен тарихи мәні</h3>
            </div>
            {event.significance && (
              <p className="event-card__prose" style={{ marginBottom: '8px' }}>
                {event.significance}
              </p>
            )}
            {event.result && (
              <p className="event-card__prose" style={{ fontStyle: 'italic', color: '#e2e8f0' }}>
                <strong>Қорытынды:</strong> {event.result}
              </p>
            )}
            {event.casualties && (
              <p className="event-card__prose" style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '6px' }}>
                <strong>Шығындар мен демографиялық салдары:</strong> {event.casualties}
              </p>
            )}
          </div>
        )}

        {/* 7. Дереккөздер мен архивтік құжаттар */}
        {((event.sourcesAndArchives && event.sourcesAndArchives.length > 0) || (event.sources && event.sources.length > 0)) && (
          <div className="event-card__section">
            <div className="event-card__section-header">
              <span className="event-card__section-icon">📜</span>
              <h3 className="event-card__section-title">Дереккөздер мен архивтер</h3>
            </div>

            {event.sourcesAndArchives && event.sourcesAndArchives.length > 0 ? (
              <ul className="event-card__archives-list">
                {event.sourcesAndArchives.map((src, i) => (
                  <li key={i} className="event-card__archive-item">
                    <div className="event-card__archive-title">
                      {src.url ? (
                        <a href={src.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold-soft)' }}>
                          {src.title}
                        </a>
                      ) : (
                        src.title
                      )}
                    </div>
                    {src.archiveRef && (
                      <div className="event-card__archive-ref">📂 Мұрағат қоры: {src.archiveRef}</div>
                    )}
                    {(src.author || src.docType) && (
                      <div className="event-card__archive-author">
                        {src.author && <span>🏛️ Дереккөз: {src.author} </span>}
                        {src.docType && (
                          <span style={{ color: 'var(--color-gold-soft)' }}>
                            {src.author ? `(${src.docType})` : `📚 ${src.docType}`}
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="event-card__archives-list">
                {event.sources?.map((s, i) => (
                  <li key={i} className="event-card__archive-item">
                    <div className="event-card__archive-title">
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold-soft)' }}>
                          {s.title}
                        </a>
                      ) : (
                        s.title
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}