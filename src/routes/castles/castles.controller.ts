import { publicProcedure, router } from '../../trpc';
import { castle, createCastle } from './castles.dto';
import { castlesService } from './castles.service';

export const castlesRouter = router({
  add: publicProcedure
    .input(createCastle)
    .output(castle)
    .mutation(async ({ ctx, input }) => await castlesService.add(ctx.db, input)),
});
