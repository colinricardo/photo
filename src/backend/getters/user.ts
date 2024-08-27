import prisma from "@/backend/prisma/client";
import { functionLogger } from "@/backend/services/logger";

const getUser = functionLogger(
  async ({ userId }: { userId: string }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return { user };
  },
  "getUser.start",
  "getUser.success",
  "getUser.error"
);

export default {
  getUser,
};
