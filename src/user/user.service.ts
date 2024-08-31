import { Inject, Injectable } from "@nestjs/common";
import RegisterDto from "./dto/register.dto";
import { hash } from "argon2";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  async register(user: RegisterDto) {
    const password = await hash(user.password);
    return await this.prisma.user.create({
      data: {
        name: user.name,
        password
      }
    });
  }
}
