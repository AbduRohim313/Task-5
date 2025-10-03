import { prisma } from '../../lib/db'
import { AuthUtils } from '../../lib/auth'

export default defineEventHandler(async (event) => {
  // Важно: Применяем middleware только к защищенным маршрутам
  const url = getRequestURL(event)
  const protectedRoutes = ['/api/users', '/api/admin']
  
  // Исключаем auth маршруты из проверки
  const authRoutes = ['/api/auth/', '/api/email/']
  
  const isAuthRoute = authRoutes.some(route => url.pathname.includes(route))
  
  if (isAuthRoute) {
    return
  }

  const isProtectedRoute = protectedRoutes.some(route =>
    url.pathname.startsWith(route)
  )

  if (!isProtectedRoute) {
    return
  }

  try {
    const config = useRuntimeConfig()
    const authHeader = getHeader(event, 'authorization')

    // Обратите внимание: Извлекаем токен из заголовка
    const token = AuthUtils.extractTokenFromHeader(authHeader)

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Токен авторизации отсутствует'
      })
    }

    // Полезно: Проверяем валидность токена
    const payload = AuthUtils.verifyJWT(token, config.jwtSecret)

    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Недействительный токен'
      })
    }

    // Важно: Проверяем существование и статус пользователя в БД
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        status: true,
        name: true
      }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Пользователь не найден'
      })
    }

    // Обратите внимание: Проверяем, не заблокирован ли пользователь
    if (user.status === 'BLOCKED') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Ваш аккаунт заблокирован'
      })
    }

    // Полезно: Добавляем информацию о пользователе в контекст запроса
    event.context.user = user

  } catch (error: any) {
    console.error('Auth middleware error:', error)

    throw createError({
      statusCode: error.statusCode || 401,
      statusMessage: error.statusMessage || 'Ошибка авторизации'
    })
  }
})
