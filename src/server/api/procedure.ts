import { TRPCError } from "@trpc/server";
import { trpcContext } from "./trpc";

const isAuthenticated = trpcContext.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Procedure
 */
// For Authenticated
export const protectedProcedure = trpcContext.procedure.use(isAuthenticated);
export const publicProcedure = trpcContext.procedure;
