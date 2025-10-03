import { PrismaClient } from '@prisma/client';

var _a;
const globalForPrisma = globalThis;
const prisma = (_a = globalForPrisma.prisma) != null ? _a : new PrismaClient();
function getUniqIdValue() {
  return crypto.randomUUID();
}

export { getUniqIdValue as g, prisma as p };
//# sourceMappingURL=db.mjs.map
