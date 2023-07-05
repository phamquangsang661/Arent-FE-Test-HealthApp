import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
const prisma = new PrismaClient();
const logFunction = (...info: string[]) => {
  console.log(`[${dayjs().format("YYYY/MM/DD HH:mm")}]: `, ...info);
};
const hashPassword = async (plainText: string, saltRounds: number = 10) => {
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hashSync(plainText, salt);
  return hash;
};
function randomInRange(a: number, b: number) {
  if (a > b) {
    [a, b] = [b, a]; // Đảo giá trị nếu a lớn hơn b
  }

  return Math.floor(Math.random() * (b - a + 1)) + a;
}

const listUrlMealImage = [
  "/images/meal-history-example-1.png",
  "/images/meal-history-example-2.png",
  "/images/meal-history-example-3.png",
  "/images/meal-history-example-4.png",
  "/images/meal-history-example-5.png",
  "/images/meal-history-example-6.png",
  "/images/meal-history-example-7.png",
  "/images/meal-history-example-8.png",
];

const listUrlColumnImage = [
  "/images/column-item-example-1.png",
  "/images/column-item-example-2.png",
  "/images/column-item-example-3.png",
  "/images/column-item-example-4.png",
  "/images/column-item-example-5.png",
  "/images/column-item-example-6.png",
  "/images/column-item-example-7.png",
  "/images/column-item-example-8.png",
];
async function main() {
  logFunction(
    "Seeding database, Data will be pre-generated for 60 days and back 60 days"
  );
  let time = 6;
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      time -= 1;
      logFunction(`Data will be seeding in ${time} sec`);
      if (time <= 0) {
        resolve(true);
        clearInterval(interval);
      }
    }, 1000);
  });
  logFunction("Start seeding database...");
  logFunction("Generating fake User");
  let user = await prisma.user
    .create({
      data: {
        email: "test@gmail.com",
        emailVerified: dayjs().toISOString(),
        password: await hashPassword("123456"),
      },
    })
    .then((res) => {
      logFunction("Generating fake User Success!");
      return res;
    })
    .catch((err) => {
      logFunction("Generating fake User Failed!");
      return null;
    });
  if (!user) {
    user = await prisma.user.findFirst({
      where: {
        email: "test@gmail.com",
      },
    });
    if (!user) {
      logFunction(
        'Can\'t get user, or created. Please reset DB "npm run db:reset" and try again!'
      );
      return;
    }
  }

  //Generate Body history
  logFunction("Generating body history");
  const firstOfMonth = dayjs().startOf("month");
  const last12Month = firstOfMonth.subtract(12, "month").startOf("month");
  for (
    let i = firstOfMonth.add(2, "month");
    i.isAfter(last12Month);
    i = i.subtract(1, "month").startOf("day")
  ) {
    const fat = randomInRange(50, 150);
    const weight = randomInRange(40, 80);
    await prisma.bodyHistory.create({
      data: {
        fat,
        weight,
        createdAt: i.toISOString(),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  //Generate Column tag
  let tag1 = await prisma.columnTags
    .create({
      data: {
        slug: "魚料理",
        name: "魚料理",
      },
    })
    .catch((err) => {
      return null;
    });
  if (!tag1) {
    tag1 = await prisma.columnTags.findFirst({
      where: {
        slug: "魚料理",
      },
    });
    if (!tag1) {
      logFunction(
        'Can\'t get tag, or created. Please reset DB "npm run db:reset" and try again!'
      );
      return;
    }
  }
  let tag2 = await prisma.columnTags
    .create({
      data: {
        slug: "和食",
        name: "和食",
      },
    })
    .catch((err) => {
      return null;
    });
  if (!tag2) {
    tag2 = await prisma.columnTags.findFirst({
      where: {
        slug: "和食",
      },
    });
    if (!tag2) {
      logFunction(
        'Can\'t get tag, or created. Please reset DB "npm run db:reset" and try again!'
      );
      return;
    }
  }
  let tag3 = await prisma.columnTags
    .create({
      data: {
        slug: "DHA",
        name: "DHA",
      },
    })
    .catch((err) => {
      return null;
    });

  if (!tag3) {
    tag3 = await prisma.columnTags.findFirst({
      where: {
        slug: "DHA",
      },
    });
    if (!tag3) {
      logFunction(
        'Can\'t get tag, or created. Please reset DB "npm run db:reset" and try again!'
      );
      return;
    }
  }
  //Generate Meal history
  logFunction("Generating Meal History, Diary, Column, Exercise History");
  const lastDays = dayjs().add(60, "day");
  const firstDays = dayjs().subtract(60, "day");
  for (
    let i = lastDays;
    i.isAfter(firstDays);
    i = i.subtract(1, "day").startOf("day")
  ) {
    for (let j = 0; j < 10; j++) {
      //Create at least 10 ex per day
      await prisma.exerciseHistory
        .create({
          data: {
            createdAt: i.toISOString(),
            content: `家事全般（立位・軽い`,
            kcal: randomInRange(50, 150),
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        })
        .catch(() => {
          logFunction("Failed for generate Exercise");
        });
    }

    await prisma.column
      .create({
        data: {
          createdAt: i.toISOString(),
          content: `魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ`,
          image:
            listUrlColumnImage?.[randomInRange(0, 7)] ??
            "/images/column-item-example-1.png",
          tags: {
            connect: [{ id: tag1.id }, { id: tag2.id }, { id: tag3.id }],
          },
        },
      })
      .catch(() => {
        logFunction("Failed for generate Column");
      });

    await prisma.diary
      .create({
        data: {
          createdAt: i.toISOString(),
          content: `私の日記の記録が一部表示されます。<br/>
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストトテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト`,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
      .catch(() => {
        logFunction("Failed for generate diary");
      });

    await prisma.mealHistory
      .create({
        data: {
          image:
            listUrlMealImage?.[randomInRange(0, 7)] ??
            "/images/meal-history-example-1.png",
          createdAt: i.toISOString(),
          type: "Morning",
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
      .catch(() => {
        logFunction("Failed for generate Meal History");
      });
    await prisma.mealHistory
      .create({
        data: {
          image:
            listUrlMealImage?.[randomInRange(0, 7)] ??
            "/images/meal-history-example-1.png",
          createdAt: i.toISOString(),
          type: "Lunch",
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
      .catch(() => {
        logFunction("Failed for generate Meal History");
      });
    await prisma.mealHistory
      .create({
        data: {
          image:
            listUrlMealImage?.[randomInRange(0, 7)] ??
            "/images/meal-history-example-1.png",
          createdAt: i.toISOString(),
          type: "Dinner",
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
      .catch(() => {
        logFunction("Failed for generate Meal History");
      });
    await prisma.mealHistory
      .create({
        data: {
          image:
            listUrlMealImage?.[randomInRange(0, 7)] ??
            "/images/meal-history-example-1.png",
          createdAt: i.toISOString(),
          type: "Snack",
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
      .catch(() => {
        logFunction("Failed for generate Meal History");
      });
  }
  logFunction(
    "Generated Meal History, Diary, Column, Exercise History Success"
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
