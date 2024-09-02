import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import RegisterDto from "./dto/register.dto";
import { hash, verify } from "argon2";
import { PrismaService } from "@/prisma/prisma.service";
import CreateDto from "./dto/create.dto";
import { JwtService } from "@nestjs/jwt";
import { ResultData } from "@/utils/result";

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly jwt: JwtService;

  async register(dto: RegisterDto) {
    const password = await hash(dto.password);
    await this.prisma.user.create({
      data: {
        name: dto.name,
        password
      }
    });
    return ResultData.success();
  }

  async login(dto: CreateDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name
      }
    });

    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException("密码输入错误");
    }

    const token = await this.getToken(user);
    return ResultData.success(token);
  }

  private async getToken({ id, name }) {
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id
      })
    };
  }
}
