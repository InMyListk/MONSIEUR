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

    await db.insert(schema.units).values([
      {
        id: 1,
        degreeId: 1,
        title: "القواعد الفرنسية",
        description:
          "تتضمّن هذه الوحدة دروسًا عن قواعد اللغة الفرنسية مثل النحو والصرف والإملاء، بالإضافة إلى قواعد بناء الجمل وأساليب التعبير.",
        term: "FIRST",
        order: 1,
      },
      {
        id: 2,
        degreeId: 1,
        title: "المفردات الفرنسية",
        description:
          "تتضمّن هذه الوحدة المفردات الأساسية في اللغة الفرنسية مثل الأفعال والأسماء والصفات والظروف والعبارات الشائعة، بالإضافة إلى التعبيرات الصوتية في اللغة الفرنسية.",
        term: "SECOND",
        order: 2,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        url: "",
        title: "قواعد النحو الفرنسية",
        description:
          "في هذا الدرس، سنتعلم قواعد النحو الفرنسية وسيساعدكم على فهم البناء الصحيح للجُمل وتنسيق الأفعال والصفات والأضافات والظروف والعوامل التجميلية الأخرى في الجمل.",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        url: "",
        title: "الصرف الفرنسي",
        description:
          "في هذا الدرس، سنتعلم الصرف الفرنسي للأفعال وأشهر الأزمنة الفرنسية وأساليب استخدامها.",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        url: "",
        title: "الإملاء الفرنسي",
        description:
          "في هذا الدرس، سنتعلم الإملاء الفرنسي وقواعد استخدامها بشكل صحيح.",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        url: "",
        title: "تنسيق الجُمل باللغة الفرنسية",
        description:
          "في هذا الدرس، سنتعلم كيفية تنسيق الجمل باللغة الفرنسية واستخدام الأفعال والصفات والأضافات والظروف وغيرها بشكل صحيح.",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        url: "",
        title: "أساليب التعبير ووسائل التواصل باللغة الفرنسية",
        description:
          "في هذا الدرس، سنتعلم أساليب التعبير ووسائل التواصل المختلفة في اللغة الفرنسية وكيفية التعبير بشكل صحيح.",
      },
      {
        id: 6,
        unitId: 2,
        order: 1,
        url: "",
        title: "المفردات والأساليب الأساسية في اللغة الفرنسية",
        description:
          "في هذا الدرس، سنتعلم المفردات والأساليب الأساسية في اللغة الفرنسية مثل الأفعال والأسماء والصفات والظروف والعبارات الشائعة، بالإضافة إلى التعبيرات الصوتية في اللغة الفرنسية.",
      },
      {
        id: 7,
        unitId: 2,
        order: 2,
        url: "",
        title: "أفعال اللغة الفرنسية الأساسية",
        description:
          "في هذا الدرس، سنتعلم الأفعال الأساسية في اللغة الفرنسية وكيفية تصريفها بشكل صحيح.",
      },
      {
        id: 8,
        unitId: 2,
        order: 3,
        url: "",
        title: "العبارات الشائعة في اللغة الفرنسية",
        description:
          "في هذا الدرس، سنتعلم العبارات الشائعة في اللغة الفرنسية وكيفية استخدامها للتحدث والتواصل بشكل صحيح.",
      },
    ]);
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
  }
};

main();
