# Папка для уточнённых GeoJSON-файлов

Сейчас границы территорий заданы прямо в `src/data/territories.ts` как упрощённые
приблизительные полигоны (историческая реконструкция).

Когда у команды появятся более точные исторические границы (например, оцифрованные
по атласам истории Казахстана), сюда можно добавить файлы вида:

```
kazakh-khanate.geojson
golden-horde.geojson
ak-orda.geojson
moghulistan.geojson
nogai-horde.geojson
jungar-khanate.geojson
russian-empire-steppe.geojson
```

И заменить поле `geojson` соответствующей записи в `src/data/territories.ts`
на импорт из файла, например:

```ts
import kazakhKhanateGeo from '../../public/geojson/kazakh-khanate.geojson?raw';
// ...
geojson: JSON.parse(kazakhKhanateGeo),
```

Либо просто скопировать содержимое файла прямо в объект territories.ts.
