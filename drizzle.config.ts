import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "gel",
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
});
