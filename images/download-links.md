# 📥 Прямые ссылки на бесплатные изображения

## Инструкция по скачиванию

### Автоматическая загрузка (через скрипт)

Создайте файл `download-images.sh` и выполните:

```bash
#!/bin/bash

# Создать структуру папок
mkdir -p images/hero images/services images/projects

# Hero фон
curl -L "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop" -o images/hero/hero-bg.jpg

# Услуги
curl -L "https://images.unsplash.com/photo-1599619292530-d2f2f93db37f?w=800&h=600&fit=crop" -o images/services/brick.jpg
curl -L "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop" -o images/services/thermopanel.jpg
curl -L "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop" -o images/services/insulation.jpg
curl -L "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop" -o images/services/complex.jpg

# Проекты (Before)
curl -L "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop" -o images/projects/project-1-before.jpg
curl -L "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop" -o images/projects/project-2-before.jpg
curl -L "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=1200&h=800&fit=crop" -o images/projects/project-3-before.jpg
curl -L "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&h=800&fit=crop" -o images/projects/project-4-before.jpg
curl -L "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=1200&h=800&fit=crop" -o images/projects/project-5-before.jpg
curl -L "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop" -o images/projects/project-6-before.jpg

# Проекты (After)
curl -L "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop" -o images/projects/project-1-after.jpg
curl -L "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop" -o images/projects/project-2-after.jpg
curl -L "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop" -o images/projects/project-3-after.jpg
curl -L "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=800&fit=crop" -o images/projects/project-4-after.jpg
curl -L "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop" -o images/projects/project-5-after.jpg
curl -L "https://images.unsplash.com/photo-1600607688960-e095ff83135f?w=1200&h=800&fit=crop" -o images/projects/project-6-after.jpg

echo "✅ Все изображения загружены!"
```

Запуск:
```bash
chmod +x download-images.sh
./download-images.sh
```

---

## Ручное скачивание (клик правой кнопкой → Сохранить как...)

### 🏠 Hero Background (1920x1080)

**Файл**: `images/hero/hero-bg.jpg`

**Ссылка**: [Скачать Hero фон](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80)

**Источник**: Unsplash - Modern house facade

---

### 🧱 Услуги (800x600)

#### 1. Гибкий кирпич
**Файл**: `images/services/brick.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1599619292530-d2f2f93db37f?w=800&h=600&fit=crop&q=80)

**Источник**: Unsplash - Brick wall texture

---

#### 2. Термопанели
**Файл**: `images/services/thermopanel.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop&q=80)

**Источник**: Unsplash - Modern wall panels

---

#### 3. Утепление фасада
**Файл**: `images/services/insulation.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&q=80)

**Источник**: Unsplash - Wall insulation work

---

#### 4. Комплексное решение
**Файл**: `images/services/complex.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&q=80)

**Источник**: Unsplash - House renovation

---

### 📸 Проекты - "До" (1200x800)

#### Проект 1 - До
**Файл**: `images/projects/project-1-before.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop&q=80)

---

#### Проект 2 - До
**Файл**: `images/projects/project-2-before.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&q=80)

---

#### Проект 3 - До
**Файл**: `images/projects/project-3-before.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=1200&h=800&fit=crop&q=80)

---

#### Проект 4 - До
**Файл**: `images/projects/project-4-before.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&h=800&fit=crop&q=80)

---

#### Проект 5 - До
**Файл**: `images/projects/project-5-before.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=1200&h=800&fit=crop&q=80)

---

#### Проект 6 - До
**Файл**: `images/projects/project-6-before.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop&q=80)

---

### 📸 Проекты - "После" (1200x800)

#### Проект 1 - После
**Файл**: `images/projects/project-1-after.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80)

---

#### Проект 2 - После
**Файл**: `images/projects/project-2-after.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80)

---

#### Проект 3 - После
**Файл**: `images/projects/project-3-after.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop&q=80)

---

#### Проект 4 - После
**Файл**: `images/projects/project-4-after.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=800&fit=crop&q=80)

---

#### Проект 5 - После
**Файл**: `images/projects/project-5-after.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop&q=80)

---

#### Проект 6 - После
**Файл**: `images/projects/project-6-after.jpg`

**Ссылка**: [Скачать](https://images.unsplash.com/photo-1600607688960-e095ff83135f?w=1200&h=800&fit=crop&q=80)

---

## 📋 Итого файлов: 17

- 1 Hero фон
- 4 Услуги
- 12 Проекты (6 до + 6 после)

## ⚖️ Лицензия

Все изображения из **Unsplash** - лицензия позволяет бесплатное коммерческое использование без указания авторства (но рекомендуется указать).

**Подробнее**: https://unsplash.com/license

---

## 🔄 После загрузки

1. Оптимизируйте изображения через [TinyPNG](https://tinypng.com)
2. Загрузите в соответствующие папки на GitHub
3. Сайт автоматически обновится через GitHub Pages
