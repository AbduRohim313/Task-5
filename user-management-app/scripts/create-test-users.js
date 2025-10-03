import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createTestUsers() {
  const users = [
    {
      name: "Иван Петров",
      email: "ivan@example.com",
      status: "ACTIVE",
    },
    {
      name: "Мария Сидорова",
      email: "maria@example.com",
      status: "BLOCKED",
    },
    {
      name: "Алексей Федоров",
      email: "alexey@example.com",
      status: "UNVERIFIED",
    },
    {
      name: "Елена Козлова",
      email: "elena@example.com",
      status: "BLOCKED",
    },
    {
      name: "Дмитрий Волков",
      email: "dmitriy@example.com",
      status: "ACTIVE",
    },
  ];

  try {
    for (const userData of users) {
      // Проверяем, есть ли уже пользователь
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`Пользователь ${userData.email} уже существует`);
        continue;
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash("password123", 12);

      // Создаем пользователя
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          status: userData.status,
          lastLoginAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Случайная дата за последние 30 дней
        },
      });

      console.log(`Создан пользователь: ${user.name} (${user.email})`);
    }

    console.log("Все тестовые пользователи созданы!");
  } catch (error) {
    console.error("Ошибка при создании пользователей:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers();
