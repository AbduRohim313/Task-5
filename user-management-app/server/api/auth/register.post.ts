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
    const body = await readBody(event)
    console.log('Registration request body:', body)

    const { name, email, password } = body

    // Обратите внимание: Валидация входных данных
    if (!name || !email || !password || name.trim() === '' || email.trim() === '' || password.trim() === '') {
      console.log('Missing or empty fields:', {
        name: `'${name}'`,
        email: `'${email}'`,
        password: password ? `'${password.substring(0, 3)}...'` : 'undefined',
        nameTrimmed: name ? `'${name.trim()}'` : 'undefined',
        emailTrimmed: email ? `'${email.trim()}'` : 'undefined'
      })
      throw createError({
        statusCode: 400,
        statusMessage: 'Все поля обязательны для заполнения'
      })
    }

    // Полезно: Валидация email формата
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Неверный формат email'
      })
    }

    // Важно: Хешируем пароль перед сохранением
    const hashedPassword = await AuthUtils.hashPassword(password)

    // Обратите внимание: Генерируем токен для верификации
    const verificationToken = AuthUtils.generateVerificationToken()

    // Важно: Создаем пользователя - уникальность email гарантируется на уровне БД
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken,
        status: 'UNVERIFIED'
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        registrationTime: true
      }
    })

    // Полезно: Создаем токен для верификации email
    await prisma.verificationToken.create({
      data: {
        email,
        token: verificationToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 часа
      }
    })

    // Важно: Отправляем email верификации асинхронно
    // Это не блокирует ответ пользователю
    $fetch('/api/email/send-verification', {
      method: 'POST',
      body: { email, token: verificationToken }
    }).catch(console.error)

    return {
      success: true,
      message: 'Регистрация успешна! Проверьте email для подтверждения аккаунта.',
      user
    }

  } catch (error: any) {
    // Обратите внимание: Обработка ошибки уникальности email
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Пользователь с таким email уже существует'
      })
    }

    // Полезно: Логируем ошибки для отладки
    console.error('Registration error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Ошибка при регистрации'
    })
  }
})
