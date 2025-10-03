# 🚀 Полная инструкция по развертыванию на Netlify

## ✅ Настройки Netlify (что указать):

### 🔧 Build settings:
```
Branch to deploy: main
Base directory: user-management-app
Build command: npm install && npx prisma generate && npm run build
Publish directory: user-management-app/.output/public
Functions directory: user-management-app/.netlify/functions-internal
```

### 📝 Environment Variables (обязательно):

В Netlify Dashboard → Site settings → Environment variables добавить:

```bash
# База данных
DATABASE_URL=your_production_database_url

# JWT
JWT_SECRET=super_secure_long_random_string_here

# Email (опционально)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Приложение
APP_URL=https://your-site-name.netlify.app
NODE_ENV=production
```

## 📁 Файлы готовы к деплою:

✅ `netlify.toml` - конфигурация Netlify
✅ `nuxt.config.ts` - настроен Netlify preset
✅ `.output/public/` - статические файлы
✅ `.netlify/functions-internal/` - серверные функции

## 🎯 Пошаговая инструкция:

1. **Загрузите код в GitHub**
2. **Подключите репозиторий к Netlify**
3. **Установите настройки сборки** (см. выше)
4. **Добавьте переменные окружения**
5. **Запустите Deploy**

## ⚠️ Важные моменты:

- **База данных**: Используйте продакшн БД, не SQLite файл
- **JWT_SECRET**: Должен быть уникальным и длинным (минимум 32 символа)
- **Домен**: Обновите APP_URL после получения Netlify URL
- **Функции**: Netlify автоматически обработает серверные API через Functions

## 🔍 Проверка после деплоя:

1. Открыть сайт - должна загрузиться главная страница
2. Проверить API - `/api` маршруты должны работать
3. Протестировать формы - регистрация/вход
4. Проверить CSS - универсальные стили применяются

---

**Всё готово для продакшена! 🎉**
