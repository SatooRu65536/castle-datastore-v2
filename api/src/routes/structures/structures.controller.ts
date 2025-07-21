import { array } from 'superstruct';
import { publicProcedure, router } from '../../trpc';
import { structure, addStructure, updateStructure } from './structures.dto';
import { structuresService } from './structures.service';

export const structuresRouter = router({
  add: publicProcedure
    .input(addStructure)
    .output(structure)
    .mutation(async ({ ctx, input }) => await structuresService.add(ctx.db, input)),
  update: publicProcedure
    .input(updateStructure)
    .output(structure)
    .mutation(async ({ ctx, input }) => await structuresService.update(ctx.db, input)),
  list: publicProcedure.output(array(structure)).query(async ({ ctx }) => await structuresService.list(ctx.db)),
});
