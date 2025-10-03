import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUniqIdValue } from './db'

// Важно: Утилиты для работы с паролями и токенами
export class AuthUtils {
  // Обратите внимание: Хеширование пароля с солью
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
  }

  // Полезно: Проверка пароля против хеша
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  // Важно: Создание JWT токена
  static generateJWT(payload: any, secret: string): string {
    return jwt.sign(payload, secret, { expiresIn: '24h' })
  }

  // Обратите внимание: Верификация JWT токена
  static verifyJWT(token: string, secret: string): any {
    try {
      return jwt.verify(token, secret)
    } catch (error) {
      return null
    }
  }

  // Полезно: Генерация токена для верификации email
  static generateVerificationToken(): string {
    return getUniqIdValue()
  }

  // Важно: Извлечение токена из заголовков запроса
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    return authHeader.substring(7)
  }
}
