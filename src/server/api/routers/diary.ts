import { z } from "zod";
import { protectedProcedure } from "../procedure";
import { errorCatchTRPC, returnTRPC } from "@server/libs/utils";
import { createTRPCRouter } from "../trpc";
import dayjs from "dayjs";

export const diaryRouter = createTRPCRouter({
  getDiaries: protectedProcedure
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
    .query(async ({ input, ctx }) => {
      return await errorCatchTRPC(async () => {
        const userId = ctx.session.user.id;
        const { paging, cursor } = input;
        // paging
        const limit = paging?.limit ?? 8; //default is 8

        let diaries = await ctx.prisma.diary.findMany({
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          where: {
            userId,
            createdAt: {
              lte: dayjs().endOf("day").toISOString(), //Only start from tody
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        let nextCursor: typeof cursor | undefined = undefined;
        if (diaries.length > limit) {
          const nextItem = diaries.pop();
          nextCursor = nextItem!.id;
        }

        return returnTRPC({
          message: "Success",
          data: {
            diaries,
            nextCursor,
          },
        });
      });
    }),
});
