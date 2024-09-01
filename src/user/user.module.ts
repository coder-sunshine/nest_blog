import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get("TOKEN_SECRET"),
          signOptions: {
            expiresIn: "1d"
          }
        };
      }
    })
  ],
  controllers: [UserController],
  // 这里不能导出 JwtService，否则会报错，本来就只在 本模块用
  // https://stackoverflow.com/questions/72831836/secretorprivatekey-must-have-a-value-nestjs
  providers: [UserService]
})
export class UserModule {}
