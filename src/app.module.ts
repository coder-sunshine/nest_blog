import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { ArticleModule } from "./article/article.module";

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    ArticleModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
