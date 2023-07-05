import { z } from "zod";
import { protectedProcedure } from "../procedure";
import { errorCatchTRPC, returnTRPC } from "@server/libs/utils";
import { createTRPCRouter } from "../trpc";
import dayjs from "dayjs";

export const bodyHistoryRouter = createTRPCRouter({
  getBodyHistories: protectedProcedure
    .input(
      z.object({
        date: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await errorCatchTRPC(async () => {
        const userId = ctx.session.user.id;
        const { date } = input;

        // For now body history only support for month, each history is attach to one month
        const theLast12Month = dayjs(date)
          .subtract(12, "month")
          .startOf("month");
        //   Get the last 12 month history
        let bodyHistories = await ctx.prisma.bodyHistory.findMany({
          where: {
            userId,
            createdAt: {
              gte: theLast12Month.toISOString(),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return returnTRPC({
          message: "Success",
          data: bodyHistories,
        });
      });
    }),
});
