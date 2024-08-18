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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.userProgress);
    await db.delete(schema.lessonTopics);
    await db.delete(schema.lessonSections);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);

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
        url: "https://www.youtube.com/embed/-JhOFyw2WlI?si=DNMZmigFEkm3NgoW",
        title: "قواعد النحو الفرنسية",
        description:
          "في هذا الدرس، سنتعلم قواعد النحو الفرنسية وسيساعدكم على فهم البناء الصحيح للجُمل وتنسيق الأفعال والصفات والأضافات والظروف والعوامل التجميلية الأخرى في الجمل.",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        url: "https://www.youtube.com/embed/tG2ae8mZmic?si=vBwt6gWsMJ-DL4uN",
        title: "الصرف الفرنسي",
        description:
          "في هذا الدرس، سنتعلم الصرف الفرنسي للأفعال وأشهر الأزمنة الفرنسية وأساليب استخدامها.",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        url: "https://www.youtube.com/embed/70gxgZfpsFU?si=ak48R_5iOTEuD3PH",
        title: "الإملاء الفرنسي",
        description:
          "في هذا الدرس، سنتعلم الإملاء الفرنسي وقواعد استخدامها بشكل صحيح.",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        url: "https://www.youtube.com/embed/qvI_7St3mBk?si=rP_NpciIVpPCtDKj",
        title: "تنسيق الجُمل باللغة الفرنسية",
        description:
          "في هذا الدرس، سنتعلم كيفية تنسيق الجمل باللغة الفرنسية واستخدام الأفعال والصفات والأضافات والظروف وغيرها بشكل صحيح.",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        url: "https://www.youtube.com/embed/0HoMvKbZTjs?si=NpLZAx8F9q8n02DP",
        title: "أساليب التعبير ووسائل التواصل باللغة الفرنسية",
        description:
          "في هذا الدرس، سنتعلم أساليب التعبير ووسائل التواصل المختلفة في اللغة الفرنسية وكيفية التعبير بشكل صحيح.",
      },
      {
        id: 6,
        unitId: 2,
        order: 1,
        url: "https://www.youtube.com/embed/RO4d-3Pmg3k?si=1Ii5qK5w_RRsIDoh",
        title: "المفردات والأساليب الأساسية في اللغة الفرنسية",
        description:
          "في هذا الدرس، سنتعلم المفردات والأساليب الأساسية في اللغة الفرنسية مثل الأفعال والأسماء والصفات والظروف والعبارات الشائعة، بالإضافة إلى التعبيرات الصوتية في اللغة الفرنسية.",
      },
      {
        id: 7,
        unitId: 2,
        order: 2,
        url: "https://www.youtube.com/embed/DGCB0ySwfok?si=J12VGUvbexX30pbe",
        title: "أفعال اللغة الفرنسية الأساسية",
        description:
          "في هذا الدرس، سنتعلم الأفعال الأساسية في اللغة الفرنسية وكيفية تصريفها بشكل صحيح.",
      },
      {
        id: 8,
        unitId: 2,
        order: 3,
        url: "https://www.youtube.com/embed/JIEcdhvb5BQ?si=jkxChWgE0GO6Zqjs",
        title: "العبارات الشائعة في اللغة الفرنسية",
        description:
          "في هذا الدرس، سنتعلم العبارات الشائعة في اللغة الفرنسية وكيفية استخدامها للتحدث والتواصل بشكل صحيح.",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: 'Which one of this is the "the man"',
      },
      {
        id: 2,
        lessonId: 6,
        type: "SELECT",
        order: 2,
        question: 'Which one of this is the "the man"',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        correct: true,
        audioSrc: "/es_man.mp3",
        content: "man",
      },
      {
        id: 2,
        challengeId: 1,
        correct: false,
        audioSrc: "/woman.mp3",
        content: "woman",
      },
      {
        id: 3,
        challengeId: 1,
        correct: false,
        audioSrc: "/es_robot.mp3",
        content: "robot",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 4,
        challengeId: 2,
        correct: true,
        audioSrc: "/es_man.mp3",
        content: "man",
      },
      {
        id: 5,
        challengeId: 2,
        correct: false,
        audioSrc: "/woman.mp3",
        content: "woman",
      },
      {
        id: 6,
        challengeId: 2,
        correct: false,
        audioSrc: "/es_robot.mp3",
        content: "robot",
      },
    ]);
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
  }
};

main();
