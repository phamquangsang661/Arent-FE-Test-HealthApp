import { protectedProcedure } from "../procedure";
import { errorCatchTRPC, returnTRPC } from "@server/libs/utils";
import { createTRPCRouter } from "../trpc";
import dayjs from "dayjs";

export const bodyHistoryRouter = createTRPCRouter({
  getBodyHistories: protectedProcedure.query(async ({ ctx }) => {
    return await errorCatchTRPC(async () => {
      const userId = ctx.session.user.id;
      const date = dayjs();

      // For now body history only support for month, each history is attach to one month
      const theLast12Month = dayjs(date).subtract(12, "month").startOf("month");
      //   Get the last 12 month history
      let bodyHistories = await ctx.prisma.bodyHistory.findMany({
        where: {
          userId,
          createdAt: {
            gte: theLast12Month.toISOString(),
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return returnTRPC({
        message: "Success",
        data: bodyHistories,
      });
    });
  }),
});
