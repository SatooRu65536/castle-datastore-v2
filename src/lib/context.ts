import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getDb } from "./db";
import { Env } from "..";

type Options = FetchCreateContextFnOptions & {
  env: Env;
};

export async function createContext({ env }: Options) {
  const db = getDb(env.DB);
  return { db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
