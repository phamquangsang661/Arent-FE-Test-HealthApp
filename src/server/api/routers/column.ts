import { z } from "zod";
import { publicProcedure } from "../procedure";
import { errorCatchTRPC, returnTRPC } from "@server/libs/utils";
import { createTRPCRouter } from "../trpc";

export const columnRouter = createTRPCRouter({
  getColumns: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        paging: z
          .object({
            limit: z.number().min(1).max(100).nullish(),
          })
          .nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await errorCatchTRPC(async () => {
        const { paging, cursor } = input;
        // paging
        const limit = paging?.limit ?? 8; //default is 8

        let columns = await ctx.prisma.column.findMany({
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          include: {
            tags: true,
          },
        });
        let nextCursor: typeof cursor | undefined = undefined;
        if (columns.length > limit) {
          const nextItem = columns.pop();
          nextCursor = nextItem!.id;
        }

        return returnTRPC({
          message: "Success",
          data: {
            columns,
            nextCursor,
          },
        });
      });
    }),
});
