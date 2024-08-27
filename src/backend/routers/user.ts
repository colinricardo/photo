import { getters, setters } from "@/backend/db";
import { createTRPCRouter, privateProcedure } from "@/backend/routers/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  current: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    return { user };
  }),

  launchUser: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, email } = input;
      const { user } = await setters.user.launchUser({
        userId,
        email,
      });
      return { user };
    }),

  getUser: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { userId } = input;
      const { user } = await getters.user.getUser({ userId });
      return { user };
    }),
});
