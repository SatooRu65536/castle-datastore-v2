import { drizzle } from 'drizzle-orm/libsql';
import * as schemas from '../drizzle/schema';
import { scrapingCastleSchema } from './scraping/schema';
import { InferInsertModel } from 'drizzle-orm';
import { v4 } from 'uuid';
import path from 'node:path';
import fs from 'node:fs';

import tags from './data/tags.json';
import structures from './data/structures.json';

const BATCH_SIZE = 100;
const EDITOR_USER_ID = '00000000-0000-0000-0000-000000000000';

const db = drizzle(`file:${findFirstSQLiteFile()}`, { schema: schemas });
const scrapingDb = drizzle('file:./seed/scraping/castles.db', { schema: { scrapingCastleSchema } });

function findFirstSQLiteFile(
  dir: string = path.resolve('.wrangler/state/v3/d1/miniflare-D1DatabaseObject'),
): string | null {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const result = findFirstSQLiteFile(fullPath);
      if (result) return result;
    } else if (file.endsWith('.sqlite')) {
      return fullPath;
    }
  }
  throw new Error('No SQLite file found in the specified directory.');
}

async function seed() {
  // 初期化
  await db.delete(schemas.CastlesSchema);
  await db.delete(schemas.CastleVersionsSchema);
  await db.delete(schemas.UserSchema);
  await db.delete(schemas.TagSchema);
  await db.delete(schemas.StructureSchema);

  // タグ
  await db.insert(schemas.TagSchema).values(tags);

  // 構造物
  await db.insert(schemas.StructureSchema).values(structures);

  // 城
  const total = (await scrapingDb.select({ count: scrapingCastleSchema.id }).from(scrapingCastleSchema).all()).length;
  for (let offset = 0; offset < total; offset += BATCH_SIZE) {
    const rawCastles = await scrapingDb.select().from(scrapingCastleSchema).limit(BATCH_SIZE).offset(offset).all();

    const castleVersions: InferInsertModel<typeof schemas.CastleVersionsSchema>[] = rawCastles.map((castle) => ({
      castleId: v4(),
      name: castle.name,
      description: '',
      aka: [],
      latitude: castle.lat,
      longitude: castle.lng,
      editorUserId: EDITOR_USER_ID,
      structures: [],
      tags: [],
      scale: castle.scale,
    }));

    const insertedCastles = await db.insert(schemas.CastleVersionsSchema).values(castleVersions).returning();
    const castles: InferInsertModel<typeof schemas.CastlesSchema>[] = insertedCastles.map((castle) => ({
      id: castle.castleId,
      latestVersionId: castle.id,
    }));

    await db.insert(schemas.CastlesSchema).values(castles);
  }
}

seed()
  .then(() => {
    console.log('Seeding completed successfully.');
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
  })
  .finally(() => {
    db.$client.close();
    scrapingDb.$client.close();
  });
