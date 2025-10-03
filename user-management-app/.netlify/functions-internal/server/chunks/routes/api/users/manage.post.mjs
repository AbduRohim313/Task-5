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

const manage_post = defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const { userIds, action } = await readBody(event);
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C ID \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439"
      });
    }
    if (!action || !["block", "unblock", "delete"].includes(action)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435"
      });
    }
    let result;
    let message;
    switch (action) {
      case "block":
        result = await prisma.user.updateMany({
          where: {
            id: { in: userIds }
          },
          data: {
            status: "BLOCKED"
          }
        });
        message = `\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043E ${result.count} \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439`;
        break;
      case "unblock":
        await prisma.user.updateMany({
          where: {
            id: { in: userIds },
            status: "BLOCKED",
            verificationToken: null
            // только верифицированные
          },
          data: {
            status: "ACTIVE"
          }
        });
        result = await prisma.user.updateMany({
          where: {
            id: { in: userIds },
            status: "BLOCKED",
            verificationToken: { not: null }
            // неверифицированные
          },
          data: {
            status: "UNVERIFIED"
          }
        });
        message = `\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438`;
        break;
      case "delete":
        await prisma.verificationToken.deleteMany({
          where: {
            email: {
              in: await prisma.user.findMany({
                where: { id: { in: userIds } },
                select: { email: true }
              }).then((users) => users.map((u) => u.email))
            }
          }
        });
        result = await prisma.user.deleteMany({
          where: {
            id: { in: userIds }
          }
        });
        message = `\u0423\u0434\u0430\u043B\u0435\u043D\u043E ${result.count} \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439`;
        break;
      default:
        throw createError({
          statusCode: 400,
          statusMessage: "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435"
        });
    }
    return {
      success: true,
      message,
      affected: (result == null ? void 0 : result.count) || 0
    };
  } catch (error) {
    console.error("User management error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C\u0438"
    });
  }
});

export { manage_post as default };
//# sourceMappingURL=manage.post.mjs.map
