import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import RegisterDto from "./dto/register.dto";
import { hash, verify } from "argon2";
import { PrismaService } from "@/prisma/prisma.service";
import CreateDto from "./dto/create.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly jwt: JwtService;

  async register(dto: RegisterDto) {
    const password = await hash(dto.password);
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        password
      }
    });
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

    return await this.getToken(user);
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
