import { Injectable } from "@nestjs/common";
import RegisterDto from "./dto/register.dto";
@Injectable()
export class UserService {
  async register(user: RegisterDto) {
    console.log("user", user);
  }
}
