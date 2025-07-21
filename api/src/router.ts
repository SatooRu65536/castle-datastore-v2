import { castlesRouter } from './routes/castles/castles.controller';
import { structuresRouter } from './routes/structures/structures.controller';
import { tagsRouter } from './routes/tags/tags.controller';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  hello: publicProcedure.query(() => 'Hello World!'),
  castles: castlesRouter,
  tags: tagsRouter,
  structures: structuresRouter,
});

export type AppRouter = typeof appRouter;
