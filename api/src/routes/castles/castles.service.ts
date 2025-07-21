import { and, count, desc, eq, gte, InferSelectModel, lte, max } from 'drizzle-orm';
import { CastlesSchema, CastleVersionsSchema, TagSchema } from '../../../drizzle/schema';
import { Uuid } from '../../index.dto';
import { Database } from '../../lib/context';
import { Castle, AddCastle, GetCastle, ListCastleOptions, UpdateCastle, CastleInfo } from './castles.dto';
import { v4 } from 'uuid';
import { TRPCError } from '@trpc/server';

export const castlesService = {
  /**
   * 新しい城を追加する
   * @param {Database} db
   * @param {CreateCastle DTO} input
   * @returns {Castle} 作成された城の情報
   */
  add: async (db: Database, input: AddCastle): Promise<Castle> => {
    const castleId = v4() as Uuid;

    const castleVersions = await db
      .insert(CastleVersionsSchema)
      .values({
        castleId: castleId,
        name: input.name,
        aka: input.aka,
        description: input.description,
        latitude: input.latitude,
        longitude: input.longitude,
        editorUserId: v4(), // TODO
        structures: input.structures,
        tags: input.tags,
        scale: castlesService.calcScale(input),
      })
      .returning();

    const castleVersion = castleVersions[0];
    if (!castleVersion) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create castle version',
      });
    }

    await db.insert(CastlesSchema).values({
      id: castleId,
      latestVersionId: castleVersion.id,
    });

    return castlesService.toCastle(castleVersion);
  },

  /**
   * 城の情報を取得する
   * @param {Database} db
   * @param {Uuid} castleId
   * @returns {Castle} 城の情報
   */
  get: async (db: Database, { castleId }: GetCastle): Promise<Castle> => {
    const res = await db
      .select()
      .from(CastlesSchema)
      .innerJoin(CastleVersionsSchema, eq(CastlesSchema.latestVersionId, CastleVersionsSchema.id))
      .where(and(eq(CastlesSchema.id, castleId), eq(CastleVersionsSchema.deleted, false)))
      .limit(1);

    const castle = res[0]?.castle_versions;
    if (!castle) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Castle not found',
      });
    }

    return castlesService.toCastle(castle);
  },

  /**
   * 城の情報を更新する
   * @param {Database} db
   * @param {Castle} castle
   * @returns {Castle} 更新された城の情報
   */
  update: async (db: Database, castle: UpdateCastle): Promise<Castle> => {
    await castlesService.get(db, { castleId: castle.castleId }); // 存在確認

    // 既存のバージョンを削除
    await db
      .update(CastleVersionsSchema)
      .set({ deleted: true })
      .where(eq(CastleVersionsSchema.castleId, castle.castleId));

    // 新しいバージョンを追加
    const updatedVersionRes = await db
      .insert(CastleVersionsSchema)
      .values({
        castleId: castle.castleId,
        name: castle.name,
        aka: castle.aka,
        description: castle.description,
        latitude: castle.latitude,
        longitude: castle.longitude,
        editorUserId: v4(), // TODO
        structures: castle.structures,
        tags: castle.tags,
        scale: castlesService.calcScale(castle),
      })
      .returning();

    const updatedVersion = updatedVersionRes[0];
    if (!updatedVersion) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update castle version',
      });
    }

    // 紐付けを更新
    await db.update(CastlesSchema).set({
      latestVersionId: updatedVersion.id,
    });

    return castlesService.toCastle(updatedVersion);
  },

  /**
   * 城の情報を削除する
   * @param {Database} db
   * @param {GetCastle} input
   * @returns {Castle} 削除された城の情報
   */
  delete: async (db: Database, { castleId }: GetCastle): Promise<void> => {
    const castle = await castlesService.get(db, { castleId });
    if (!castle) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Castle not found',
      });
    }

    const res = await db
      .insert(CastleVersionsSchema)
      .values({
        castleId: castle.castleId,
        name: castle.name,
        aka: castle.aka,
        description: castle.description,
        latitude: castle.latitude,
        longitude: castle.longitude,
        editorUserId: v4(), // TODO
        structures: castle.structures,
        tags: castle.tags,
        deleted: true,
      })
      .returning();
    const deletedCastle = res[0];
    if (!deletedCastle) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to delete castle',
      });
    }

    // 最新バージョンを更新
    await db
      .update(CastlesSchema)
      .set({
        latestVersionId: deletedCastle.id,
      })
      .where(eq(CastlesSchema.id, castle.castleId));
  },

  /**
   * 全ての城の情報を取得する
   * @param {Database} db
   * @returns {Castle[]} 城の情報のリスト
   */
  list: async (db: Database, options: ListCastleOptions): Promise<Castle[]> => {
    const res = await db
      .select()
      .from(CastlesSchema)
      .innerJoin(CastleVersionsSchema, eq(CastlesSchema.latestVersionId, CastleVersionsSchema.id))
      .where(
        and(
          eq(CastleVersionsSchema.deleted, false),
          gte(CastleVersionsSchema.latitude, options.minLatitude),
          gte(CastleVersionsSchema.longitude, options.minLongitude),
          lte(CastleVersionsSchema.latitude, options.maxLatitude),
          lte(CastleVersionsSchema.longitude, options.maxLongitude),
          gte(CastleVersionsSchema.scale, options.minScale),
        ),
      )
      .orderBy(desc(CastleVersionsSchema.scale))
      .limit(options.maxResults);

    return res.map((d) => castlesService.toCastle(d.castle_versions));
  },

  /**
   * 城のタグ情報を取得する
   * @param db
   */
  info: async (db: Database): Promise<CastleInfo> => {
    const res = await db
      .select({ num: count(CastlesSchema.id), updatedAt: max(CastleVersionsSchema.createdAt) })
      .from(CastlesSchema)
      .innerJoin(CastleVersionsSchema, eq(CastlesSchema.latestVersionId, CastleVersionsSchema.id))
      .where(eq(CastleVersionsSchema.deleted, false));
    const info = res.at(0);
    const num = info?.num;
    const updatedAt = info?.updatedAt;

    if (num && updatedAt) {
      return {
        num,
        updatedAt,
      };
    }

    return {
      num: 0,
      updatedAt: new Date('2025-04-06'),
    };
  },

  /**
   * CastleVersionsSchema のレコードを Castle DTO に変換する
   */
  toCastle: (d: InferSelectModel<typeof CastleVersionsSchema>): Castle => {
    return {
      castleId: d.castleId as Uuid,
      name: d.name,
      aka: d.aka,
      description: d.description,
      latitude: d.latitude,
      longitude: d.longitude,
      updatedAt: d.createdAt,
      scale: d.scale,
      tags: d.tags,
      structures: d.structures,
    };
  },

  /**
   * 城のスケールを計算する
   * @param {AddCastle} castle
   * @returns {number} スケール値 (0~5)
   */
  calcScale: (castle: AddCastle): number => {
    if (castle.tags.includes('日本100名城')) return 6;

    if (castle.tags.includes('続日本100名城')) return 5;

    if (castle.tags.includes('特別史跡')) return 4;
    if (castle.tags.includes('国指定史跡')) return 4;

    if (castle.tags.includes('県指定史跡')) return 3;
    if (castle.tags.includes('市指定史跡')) return 3;
    if (castle.tags.includes('区指定史跡')) return 3;
    if (castle.tags.includes('町指定史跡')) return 3;
    if (castle.tags.includes('村指定史跡')) return 3;

    if (castle.structures.length > 0) return 2;

    return 1;
  },
};
