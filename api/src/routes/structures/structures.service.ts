import { eq, InferSelectModel } from 'drizzle-orm';
import { StructureSchema } from '../../../drizzle/schema';
import { AddStructure, Structure, UpdateStructure } from './structures.dto';
import { Database } from '../../lib/context';
import { Uuid } from '../../index.dto';

export const structuresService = {
  /**
   * 構造物を追加する
   * @param {Database} db
   * @param {AddStructure} input
   * @returns {Structure} 作成された構造物の情報
   */
  add: async (db: Database, input: AddStructure): Promise<Structure> => {
    const [structure] = await db.insert(StructureSchema).values(input).returning();

    if (!structure) {
      throw new Error('Failed to create structure');
    }

    return structuresService.toStructure(structure);
  },

  /**
   * 構造物の情報を更新する
   * @param {Database} db
   * @param {UpdateStructure} input
   * @returns {Structure} 構造物の情報
   */
  update: async (db: Database, input: UpdateStructure): Promise<Structure> => {
    const [structure] = await db
      .update(StructureSchema)
      .set({
        name: input.name,
        description: input.description,
      })
      .where(eq(StructureSchema.id, input.id))
      .returning();

    if (!structure) {
      throw new Error('Failed to update structure');
    }

    return structuresService.toStructure(structure);
  },

  /**
   * 構造物の一覧を取得する
   * @param {Database} db
   * @returns {Promise<Structure[]>} 構造物の一覧
   */
  list: async (db: Database): Promise<Structure[]> => {
    const structures = await db.select().from(StructureSchema);
    return structures.map(structuresService.toStructure);
  },

  toStructure: (structure: InferSelectModel<typeof StructureSchema>): Structure => {
    return {
      id: structure.id as Uuid,
      name: structure.name,
      description: structure.description || null,
    };
  },
};
