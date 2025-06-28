import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getDb } from "./db";

type Options = FetchCreateContextFnOptions & {
  env: Env;
};

export async function createContext({ env }: Options) {
  const db = getDb(env.DB);
  return { db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
export type Database = Context["db"];
