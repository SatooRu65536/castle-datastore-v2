import { castlesRouter } from './routes/castles/castles.controller';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  hello: publicProcedure.query(() => 'Hello World!'),
  castles: castlesRouter,
});

export type AppRouter = typeof appRouter;
