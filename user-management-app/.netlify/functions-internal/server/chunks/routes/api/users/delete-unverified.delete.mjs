import { d as defineEventHandler, g as getMethod, c as createError } from '../../../nitro/nitro.mjs';
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

const deleteUnverified_delete = defineEventHandler(async (event) => {
  if (getMethod(event) !== "DELETE") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const unverifiedUsers = await prisma.user.findMany({
      where: {
        status: "UNVERIFIED"
      },
      select: {
        id: true,
        email: true
      }
    });
    if (unverifiedUsers.length === 0) {
      return {
        success: true,
        message: "\u041D\u0435\u0442 \u043D\u0435\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0434\u043B\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F",
        deleted: 0
      };
    }
    await prisma.verificationToken.deleteMany({
      where: {
        email: {
          in: unverifiedUsers.map((user) => user.email)
        }
      }
    });
    const result = await prisma.user.deleteMany({
      where: {
        status: "UNVERIFIED"
      }
    });
    return {
      success: true,
      message: `\u0423\u0434\u0430\u043B\u0435\u043D\u043E ${result.count} \u043D\u0435\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439`,
      deleted: result.count
    };
  } catch (error) {
    console.error("Delete unverified users error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u043D\u0435\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439"
    });
  }
});

export { deleteUnverified_delete as default };
//# sourceMappingURL=delete-unverified.delete.mjs.map
