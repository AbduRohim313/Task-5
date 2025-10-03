import { PrismaClient } from '@prisma/client'

// Важно: Глобальная переменная для предотвращения создания множественных подключений
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Обратите внимание: Создаем единственный экземпляр Prisma Client
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Полезно: Функция для получения уникального ID
export function getUniqIdValue(): string {
  return crypto.randomUUID()
}
