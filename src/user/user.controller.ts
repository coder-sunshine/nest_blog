import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import RegisterDto from "./dto/register.dto";
import CreateDto from "./dto/create.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(@Body() dto: RegisterDto) {
    await this.userService.register(dto);
    return "注册成功";
  }

  @Post("login")
  async login(@Body() dto: CreateDto) {
    return await this.userService.login(dto);
  }
}
