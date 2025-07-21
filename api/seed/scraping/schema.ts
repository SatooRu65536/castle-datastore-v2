import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const scrapingCastleSchema = sqliteTable('castles', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  lat: integer('lat', { mode: 'number' }).notNull(),
  lng: integer('lng', { mode: 'number' }).notNull(),
  scale: integer('scale', { mode: 'number' }).notNull().default(1),
  updatedAt: integer('update_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});
