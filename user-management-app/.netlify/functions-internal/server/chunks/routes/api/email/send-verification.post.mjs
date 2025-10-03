import { d as defineEventHandler, g as getMethod, c as createError, r as readBody, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import nodemailer from 'nodemailer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class EmailService {
  constructor(config) {
    __publicField(this, "transporter");
    __publicField(this, "config");
    this.config = config;
    this.transporter = nodemailer.createTransport({
      host: config.emailHost,
      port: parseInt(config.emailPort),
      secure: false,
      // true для 465, false для других портов
      auth: {
        user: config.emailUser,
        pass: config.emailPassword
      }
    });
  }
  // Полезно: Отправка письма для верификации email
  async sendVerificationEmail(email, token) {
    const verificationUrl = `${this.config.public.appUrl}/verify-email?token=${token}`;
    const mailOptions = {
      from: `"\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C\u0438" <${this.config.emailUser}>`,
      to: email,
      subject: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C!</h2>
          <p>\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E \u0432 \u043D\u0430\u0448\u0435\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C\u0438.</p>
          <p>\u0414\u043B\u044F \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0438\u0436\u0435:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C email
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            \u0415\u0441\u043B\u0438 \u043A\u043D\u043E\u043F\u043A\u0430 \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442, \u0441\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0438 \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u044D\u0442\u0443 \u0441\u0441\u044B\u043B\u043A\u0443 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440:
            <br>
            <a href="${verificationUrl}">${verificationUrl}</a>
          </p>
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            \u0415\u0441\u043B\u0438 \u0432\u044B \u043D\u0435 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u0432 \u043D\u0430\u0448\u0435\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u0435, \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0440\u043E\u0438\u0433\u043D\u043E\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u044D\u0442\u043E \u043F\u0438\u0441\u044C\u043C\u043E.
          </p>
        </div>
      `
    };
    await this.transporter.sendMail(mailOptions);
  }
  // Полезно: Проверка соединения с email сервером
  async verifyConnection() {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error("Email connection error:", error);
      return false;
    }
  }
}

const sendVerification_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const { email, token } = await readBody(event);
    const config = useRuntimeConfig();
    if (!email || !token) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email \u0438 \u0442\u043E\u043A\u0435\u043D \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B"
      });
    }
    const emailService = new EmailService(config);
    await emailService.sendVerificationEmail(email, token);
    return {
      success: true,
      message: "\u041F\u0438\u0441\u044C\u043C\u043E \u0434\u043B\u044F \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E"
    };
  } catch (error) {
    console.error("Send verification email error:", error);
    return {
      success: true,
      message: "\u0415\u0441\u043B\u0438 email \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442, \u043F\u0438\u0441\u044C\u043C\u043E \u0434\u043B\u044F \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E"
    };
  }
});

export { sendVerification_post as default };
//# sourceMappingURL=send-verification.post.mjs.map
