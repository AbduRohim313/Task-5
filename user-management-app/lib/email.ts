import nodemailer from 'nodemailer'

// Важно: Класс для работы с email уведомлениями
export class EmailService {
  private transporter: nodemailer.Transporter
  private config: any

  constructor(config: any) {
    this.config = config

    // Обратите внимание: Настройка транспорта для отправки email
    this.transporter = nodemailer.createTransport({
      host: config.emailHost,
      port: parseInt(config.emailPort),
      secure: false, // true для 465, false для других портов
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    })
  }

  // Полезно: Отправка письма для верификации email
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${this.config.public.appUrl}/verify-email?token=${token}`

    const mailOptions = {
      from: `"Система управления пользователями" <${this.config.emailUser}>`,
      to: email,
      subject: 'Подтверждение регистрации',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Добро пожаловать!</h2>
          <p>Спасибо за регистрацию в нашей системе управления пользователями.</p>
          <p>Для активации вашего аккаунта, пожалуйста, нажмите на кнопку ниже:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Подтвердить email
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:
            <br>
            <a href="${verificationUrl}">${verificationUrl}</a>
          </p>
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            Если вы не регистрировались в нашей системе, просто проигнорируйте это письмо.
          </p>
        </div>
      `
    }

    // Важно: Отправляем email
    await this.transporter.sendMail(mailOptions)
  }

  // Полезно: Проверка соединения с email сервером
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      return true
    } catch (error) {
      console.error('Email connection error:', error)
      return false
    }
  }
}
