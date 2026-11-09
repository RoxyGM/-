import React from 'react';
import './AboutPanel.css';

export const AboutPanel: React.FC = () => {
  return (
    <div className="about-panel">
      <div className="about-panel__inner">
        <span className="about-panel__eyebrow">ҒЫЛЫМИ-ТАРИХИ АТЛАС</span>

        <h2>Жоба туралы</h2>

        <p>
          «Қазақ тарихының атласы» — Қазақстан тарихы мен қазақ мемлекеттілігінің қалыптасу,
          даму және аумақтық өзгеру кезеңдерін көрнекі бейнелейтін интерактивті геоақпараттық зерттеу жобасы.
        </p>

        <p>
          Жоба Алтын Орданың ыдырауынан бастап Қазақ хандығының дәуірлеуі, үш жүздің құрылуы, көршілес мемлекеттермен
          (Жоңғар хандығы, Ресей империясы, Қоқан және Хиуа хандықтары) арадағы шекаралық қатынастар мен негізгі
          тарихи шайқастардың кеңістіктік-хронологиялық барысын қамтиды.
        </p>

        <h3>Картаны қалай пайдалану керек</h3>

        <ul>
          <li><strong>Уақыт шкаласы:</strong> Экранның төменгі жағындағы сырғытпа арқылы қажетті жылды таңдаңыз (1200–1900 жж.).</li>
          <li><strong>Тарихты бастау (Автоплей):</strong> Жылдар динамикасын уақыт ағымымен автоматты түрде қарау үшін ойнату түймесін басыңыз.</li>
          <li><strong>Оқиға маркерлері:</strong> Картадағы семсер (⚔️) белгішелерін басу арқылы шайқастар мен оқиғалардың толық тарихи-аналитикалық карточкасын ашыңыз.</li>
          <li><strong>Сүзгілер мен Іздеу:</strong> Жоғарғы оң жақтағы «Сүзгілер» батырмасы мен іздеу жолағы арқылы оқиғаларды мемлекеттер мен жылдар бойынша сүзгіден өткізіңіз.</li>
        </ul>

        {/* Структурированный блок источников */}
        <section className="about-sources">
          <div className="about-sources__header">
            <h3 className="about-sources__title">
              <span className="about-sources__title-icon">📚</span>
              Ғылыми негіздер мен дереккөздер
            </h3>
            <p className="about-sources__intro">
              Атластағы мемлекеттік шекаралардың реконструкциясы, тарихи аумақтардың шектері және шайқастардың
              нақты географиялық координаттары академиялық зерттеулерге, жазба жылнамаларға, ресми мұрағаттық
              құжаттар мен картографиялық басылымдарға негізделген.
            </p>
          </div>

          {/* 1. Использованная литература */}
          <div className="about-source-block">
            <div className="about-source-block__head">
              <span className="about-source-block__icon">📖</span>
              <h4 className="about-source-block__heading">1. Пайдаланылған әдебиеттер (Использованная литература)</h4>
            </div>
            <p className="about-source-block__desc">
              Іргелі ғылыми монографиялар, академиялық зерттеулер мен деректі құжаттар жинақтары:
            </p>
            <ul className="about-source-list">
              <li className="about-source-item">
                «Казахско-русские отношения в XVIII–XIX веках (1771–1867 годы)» (Сборник документов и материалов). — Алма-Ата: Наука, 1964. (Раздел второй: 1822–1847 годы).
              </li>
              <li className="about-source-item">
                «Материалы по истории казахских ханств XV–XVIII веков» (Извлечения из персидских и тюркских сочинений) / Сост.: С.К. Ибрагимов, Н.Н. Мингулов, К.А. Пищулина, В.П. Юдин. — Алма-Ата: Наука, 1969.
              </li>
              <li className="about-source-item">
                «История Казахстана с древнейших времен до наших дней» (Академическое пятитомное издание, тома 2–3) / Институт истории и этнологии им. Ч.Ч. Валиханова. — Алматы: Ғылым / Атамұра.
              </li>
              <li className="about-source-item">
                Мырза Мұхаммед Хайдар Дулати. «Тарих-и Рашиди» (Қазақ хандығының құрылу кезеңі туралы негізгі жазба дереккөз).
              </li>
              <li className="about-source-item">
                Фазлаллах ибн Рузбихан Исфахани. «Михман-наме-йи Бухара» («Записки бухарского гостя») / Перевод с персидского, предисловие и комментарии Р.П. Джалиловой. — Москва: Восточная литература, 1976.
              </li>
              <li className="about-source-item">
                Қадырғали Жалайыр. «Жылнамалар жинағы» («Джами ат-таварих») — қазақ хандарының шежіресі мен мемлекеттік құрылымы туралы тарихи еңбек.
              </li>
              <li className="about-source-item">
                Вяткин М.П. «Батыр Срым» (монографическое исследование национально-освободительного движения в Младшем жузе). — Москва–Ленинград: Изд-во АН СССР, 1947.
              </li>
              <li className="about-source-item">
                Қасымбаев Ж.Қ. «Кенесары хан — мемлекет қайраткері, қолбасшы және дипломат». — Алматы, 2005.
              </li>
              <li className="about-source-item">
                Абусеитова М.Х. «Казахское ханство во второй половине XVI века». — Алма-Ата: Наука, 1985.
              </li>
              <li className="about-source-item">
                Басин В.Я. «Россия и казахские ханства в XVI–XVIII вв.». — Алма-Ата: Наука, 1971.
              </li>
            </ul>

            <div className="about-source-placeholder">
              <span className="about-source-placeholder-icon">ℹ️</span>
              <span>
                <strong>Плейсхолдер:</strong> Қосымша әдебиеттерді толықтыру үшін: [Автор. «Еңбек / монография атауы». — Қала: Баспа, жылы].
              </span>
            </div>
          </div>

          {/* 2. Архивные источники */}
          <div className="about-source-block">
            <div className="about-source-block__head">
              <span className="about-source-block__icon">🏛️</span>
              <h4 className="about-source-block__heading">2. Мұрағаттық дереккөздер (Архивные источники)</h4>
            </div>
            <p className="about-source-block__desc">
              Тарихи оқиғалар, рапорттар мен елшілік хат алмасулары сақталған мемлекеттік мұрағаттар мен құжаттар:
            </p>
            <ul className="about-source-list">
              <li className="about-source-item">
                <span className="about-archive-entity">Центральный государственный архив Республики Казахстан (ЦГА РК / ҚР ОМА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Рапорт подполковника Геке оренбургскому военному губернатору В.А. Перовскому о событиях в Букеевской Орде»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Центральный государственный архив Республики Казахстан (ЦГА РК / ҚР ОМА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Рапорты подполковника Геке оренбургскому военному губернатору о сражении при урочище Тастобе»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Центральный государственный архив Республики Казахстан (ЦГА РК / ҚР ОМА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Официальная переписка и рапорты о восстании под предводительством Исатая Тайманова и Махамбета Утемисова»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Центральный государственный архив Республики Казахстан (ЦГА РК / ҚР ОМА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Дипломатическая переписка казахских ханов и султанов с Оренбургской пограничной комиссией»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Центральный государственный архив Республики Казахстан (ЦГА РК / ҚР ОМА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Сведения и рапорты окружных приказов о восстании султана Саржана и хана Кенесары Касымова»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Российский государственный военно-исторический архив (РГВИА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Официальный отчет оренбургского генерал-губернатора В.А. Перовского в Военное министерство о боевых действиях при Акбулаке»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Российский государственный военно-исторический архив (РГВИА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Военно-топографические описания и журналы военных действий отрядов в Степном крае»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Российский государственный военно-исторический архив (РГВИА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Рапорты и донесения о штурме Акмолинского укрепления сарбазами Кенесары Касымова»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Российский государственный военно-исторический архив (РГВИА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Журналы военных действий и рапорты об осаде кокандской крепости Акмечеть и Узунагачском сражении»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Архив внешней политики Российской империи (АВПРИ)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Посольские дела и дипломатическая переписка России с правителями Казахского ханства и джунгарскими хунтайджи»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Архив внешней политики Российской империи (АВПРИ)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Материалы дипломатических переговоров хана Абулхаира и посольской миссии А.И. Тевкелева»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Российский государственный архив древних актов (РГАДА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Посольские книги по связям Русского государства с Ногайской Ордой и Казахским ханством»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Российский государственный архив древних актов (РГАДА)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Дела Сибирского приказа: донесения служилых людей об Орбулакском сражении и походах Батура-хунтайджи»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Институт восточных рукописей РАН (Санкт-Петербург)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Рукописные списки восточных хроник "Тарих-и Абулхайр-хани" Масуда Кухистани и "Шараф-наме-йи шахи" Хафиза Таныша Бухари»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Институт востоковедения Академии наук Республики Узбекистан (Ташкент)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Рукописные списки "Мунтахаб ат-таварих-и Мукими" и "Тарих-и Муким-хани" Мухаммеда Юсуфа Мунши»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Центр рукописей и редких книг Национальной академии наук РК</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Рукописные фонды исторических толгау Махамбета Утемисова и устных шежіре о казахских батырах»</span>
              </li>
              <li className="about-source-item">
                <span className="about-archive-entity">Первый исторический архив Китая (Пекин)</span>
                <span className="about-archive-sep">—</span>
                <span className="about-archive-doc">«Императорские маньчжурские хроники и переписка цинского двора с правителями Казахского ханства»</span>
              </li>
            </ul>

            <div className="about-source-placeholder">
              <span className="about-source-placeholder-icon">ℹ️</span>
              <span>
                <strong>Плейсхолдер:</strong> Қосымша мұрағаттық жазбаны қосу үшін (тек мұрағат пен құжат атауы): [Мұрағат атауы] — «[Құжаттың / рапорттың / хаттың нақты атауы]».
              </span>
            </div>
          </div>

          {/* 3. Картографические источники */}
          <div className="about-source-block">
            <div className="about-source-block__head">
              <span className="about-source-block__icon">🗺️</span>
              <h4 className="about-source-block__heading">3. Картографиялық дереккөздер мен атластар (Картографические источники)</h4>
            </div>
            <p className="about-source-block__desc">
              Шекараларды реконструкциялау және шайқастардың гео-локацияларын бекіту үшін негіз болған картографиялық еңбектер:
            </p>
            <ul className="about-source-list">
              <li className="about-source-item">
                <strong>«Қазақстан Республикасының Ұлттық атласы» (Национальный атлас Республики Казахстан)</strong> — 1-том («Табиғи жағдайлар мен ресурстар») және 3-том («Әлеуметтік-экономикалық даму және тарихы»). Бас редактор: Ә.Р. Медеу. — Алматы, 2010.
              </li>
              <li className="about-source-item">
                <strong>«Қазақстанның тарихи-географиялық атласы» (Историко-географический атлас Казахстана)</strong> — Ш.Ш. Уәлиханов атындағы Тарих және этнология институтының тарихи карталары мен картографиялық реконструкциялары.
              </li>
              <li className="about-source-item">
                <strong>«Карта земель киргиз-кайсацких орд и сопредельных с ними владений»</strong> — Военно-топографическое депо Военного министерства Российской империи (XIX ғ. ортасы).
              </li>
              <li className="about-source-item">
                <strong>«Генеральная карта Западной Сибири и Степного края»</strong> — Бас штабтың әскери-топографиялық бөлімі (шекаралық бекініс шептері, өзен бойлары және қазақ руларының көшу бағыттары).
              </li>
              <li className="about-source-item">
                <strong>Тарихи шекаралардың ғылыми реконструкциялары</strong> — Қазақ хандығы, Алтын Орда, Ноғай Ордасы, Әбілқайыр хандығы мен Моғолстан мемлекеттерінің саяси шекаралары бойынша К.А. Пищулина, Т.И. Султанов және М.Қ. Қозыбаевтың зерттеу карталары.
              </li>
              <li className="about-source-item">
                <strong>Заманауи спутниктік және геодезиялық координаттық базалар</strong> — Сырдария, Жайық (Орал), Есіл, Іле, Шу, Талас, Қиыл өзендері алқаптары мен Нарын құмы, Бұланты, Аңырақай, Тастөбе, Ақбұлақ тарихи шатқалдарының координаттық нақтылаулары.
              </li>
            </ul>

            <div className="about-source-placeholder">
              <span className="about-source-placeholder-icon">ℹ️</span>
              <span>
                <strong>Плейсхолдер:</strong> Қосымша картографиялық деректі қосу үшін: [«Атлас / Карта атауы» — Баспасы, авторы, масштабы немесе нақтыланған тарихи өңірі].
              </span>
            </div>
          </div>
        </section>

        <div className="about-panel__footer">
          © 2026 Қазақ тарихының атласы. Барлық құқықтар қорғалған.
        </div>
      </div>
    </div>
  );
};

export default AboutPanel;