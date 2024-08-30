import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import Validate from "./common/validate";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 第一个校验不通过，后续就不校验了，如果是自定义的还是会校验
  app.useGlobalPipes(new Validate({ stopAtFirstError: true }));

  await app.listen(3000);
}
bootstrap();
