import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  try {
    // Проверяем, есть ли уже админ
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("Админ пользователь уже существует:", adminEmail);
      return;
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Создаем админа
    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        status: "ACTIVE",
        lastLoginAt: new Date(),
      },
    });

    console.log("Админ пользователь создан:");
    console.log("Email:", adminEmail);
    console.log("Пароль:", adminPassword);
    console.log("ID:", admin.id);
  } catch (error) {
    console.error("Ошибка при создании админа:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
