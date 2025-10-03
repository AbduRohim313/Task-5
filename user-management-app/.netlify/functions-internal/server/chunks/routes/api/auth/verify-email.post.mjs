import { d as defineEventHandler, g as getMethod, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { p as prisma } from '../../../_/db.mjs';
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

const verifyEmail_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const { token } = await readBody(event);
    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u0422\u043E\u043A\u0435\u043D \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D"
      });
    }
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    });
    if (!verificationToken) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0442\u043E\u043A\u0435\u043D \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438"
      });
    }
    if (verificationToken.expiresAt < /* @__PURE__ */ new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id }
      });
      throw createError({
        statusCode: 410,
        statusMessage: "\u0422\u043E\u043A\u0435\u043D \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0438\u0441\u0442\u0435\u043A"
      });
    }
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email }
    });
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    if (user.status !== "BLOCKED") {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          status: "ACTIVE",
          verificationToken: null
        }
      });
    }
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    });
    return {
      success: true,
      message: user.status === "BLOCKED" ? "Email \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D, \u043D\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D" : "Email \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D! \u0422\u0435\u043F\u0435\u0440\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u043E\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443."
    };
  } catch (error) {
    console.error("Email verification error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 email"
    });
  }
});

export { verifyEmail_post as default };
//# sourceMappingURL=verify-email.post.mjs.map
