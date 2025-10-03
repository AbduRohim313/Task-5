import { prisma } from '../../../lib/db'

export default defineEventHandler(async (event) => {
  // Важно: Проверяем метод запроса
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    const { token } = await readBody(event)

    // Обратите внимание: Валидация токена
    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Токен верификации обязателен'
      })
    }

    // Важно: Поиск токена в базе данных
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    })

    if (!verificationToken) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Недействительный токен верификации'
      })
    }

    // Полезно: Проверка срока действия токена
    if (verificationToken.expiresAt < new Date()) {
      // Удаляем просроченный токен
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id }
      })

      throw createError({
        statusCode: 410,
        statusMessage: 'Токен верификации истек'
      })
    }

    // Обратите внимание: Обновляем статус пользователя
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Пользователь не найден'
      })
    }

    // Важно: Активируем пользователя только если он не заблокирован
    if (user.status !== 'BLOCKED') {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          status: 'ACTIVE',
          verificationToken: null
        }
      })
    }

    // Полезно: Удаляем использованный токен
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    })

    return {
      success: true,
      message: user.status === 'BLOCKED'
        ? 'Email подтвержден, но аккаунт заблокирован'
        : 'Email успешно подтвержден! Теперь вы можете войти в систему.'
    }

  } catch (error: any) {
    console.error('Email verification error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Ошибка при верификации email'
    })
  }
})
