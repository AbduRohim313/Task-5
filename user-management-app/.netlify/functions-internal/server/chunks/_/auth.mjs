import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { g as getUniqIdValue } from './db.mjs';

class AuthUtils {
  // Обратите внимание: Хеширование пароля с солью
  static async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  // Полезно: Проверка пароля против хеша
  static async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
  // Важно: Создание JWT токена
  static generateJWT(payload, secret) {
    return jwt.sign(payload, secret, { expiresIn: "24h" });
  }
  // Обратите внимание: Верификация JWT токена
  static verifyJWT(token, secret) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
  // Полезно: Генерация токена для верификации email
  static generateVerificationToken() {
    return getUniqIdValue();
  }
  // Важно: Извлечение токена из заголовков запроса
  static extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    return authHeader.substring(7);
  }
}

export { AuthUtils as A };
//# sourceMappingURL=auth.mjs.map
