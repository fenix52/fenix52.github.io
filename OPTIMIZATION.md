# ⚡ Оптимизация производительности

## 🎯 **Цели**

- 🚀 **Page Load Time**: < 2 секунды
- ⚡ **First Contentful Paint**: < 1.5 секунды
- 📊 **Lighthouse Score**: 90+
- 📱 **Mobile-Friendly**: 100%

---

## ✅ **Выполнено**

### 1. ✅ Lazy Loading изображений
**Файл**: `js/lazy-load.js`

**Как подключить**:
```html
<!-- Добавьте перед </body> -->
<script src="/js/lazy-load.js"></script>
```

**Как использовать**:
```html
<!-- Вместо -->
<img src="/images/hero/hero-bg.jpg" alt="...">

<!-- Используйте -->
<img data-src="/images/hero/hero-bg.jpg" alt="..." src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E">
```

**Эффект**: Сокращение начальной загрузки на 50-70%

---

## 🛠️ **Что нужно сделать**

### 2. 🗄️ Минификация CSS

**Онлайн-инструменты**:
- https://cssminifier.com/
- https://www.minifier.org/

**Что делать**:
1. Открыть каждый CSS файл
2. Скопировать содержимое на cssminifier.com
3. Сохранить как `{name}.min.css`

**Пример**:
```
css/header.css       → css/header.min.css
css/services.css     → css/services.min.css
css/calculator.css   → css/calculator.min.css
...
```

**Обновить в HTML**:
```html
<link rel="stylesheet" href="/css/header.min.css">
<link rel="stylesheet" href="/css/services.min.css">
```

**Эффект**: Сокращение размера CSS на 30-40%

---

### 3. 🗄️ Минификация JavaScript

**Онлайн-инструменты**:
- https://javascript-minifier.com/
- https://www.minifier.org/

**Что делать**:
1. Открыть каждый JS файл
2. Минифицировать
3. Сохранить как `{name}.min.js`

**Обновить в HTML**:
```html
<script src="/js/header.min.js" defer></script>
<script src="/js/calculator.min.js" defer></script>
<script src="/js/lazy-load.min.js" defer></script>
```

**Эффект**: Сокращение размера JS на 40-50%

---

### 4. 🖼️ Оптимизация изображений

**Онлайн-сервисы**:
- ⭐ https://tinypng.com/ (рекомендуется)
- https://squoosh.app/
- https://compressor.io/

**Что делать**:
1. Загрузить все изображения на TinyPNG
2. Скачать оптимизированные версии
3. Заменить в репозитории

**Какие картинки оптимизировать**:
```
images/hero/hero-bg.jpg
images/services/brick.jpg
images/services/thermopanel.jpg
images/services/insulation.jpg
images/projects/*.jpg
```

**Рекомендуемые размеры**:
- Hero: 1920x1080px (max 300KB)
- Services: 800x600px (max 150KB)
- Projects: 1200x800px (max 200KB)

**Эффект**: Сокращение размера на 60-80% без потери качества

---

### 5. 📱 Мобильная адаптация

**Проверьте на этих разрешениях**:
- 📱 320px (iPhone SE)
- 📱 375px (iPhone X/11/12)
- 📱 414px (iPhone Plus)
- 📱 768px (iPad Portrait)
- 💻 1024px (iPad Landscape)

**Инструменты для проверки**:
1. Chrome DevTools (F12 → Toggle Device Toolbar)
2. https://www.responsinator.com/
3. https://search.google.com/test/mobile-friendly

**Что проверить**:
- [ ] Текст читается (min 16px)
- [ ] Кнопки кликабельны (min 44x44px)
- [ ] Нет горизонтальной прокрутки
- [ ] Меню работает
- [ ] Калькулятор удобен
- [ ] Формы заполняются

**Исправления** (если нужны):
```css
/* Добавьте в main.css */
@media (max-width: 480px) {
    body {
        font-size: 16px;
    }
    
    .btn {
        min-height: 44px;
        min-width: 44px;
        padding: 12px 24px;
    }
    
    /* Предотвращение overflow */
    * {
        max-width: 100%;
    }
    
    img {
        height: auto;
    }
}
```

---

### 6. ⚡ Async/Defer для скриптов

**Обновить в HTML**:

```html
<!-- Некритичные скрипты -->
<script src="/js/animations.js" defer></script>
<script src="/js/lazy-load.js" defer></script>

<!-- Аналитика -->
<script src="https://mc.yandex.ru/metrika/tag.js" async></script>
<script src="https://www.googletagmanager.com/gtag/js" async></script>
```

**Разница**:
- `defer`: Загружается параллельно, выполняется после DOM
- `async`: Загружается параллельно, выполняется сразу

---

### 7. 🗜️ Удаление неиспользуемого CSS

**Инструмент**:
- https://purifycss.online/
- Chrome DevTools → Coverage

**Как проверить**:
1. Открыть DevTools (F12)
2. Ctrl+Shift+P → набрать "Coverage"
3. Нажать запись
4. Перезагрузить страницу
5. Посмотреть неиспользуемый CSS

---

### 8. 🌐 CDN для шрифтов

**Текущее**:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**Оптимизированное** (только нужные начертания):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## 📊 **Проверка производительности**

### Google PageSpeed Insights
https://pagespeed.web.dev/

**Цели**:
- 📊 Performance: 90+
- ♿ Accessibility: 95+
- 🔍 Best Practices: 90+
- 🎯 SEO: 95+

### GTmetrix
https://gtmetrix.com/

**Цели**:
- Performance: A
- Structure: A
- Fully Loaded Time: < 3s

---

## 🛠️ **Быстрые исправления** (5 минут)

```html
<!-- 1. Добавьте в <head> -->
<link rel="preload" href="/css/main.css" as="style">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">

<!-- 2. Обновите viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">

<!-- 3. Добавьте theme-color -->
<meta name="theme-color" content="#E74C3C">

<!-- 4. Добавьте перед </body> -->
<script src="/js/lazy-load.js" defer></script>
```

---

## 📝 **Checklist**

### Перед запуском:
- [ ] Минифицировать CSS
- [ ] Минифицировать JS
- [ ] Оптимизировать изображения
- [ ] Добавить lazy loading
- [ ] Проверить мобильную версию
- [ ] Добавить defer/async
- [ ] Проверить PageSpeed
- [ ] Проверить Mobile-Friendly

---

## 🚀 **Результат**

После всех оптимизаций:
- ⚡ **Загрузка быстрее на 60-80%**
- 📱 **Идеальная мобильная версия**
- 📊 **Lighthouse Score 90+**
- 🎯 **Лучший SEO**

---

🎉 **Успехов!**