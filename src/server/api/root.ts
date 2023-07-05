import { bodyHistoryRouter } from "./routers/body-history";
import { diaryRouter } from "./routers/diary";
import { exerciseHistoryRouter } from "./routers/exercise-history";
import { mealHistoryRouter } from "./routers/meal-history";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  bodyHistory: bodyHistoryRouter,
  diary: diaryRouter,
  exerciseHistory: exerciseHistoryRouter,
  mealHistory: mealHistoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
