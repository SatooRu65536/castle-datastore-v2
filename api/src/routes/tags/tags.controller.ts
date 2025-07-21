import { array } from 'superstruct';
import { publicProcedure, router } from '../../trpc';
import { addTag, tag, updateTag } from './tags.dto';
import { tagsService } from './tags.service';

export const tagsRouter = router({
  add: publicProcedure
    .input(addTag)
    .output(tag)
    .mutation(async ({ ctx, input }) => await tagsService.add(ctx.db, input)),
  update: publicProcedure
    .input(updateTag)
    .output(tag)
    .mutation(async ({ ctx, input }) => await tagsService.update(ctx.db, input)),
  list: publicProcedure.output(array(tag)).query(async ({ ctx }) => await tagsService.list(ctx.db)),
});
