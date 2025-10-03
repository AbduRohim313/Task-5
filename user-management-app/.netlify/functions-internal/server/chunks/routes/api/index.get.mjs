import { d as defineEventHandler, g as getMethod, c as createError, a as getQuery } from '../../nitro/nitro.mjs';
import { p as prisma } from '../../_/db.mjs';
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

const index_get = defineEventHandler(async (event) => {
  if (getMethod(event) !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const query = getQuery(event);
    const sortBy = query.sortBy || "lastLoginAt";
    const sortOrder = query.sortOrder || "desc";
    const allowedSortFields = ["lastLoginAt", "registrationTime", "name", "email", "status"];
    const allowedSortOrders = ["asc", "desc"];
    if (!allowedSortFields.includes(sortBy)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u043F\u043E\u043B\u0435 \u0434\u043B\u044F \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438"
      });
    }
    if (!allowedSortOrders.includes(sortOrder)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438"
      });
    }
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        lastLoginAt: true,
        registrationTime: true
      },
      orderBy: {
        [sortBy]: sortOrder
      }
    });
    const stats = {
      total: users.length,
      active: users.filter((u) => u.status === "ACTIVE").length,
      blocked: users.filter((u) => u.status === "BLOCKED").length,
      unverified: users.filter((u) => u.status === "UNVERIFIED").length
    };
    return {
      success: true,
      users,
      stats,
      sortBy,
      sortOrder
    };
  } catch (error) {
    console.error("Get users error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u043F\u0438\u0441\u043A\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
