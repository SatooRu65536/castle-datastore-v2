import { InferSelectModel } from 'drizzle-orm';
import { CastlesSchema, CastleVersionsSchema } from '../../../drizzle/schema';
import { Uuid } from '../../index.dto';
import { Database } from '../../lib/context';
import { Castle, CreateCastle } from './castles.dto';
import { v4 } from 'uuid';

export const castlesService = {
  /**
   * 新しい城を追加する
   * @param {Database} db
   * @param {CreateCastle DTO} input
   * @returns {Castle} 作成された城の情報
   */
  addCastle: async (db: Database, input: CreateCastle): Promise<Castle> => {
    const castleId = v4();

    const castle = await db.transaction(async (tx) => {
      const castleVersions = await tx
        .insert(CastleVersionsSchema)
        .values({
          castle_id: castleId,
          name: input.name,
          aka: input.aka,
          description: input.description,
          latitude: input.latitude,
          longitude: input.longitude,
          editor_user_id: v4(), // TODO
        })
        .returning();

      if (castleVersions.length !== 1) {
        throw new Error('Failed to create castle version');
      }

      await tx.insert(CastlesSchema).values({
        id: castleId,
        latest_version_id: castleVersions[0].id,
      });

      return castleVersions[0];
    });

    return castlesService.toCastle(castle);
  },

  /**
   * CastleVersionsSchema のレコードを Castle DTO に変換する
   */
  toCastle: (castle: InferSelectModel<typeof CastleVersionsSchema>): Castle => {
    return {
      castleId: castle.castle_id as Uuid,
      name: castle.name,
      aka: castle.aka,
      description: castle.description,
      latitude: castle.latitude,
      longitude: castle.longitude,
      updatedAt: castle.created_at,
    };
  },
};
