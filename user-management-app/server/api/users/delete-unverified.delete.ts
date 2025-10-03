import { prisma } from '../../../lib/db'

export default defineEventHandler(async (event) => {
  // Важно: Проверяем метод запроса
  if (getMethod(event) !== 'DELETE') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    // Обратите внимание: Находим всех неподтвержденных пользователей
    const unverifiedUsers = await prisma.user.findMany({
      where: {
        status: 'UNVERIFIED'
      },
      select: {
        id: true,
        email: true
      }
    })

    if (unverifiedUsers.length === 0) {
      return {
        success: true,
        message: 'Нет неподтвержденных пользователей для удаления',
        deleted: 0
      }
    }

    // Важно: Удаляем связанные токены верификации
    await prisma.verificationToken.deleteMany({
      where: {
        email: {
          in: unverifiedUsers.map(user => user.email)
        }
      }
    })

    // Полезно: Удаляем неподтвержденных пользователей
    const result = await prisma.user.deleteMany({
      where: {
        status: 'UNVERIFIED'
      }
    })

    return {
      success: true,
      message: `Удалено ${result.count} неподтвержденных пользователей`,
      deleted: result.count
    }

  } catch (error: any) {
    console.error('Delete unverified users error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Ошибка при удалении неподтвержденных пользователей'
    })
  }
})
