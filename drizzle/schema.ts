import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v4 } from 'uuid';
import { CastleStructure } from '../src/routes/castles/castles.dto';

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
  latestVersionId: uuid('latest_version_id').references(() => CastleVersionsSchema.id),
});

export const CastleVersionsSchema = sqliteTable('castle_versions', {
  id: uuid('id').primaryKey(),
  castleId: uuid('castle_id'),
  name: text('name').notNull(),
  aka: text('aka', { mode: 'json' })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
  tags: text('tags', { mode: 'json' })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
  structures: text('structures', { mode: 'json' })
    .notNull()
    .$type<CastleStructure[]>()
    .default(sql`'[]'`),
  description: text('description').notNull(),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  editorUserId: uuid('editor_user_id'),
  scale: integer('scale').notNull().default(0),
  deleted: integer('deleted', { mode: 'boolean' }).default(false),
  createdAt: createdAt(),
});

export const UserSchema = sqliteTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  sub: text('sub').notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const TagSchema = sqliteTable('tags', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').default(''),
});

export const StructureSchema = sqliteTable('structures', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').default(''),
});
