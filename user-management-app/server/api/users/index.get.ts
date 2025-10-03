import { prisma } from '../../../lib/db'

export default defineEventHandler(async (event) => {
  // Важно: Проверяем метод запроса
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    // Обратите внимание: Получаем параметры сортировки из query
    const query = getQuery(event)
    const sortBy = (query.sortBy as string) || 'lastLoginAt'
    const sortOrder = (query.sortOrder as string) || 'desc'

    // Полезно: Валидация параметров сортировки
    const allowedSortFields = ['lastLoginAt', 'registrationTime', 'name', 'email', 'status']
    const allowedSortOrders = ['asc', 'desc']

    if (!allowedSortFields.includes(sortBy)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Недопустимое поле для сортировки'
      })
    }

    if (!allowedSortOrders.includes(sortOrder)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Недопустимый порядок сортировки'
      })
    }

    // Важно: Получаем всех пользователей с сортировкой по времени последнего входа
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        lastLoginAt: true,
        registrationTime: true
      },
      orderBy: {
        [sortBy]: sortOrder
      }
    })

    // Обратите внимание: Подсчитываем статистику
    const stats = {
      total: users.length,
      active: users.filter(u => u.status === 'ACTIVE').length,
      blocked: users.filter(u => u.status === 'BLOCKED').length,
      unverified: users.filter(u => u.status === 'UNVERIFIED').length
    }

    return {
      success: true,
      users,
      stats,
      sortBy,
      sortOrder
    }

  } catch (error: any) {
    console.error('Get users error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Ошибка при получении списка пользователей'
    })
  }
})
