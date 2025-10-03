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
    const { userIds, action } = await readBody(event)

    // Обратите внимание: Валидация входных данных
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Необходимо указать ID пользователей'
      })
    }

    if (!action || !['block', 'unblock', 'delete'].includes(action)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Недопустимое действие'
      })
    }

    let result
    let message

    switch (action) {
      case 'block':
        // Важно: Блокируем выбранных пользователей
        result = await prisma.user.updateMany({
          where: {
            id: { in: userIds }
          },
          data: {
            status: 'BLOCKED'
          }
        })
        message = `Заблокировано ${result.count} пользователей`
        break

      case 'unblock':
        // Полезно: Разблокируем пользователей (активируем только верифицированных)
        await prisma.user.updateMany({
          where: {
            id: { in: userIds },
            status: 'BLOCKED',
            verificationToken: null // только верифицированные
          },
          data: {
            status: 'ACTIVE'
          }
        })

        // Обратите внимание: Разблокируем неверифицированных отдельно
        result = await prisma.user.updateMany({
          where: {
            id: { in: userIds },
            status: 'BLOCKED',
            verificationToken: { not: null } // неверифицированные
          },
          data: {
            status: 'UNVERIFIED'
          }
        })

        message = `Разблокированы пользователи`
        break

      case 'delete':
        // Важно: Удаляем пользователей полностью из БД (не помечаем)
        // Сначала удаляем связанные токены верификации
        await prisma.verificationToken.deleteMany({
          where: {
            email: {
              in: await prisma.user.findMany({
                where: { id: { in: userIds } },
                select: { email: true }
              }).then(users => users.map(u => u.email))
            }
          }
        })

        // Затем удаляем самих пользователей
        result = await prisma.user.deleteMany({
          where: {
            id: { in: userIds }
          }
        })
        message = `Удалено ${result.count} пользователей`
        break

      default:
        throw createError({
          statusCode: 400,
          statusMessage: 'Неизвестное действие'
        })
    }

    return {
      success: true,
      message,
      affected: result?.count || 0
    }

  } catch (error: any) {
    console.error('User management error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Ошибка при управлении пользователями'
    })
  }
})
