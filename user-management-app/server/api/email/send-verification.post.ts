import { EmailService } from '../../../lib/email'

export default defineEventHandler(async (event) => {
  // Важно: Проверяем метод запроса
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    const { email, token } = await readBody(event)
    const config = useRuntimeConfig()

    // Обратите внимание: Валидация входных данных
    if (!email || !token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email и токен обязательны'
      })
    }

    // Полезно: Создаем экземпляр email сервиса
    const emailService = new EmailService(config)

    // Важно: Отправляем письмо для верификации
    await emailService.sendVerificationEmail(email, token)

    return {
      success: true,
      message: 'Письмо для верификации отправлено'
    }

  } catch (error: any) {
    console.error('Send verification email error:', error)

    // Возвращаем успех даже если письмо не отправилось (для безопасности)
    return {
      success: true,
      message: 'Если email существует, письмо для верификации отправлено'
    }
  }
})
