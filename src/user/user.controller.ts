import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import RegisterDto from "./dto/register.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(@Body() user: RegisterDto) {
    await this.userService.register(user);
    return "注册成功";
  }
}
