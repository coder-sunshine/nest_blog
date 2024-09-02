import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import Validate from "./common/validate";
// import { TransformInterceptor } from "./transform.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ResponseInterceptorBase } from "./response.Interceptor.base";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 第一个校验不通过，后续就不校验了，如果是自定义的还是会校验
  app.useGlobalPipes(new Validate({ stopAtFirstError: true }));

  // app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptorBase());

  const config = app.get(ConfigService);

  // 设置 api 访问前缀
  const prefix = config.get<string>("PREFIX");
  app.setGlobalPrefix(prefix);

  const swaggerOptions = new DocumentBuilder()
    .setTitle("Nest-Blog App")
    .setDescription("Nest-Blog App 接口文档")
    .setVersion("1.0.0")
    .addBearerAuth() // 添加 Bearer Token 认证
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  // 项目依赖当前文档功能，最好不要改变当前地址
  // 生产环境使用 nginx 可以将当前文档地址 屏蔽外部访问
  SwaggerModule.setup(`${prefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true
    },
    customSiteTitle: "Nest-Blog API Docs"
  });

  await app.listen(3000);
}
bootstrap();
