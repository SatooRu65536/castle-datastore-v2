import { castlesRouter } from './routes/castles/castles.controller';
import { tagsRouter } from './routes/tags/tags.controller';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  hello: publicProcedure.query(() => 'Hello World!'),
  castles: castlesRouter,
  tags: tagsRouter,
});

export type AppRouter = typeof appRouter;
