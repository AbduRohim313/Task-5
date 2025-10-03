# Настройка базы данных для продакшена

## Для PostgreSQL

1. Установите PostgreSQL на ваш сервер
2. Создайте базу данных:

```sql
CREATE DATABASE user_management;
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE user_management TO app_user;
```

3. Обновите `.env` файл:

```env
DATABASE_URL="postgresql://app_user:secure_password@localhost:5432/user_management?schema=public"
```

4. Обновите `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

5. Выполните миграцию:

```bash
npx prisma generate
npx prisma migrate deploy
```

## Для разработки (SQLite)

Текущая конфигурация использует SQLite для упрощения разработки:

```env
DATABASE_URL="file:./dev.db"
```

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

## Миграция с SQLite на PostgreSQL

1. Экспортируйте данные из SQLite (если есть тестовые данные)
2. Измените provider в schema.prisma на "postgresql"
3. Обновите DATABASE_URL
4. Выполните `npx prisma generate`
5. Выполните `npx prisma migrate dev --name switch_to_postgresql`
