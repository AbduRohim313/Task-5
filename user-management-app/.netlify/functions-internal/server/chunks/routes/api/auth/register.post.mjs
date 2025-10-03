import { d as defineEventHandler, g as getMethod, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { p as prisma } from '../../../_/db.mjs';
import { A as AuthUtils } from '../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import '@prisma/client';
import 'bcryptjs';
import 'jsonwebtoken';

const register_post = defineEventHandler(async (event) => {
  var _a, _b;
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const body = await readBody(event);
    console.log("Registration request body:", body);
    const { name, email, password } = body;
    if (!name || !email || !password || name.trim() === "" || email.trim() === "" || password.trim() === "") {
      console.log("Missing or empty fields:", {
        name: `'${name}'`,
        email: `'${email}'`,
        password: password ? `'${password.substring(0, 3)}...'` : "undefined",
        nameTrimmed: name ? `'${name.trim()}'` : "undefined",
        emailTrimmed: email ? `'${email.trim()}'` : "undefined"
      });
      throw createError({
        statusCode: 400,
        statusMessage: "\u0412\u0441\u0435 \u043F\u043E\u043B\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F"
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 email"
      });
    }
    const hashedPassword = await AuthUtils.hashPassword(password);
    const verificationToken = AuthUtils.generateVerificationToken();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken,
        status: "UNVERIFIED"
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        registrationTime: true
      }
    });
    await prisma.verificationToken.create({
      data: {
        email,
        token: verificationToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3)
        // 24 часа
      }
    });
    $fetch("/api/email/send-verification", {
      method: "POST",
      body: { email, token: verificationToken }
    }).catch(console.error);
    return {
      success: true,
      message: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0443\u0441\u043F\u0435\u0448\u043D\u0430! \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 email \u0434\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430.",
      user
    };
  } catch (error) {
    if (error.code === "P2002" && ((_b = (_a = error.meta) == null ? void 0 : _a.target) == null ? void 0 : _b.includes("email"))) {
      throw createError({
        statusCode: 409,
        statusMessage: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u0442\u0430\u043A\u0438\u043C email \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
      });
    }
    console.error("Registration error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438"
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
