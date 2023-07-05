import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../procedure";
import { errorCatchTRPC, returnTRPC, throwErrorTRPC } from "@server/libs/utils";
import { createTRPCRouter } from "../trpc";

export const exerciseHistoryRouter = createTRPCRouter({
  test: publicProcedure.mutation(async ({ input, ctx }) => {
    return await errorCatchTRPC(async () => {
      return returnTRPC({
        message: "Thành công",
        data: {},
      });
    });
  }),
});
