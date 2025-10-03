import { d as defineEventHandler, g as getMethod, c as createError, r as readBody, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const { email, password } = await readBody(event);
    const config = useRuntimeConfig();
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email \u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B"
      });
    }
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 email \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C"
      });
    }
    if (user.status === "BLOCKED") {
      throw createError({
        statusCode: 403,
        statusMessage: "\u0412\u0430\u0448 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D"
      });
    }
    const isValidPassword = await AuthUtils.verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 email \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C"
      });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: /* @__PURE__ */ new Date() }
    });
    const token = AuthUtils.generateJWT(
      {
        userId: user.id,
        email: user.email,
        status: user.status
      },
      config.jwtSecret
    );
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      message: "\u0412\u0445\u043E\u0434 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E",
      token,
      user: userWithoutPassword
    };
  } catch (error) {
    console.error("Login error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u0445\u043E\u0434\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
