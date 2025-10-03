# 🌐 Переменные окружения для Netlify

В настройках сайта Netlify (Site settings > Environment variables) добавьте следующие переменные:

## 🔐 Обязательные переменные:

### База данных:

```
DATABASE_URL=your_production_database_url
```

### JWT:

```
JWT_SECRET=your_super_secure_jwt_secret_key_here
```

### Email (если используется):

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### Приложение:

```
APP_URL=https://your-netlify-site.netlify.app
NODE_ENV=production
```

## 📝 Инструкция по настройке:

1. Перейдите в Netlify Dashboard
2. Выберите ваш сайт
3. Site settings > Environment variables
4. Добавьте все переменные из списка выше
5. Пересоберите сайт (Deploys > Trigger deploy > Clear cache and deploy)

## ⚠️ Важно:

- Используйте производственную базу данных (не dev.db)
- JWT_SECRET должен быть длинным и уникальным
- Для email используйте App Password, не обычный пароль
- APP_URL должен соответствовать вашему домену Netlify
