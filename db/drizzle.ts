import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  "postgresql://monsieur_owner:ITkv0bjs4LDc@ep-morning-cake-a2fzio9t.eu-central-1.aws.neon.tech/monsieur?sslmode=require"
);

const db = drizzle(sql, { schema });

export default db;
