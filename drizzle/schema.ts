import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v4 } from 'uuid';

const uuid = (key: string) =>
  text(key)
    .notNull()
    .$defaultFn(() => v4());
const createdAt = () =>
  integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date());
const updatedAt = () =>
  integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date());

export const CastlesSchema = sqliteTable('castles', {
  id: uuid('id').primaryKey(),
  latest_version_id: uuid('latest_version_id').references(() => CastleVersionsSchema.id),
});

export const CastleVersionsSchema = sqliteTable('castle_versions', {
  id: uuid('id').primaryKey(),
  castle_id: uuid('castle_id'),
  name: text('name').notNull(),
  aka: text('aka', { mode: 'json' })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
  description: text('description').notNull(),
  editor_user_id: uuid('editor_user_id'),
  created_at: createdAt(),
});

export const UserSchema = sqliteTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  sub: text('sub').notNull(),
  created_at: createdAt(),
  updated_at: updatedAt(),
});
