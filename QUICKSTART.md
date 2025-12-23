# 🚀 Быстрый старт: Загрузка изображений

## Способ 1: Автоматический (через GitHub Actions) ⭐️ Рекомендуется

### Шаг 1: Включить Actions

1. Перейдите: https://github.com/fenix52/fenix52.github.io/settings/actions
2. Выберите:
   - **Actions permissions**: "Allow all actions and reusable workflows"
   - **Workflow permissions**: "Read and write permissions" ✅
   - Чекбокс: "Allow GitHub Actions to create and approve pull requests" ✅
3. Нажмите **"Save"**

### Шаг 2: Запустить Workflow

1. Перейдите: https://github.com/fenix52/fenix52.github.io/actions
2. Выберите слева: **"Download Placeholder Images"**
3. Нажмите **"Run workflow"** → выберите **"main"** → **"Run workflow"**
4. Подождите 1-2 минуты ✅

### Шаг 3: Проверить результат

Откройте: https://fenix52.github.io (подождите 2-3 минуты)

---

## Способ 2: Ручной (через браузер)

### Подготовка:

1. Откройте: [images/download-links.md](images/download-links.md)
2. Скачайте все 17 изображений (клик правой кнопкой → Сохранить как...)
3. Переименуйте файлы согласно списку

### Загрузка на GitHub:

#### Hero (Главный фон)
1. https://github.com/fenix52/fenix52.github.io/tree/main/images/hero
2. **"Add file"** → **"Upload files"**
3. Перетащите `hero-bg.jpg`
4. **"Commit changes"**

#### Services (Услуги)
1. https://github.com/fenix52/fenix52.github.io/tree/main/images/services
2. **"Add file"** → **"Upload files"**
3. Перетащите 4 файла (brick.jpg, thermopanel.jpg, insulation.jpg, complex.jpg)
4. **"Commit changes"**

#### Projects (Проекты)
1. https://github.com/fenix52/fenix52.github.io/tree/main/images/projects
2. **"Add file"** → **"Upload files"**
3. Перетащите 12 файлов (project-1-before.jpg ... project-6-after.jpg)
4. **"Commit changes"**

---

## Способ 3: Через Git (для профессионалов)

```bash
# Клонировать
git clone https://github.com/fenix52/fenix52.github.io.git
cd fenix52.github.io

# Создать папки
mkdir -p images/hero images/services images/projects

# Загрузить изображения (см. images/download-links.md)
curl -L "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80" -o images/hero/hero-bg.jpg

# ... остальные команды см. в download-links.md

# Отправить
git add images/
git commit -m "🖼️ Добавлены placeholder-изображения"
git push origin main
```

---

## ❗ Важно

После загрузки изображений:

1. ✅ Подождите 2-3 минуты для GitHub Pages
2. ✅ Откройте https://fenix52.github.io
3. ✅ Очистите кэш браузера (Ctrl+F5)

---

## 👉 Следующие шаги

После загрузки placeholder'ov:

1. 📞 **Обновите контакты** в `index.html`:
   - Телефон: `+7 (995) 776-75-75`
   - Email: `info@arzamas-decor.ru`
   - Адрес: `14-й микрорайон, Арзамас`

2. 🗺️ **Добавьте карту**:
   - https://yandex.ru/map-widget/constructor
   - Создайте карту с меткой
   - Вставьте код в `index.html` (секция `contacts`)

3. 📈 **Подключите аналитику**:
   - Yandex.Metrika: https://metrika.yandex.ru
   - Google Analytics: https://analytics.google.com
   - Вставьте ID в `index.html`

4. 📸 **Замените на реальные фото**:
   - Сфотографируйте ваши реальные проекты
   - Оптимизируйте через https://tinypng.com
   - Замените в тех же папках

---

Удачи! 🚀
