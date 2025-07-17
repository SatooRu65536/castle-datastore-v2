import { array } from 'superstruct';
import { publicProcedure, router } from '../../trpc';
import { castle, addCastle, getCastle, listCastleOptions, updateCastle } from './castles.dto';
import { castlesService } from './castles.service';

export const castlesRouter = router({
  add: publicProcedure
    .input(addCastle)
    .output(castle)
    .mutation(async ({ ctx, input }) => await castlesService.add(ctx.db, input)),
  get: publicProcedure
    .input(getCastle)
    .output(castle)
    .query(async ({ ctx, input }) => await castlesService.get(ctx.db, input)),
  update: publicProcedure
    .input(updateCastle)
    .output(castle)
    .mutation(async ({ ctx, input }) => await castlesService.update(ctx.db, input)),
  delete: publicProcedure
    .input(getCastle)
    .mutation(async ({ ctx, input }) => await castlesService.delete(ctx.db, input)),
  list: publicProcedure
    .input(listCastleOptions)
    .output(array(castle))
    .query(async ({ ctx, input }) => await castlesService.list(ctx.db, input)),
  info: publicProcedure
    .query(async ({ ctx }) => await castlesService.info(ctx.db)),
});
