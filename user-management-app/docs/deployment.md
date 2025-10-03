# Руководство по развертыванию

## Быстрый старт (локальная разработка)

1. Клонируйте репозиторий
2. Установите зависимости: `npm install`
3. Скопируйте настройки: `cp .env.example .env`
4. Инициализируйте базу данных: `npm run init`
5. Запустите приложение: `npm run dev`

## Переменные окружения

### Обязательные

- `DATABASE_URL` - URL подключения к базе данных
- `JWT_SECRET` - Секретный ключ для JWT токенов

### Опциональные (для email)

- `EMAIL_HOST` - SMTP сервер (по умолчанию: smtp.gmail.com)
- `EMAIL_PORT` - Порт SMTP (по умолчанию: 587)
- `EMAIL_USER` - Email для отправки
- `EMAIL_PASSWORD` - Пароль email (для Gmail используйте App Password)
- `APP_URL` - URL приложения (по умолчанию: http://localhost:3000)

## Развертывание на Vercel

1. Подключите GitHub репозиторий к Vercel
2. Настройте переменные окружения в Vercel Dashboard
3. Для базы данных используйте Vercel Postgres или внешний PostgreSQL
4. Добавьте build команду: `npm run build`

### Пример настройки для Vercel:

```env
DATABASE_URL="postgres://username:password@host:port/database?sslmode=require"
JWT_SECRET="your-super-secret-key-here"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
APP_URL="https://your-app.vercel.app"
```

## Развертывание на Railway

1. Подключите GitHub репозиторий к Railway
2. Railway автоматически создаст PostgreSQL базу данных
3. Настройте переменные окружения
4. Railway автоматически деплоит при push в main

## Развертывание на DigitalOcean App Platform

1. Создайте новое приложение в DigitalOcean
2. Подключите GitHub репозиторий
3. Добавьте PostgreSQL базу данных
4. Настройте переменные окружения
5. Деплой происходит автоматически

## Docker развертывание

Создайте `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
```

И `docker-compose.yml`:

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/user_management
      - JWT_SECRET=your-secret-key
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=user_management
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## После развертывания

1. Проверьте работу регистрации
2. Настройте email отправку (Gmail App Password или SMTP сервис)
3. Создайте первого администратора
4. Протестируйте все функции админ панели

## Мониторинг и логи

- Используйте `console.log` для отладки в development
- Настройте внешний сервис логирования для production
- Мониторьте производительность базы данных
- Настройте резервное копирование БД
