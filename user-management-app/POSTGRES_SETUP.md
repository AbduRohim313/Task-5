# 🐘 Настройка PostgreSQL для Netlify

## 1. Создать продакшн базу данных:

### Варианты:
- **Neon.tech** (рекомендуется для Netlify)
- **Supabase** 
- **Railway**
- **PlanetScale**

### Пример с Neon.tech:
1. Зайти на https://neon.tech
2. Создать новый проект
3. Скопировать Connection String

## 2. Переменные окружения Netlify:

```bash
# База данных (обязательно)
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# JWT (обязательно) 
JWT_SECRET=your_super_long_secure_jwt_secret_key_here_minimum_32_chars

# Email (опционально)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Приложение
APP_URL=https://your-site.netlify.app
NODE_ENV=production
```

## 3. Prisma миграции:

Netlify автоматически выполнит `prisma generate` при сборке.
Для применения миграций на продакшн БД нужно:

1. Локально выполнить: `npx prisma migrate deploy --url="your_production_database_url"`
2. Или настроить в build команде

## 4. Обновлённые build команды:

```bash
# В netlify.toml или в UI:
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```