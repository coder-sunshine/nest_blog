import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";
// import { random } from "lodash-es";
import { Random } from "mockjs";

const prisma = new PrismaClient();

async function run() {
  // await prisma.role.create({
  //   data: {
  //     roleName: "admin"
  //   }
  // });

  await prisma.user.create({
    data: {
      name: "admin",
      password: await hash("123456")
      // roleName: "admin"
    }
  });

  // for (let i = 1; i <= 5; i++) {
  //   await prisma.category.create({
  //     data: {
  //       title: Random.ctitle(3, 6)
  //     }
  //   });
  // }

  // for (let i = 1; i <= 5; i++) {
  //   await prisma.tag.create({
  //     data: {
  //       tagName: Random.ctitle(3, 6),
  //       color: Random.color()
  //     }
  //   });
  // }

  for (let i = 0; i < 50; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 30),
        content: Random.cparagraph(30, 50)
        // categoryId: random(1, 5),
        // comments: random(20, 50),
        // viewCount: random(10, 50),
        // tagIds: JSON.stringify([1, 2])
      }
    });
  }
}

run();
