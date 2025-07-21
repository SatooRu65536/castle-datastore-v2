import { eq, InferSelectModel } from 'drizzle-orm';
import { TagSchema } from '../../../drizzle/schema';
import { Database } from '../../lib/context';
import { AddTag, Tag, UpdateTag } from './tags.dto';
import { Uuid } from '../../index.dto';

export const tagsService = {
  /**
   * タグを追加する
   * @param {Database} db
   * @param {AddTag} input
   * @returns {Tag} 作成されたタグの情報
   */
  add: async (db: Database, input: AddTag): Promise<Tag> => {
    const [tag] = await db.insert(TagSchema).values(input).returning();

    if (!tag) {
      throw new Error('Failed to create tag');
    }

    return tagsService.toTag(tag);
  },

  /**
   * タグの情報を更新する
   * @param {Database} db
   * @param {UpdateTag} input
   * @returns {Tag} タグの情報
   */
  update: async (db: Database, input: UpdateTag): Promise<Tag> => {
    const [tag] = await db
      .update(TagSchema)
      .set({
        name: input.name,
        description: input.description,
      })
      .where(eq(TagSchema.id, input.id))
      .returning();

    if (!tag) {
      throw new Error('Failed to update tag');
    }

    return tagsService.toTag(tag);
  },

  /**
   * タグの一覧を取得する
   * @param {Database} db
   * @returns {Promise<Tag[]>} タグの一覧
   */
  list: async (db: Database): Promise<Tag[]> => {
    const tags = await db.select().from(TagSchema);
    return tags.map(tagsService.toTag);
  },

  toTag: (tag: InferSelectModel<typeof TagSchema>): Tag => {
    return {
      id: tag.id as Uuid,
      name: tag.name,
      description: tag.description || null,
    };
  },
};
