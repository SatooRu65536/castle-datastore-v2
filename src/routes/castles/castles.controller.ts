import { publicProcedure, router } from '../../trpc';
import { createCastle } from './castles.dto';
import { castlesService } from './castles.service';

export const castlesRouter = router({
  addCastle: publicProcedure
    .input(createCastle)
    .mutation(async ({ ctx, input }) => await castlesService.addCastle(ctx.db, input)),
});
