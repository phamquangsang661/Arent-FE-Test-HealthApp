import { z } from "zod";
import { protectedProcedure } from "../procedure";
import { errorCatchTRPC, returnTRPC } from "@server/libs/utils";
import { createTRPCRouter } from "../trpc";
import { isNullableString } from "@utils/utils";
import dayjs from "dayjs";

export const mealHistoryRouter = createTRPCRouter({
  getMealHistories: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        type: z.string().nullish(),
        paging: z
          .object({
            limit: z.number().min(1).max(100).nullish(),
          })
          .nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await errorCatchTRPC(async () => {
        const userId = ctx.session.user.id;
        const { paging, cursor, type } = input;
        // paging
        const limit = paging?.limit ?? 8; //default is 8

        let mealHistories = await ctx.prisma.mealHistory.findMany({
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          where: {
            userId,
            ...(!isNullableString(type)
              ? {
                  type: type ?? "",
                }
              : {}),
            createdAt: {
              lte: dayjs().endOf("day").toISOString(), //Only start from tody
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        let nextCursor: typeof cursor | undefined = undefined;
        if (mealHistories.length > limit) {
          const nextItem = mealHistories.pop();
          nextCursor = nextItem!.id;
        }

        return returnTRPC({
          message: "Success",
          data: {
            mealHistories,
            nextCursor,
          },
        });
      });
    }),
});