import { prisma } from '../../../lib/db'
import { AuthUtils } from '../../../lib/auth'

export default defineEventHandler(async (event) => {
  // Важно: Проверяем метод запроса
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    const { email, password } = await readBody(event)
    const config = useRuntimeConfig()

    // Обратите внимание: Валидация входных данных
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email и пароль обязательны'
      })
    }

    // Важно: Поиск пользователя по email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Неверный email или пароль'
      })
    }

    // Обратите внимание: Проверка статуса пользователя
    if (user.status === 'BLOCKED') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Ваш аккаунт заблокирован'
      })
    }

    // Полезно: Проверка пароля
    const isValidPassword = await AuthUtils.verifyPassword(password, user.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Неверный email или пароль'
      })
    }

    // Важно: Обновляем время последнего входа
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    // Обратите внимание: Создаем JWT токен
    const token = AuthUtils.generateJWT(
      {
        userId: user.id,
        email: user.email,
        status: user.status
      },
      config.jwtSecret
    )

    // Полезно: Возвращаем данные пользователя без пароля
    const { password: _, ...userWithoutPassword } = user

    return {
      success: true,
      message: 'Вход выполнен успешно',
      token,
      user: userWithoutPassword
    }

  } catch (error: any) {
    console.error('Login error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Ошибка при входе в систему'
    })
  }
})
