import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { ArticleModule } from "./article/article.module";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    ArticleModule,
    CategoryModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
