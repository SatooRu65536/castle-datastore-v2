import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../drizzle/schema";

export const getDb = (db: D1Database) => {
  return drizzle(db, { schema });
};
