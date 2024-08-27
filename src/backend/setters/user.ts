import prisma from "@/backend/prisma/client";
import { functionLogger } from "@/backend/services/logger";
import { getUnixTimestamp } from "@/backend/utils/general";
import { IdPrefix, randomId } from "@/backend/utils/ids";
import { clerkClient } from "@clerk/clerk-sdk-node";

const launchUser = functionLogger(
  async ({ userId, email }: { userId: string; email: string }) => {
    const user = await prisma.user.upsert({
      where: {
        id: userId,
      },
      update: {
        email,
        updatedAt: getUnixTimestamp(),
      },
      create: {
        id: userId,
        email,
        createdAt: getUnixTimestamp(),
        updatedAt: getUnixTimestamp(),
      },
    });

    return { user };
  },
  "launchUser.start",
  "launchUser.success",
  "launchUser.error"
);

const createUser = functionLogger(
  async ({ email }: { email: string }) => {
    const user = await prisma.user.create({
      data: {
        id: randomId({ prefix: IdPrefix.User }),
        email,
        createdAt: getUnixTimestamp(),
        updatedAt: getUnixTimestamp(),
      },
    });

    return { user };
  },
  "createUser.start",
  "createUser.success",
  "createUser.error"
);

const deleteUser = functionLogger(
  async ({ id }: { id: string }) => {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    try {
      await clerkClient.users.deleteUser(id);
    } catch (error) {}

    return { success: true };
  },
  "deleteUser.start",
  "deleteUser.success",
  "deleteUser.error"
);

export default {
  createUser,
  launchUser,
  deleteUser,
};
