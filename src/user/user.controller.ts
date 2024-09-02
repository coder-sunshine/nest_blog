import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import RegisterDto from "./dto/register.dto";
import CreateDto from "./dto/create.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("用户")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "注册", description: "用户注册" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "注册成功",
    type: String
  })
  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return await this.userService.register(dto);
  }

  @Post("login")
  async login(@Body() dto: CreateDto) {
    return await this.userService.login(dto);
  }
}
