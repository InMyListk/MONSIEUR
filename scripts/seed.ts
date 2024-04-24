import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.degrees);
    await db.delete(schema.userProgress);

    await db.insert(schema.degrees).values([
      {
        id: 1,
        title: "الصف الاول الثانوي",
      },
      {
        id: 2,
        title: "الصف الثاني الثانوي",
      },
      {
        id: 3,
        title: "الصف الثالث الثانوي",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
  }
};

main();
