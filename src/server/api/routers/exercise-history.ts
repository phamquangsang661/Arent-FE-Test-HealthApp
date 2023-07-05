import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../procedure";
import { errorCatchTRPC, returnTRPC, throwErrorTRPC } from "@server/libs/utils";
import { createTRPCRouter } from "../trpc";
import dayjs from "dayjs";

export const exerciseHistoryRouter = createTRPCRouter({
  getExerciseHistories: protectedProcedure.query(async ({ input, ctx }) => {
    return await errorCatchTRPC(async () => {
      const userId = ctx.session.user.id;

      let exerciseHistories = await ctx.prisma.exerciseHistory.findMany({
        where: {
          userId,
          createdAt: {
            //Only get today
            gte: dayjs().startOf("day").toISOString(),
            lte: dayjs().endOf("day").toISOString(),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return returnTRPC({
        message: "Success",
        data: exerciseHistories,
      });
    });
  }),
});
