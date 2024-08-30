import { IsNotEmpty } from "class-validator";
import { IsConfirmRule } from "@/common/rules/is-confirm.rule";
import { IsNotExistsRule } from "@/common/rules/is-not-exists.rule";

// 执行顺序  从下至上

export default class RegisterDto {
  @IsNotExistsRule("user", { message: "用户已经注册" })
  @IsNotEmpty({ message: "用户名不能为空" })
  name: string;

  @IsConfirmRule({ message: "两次密码不一致" })
  @IsNotEmpty({ message: "密码不能为空" })
  password: string;

  @IsNotEmpty({ message: "确认密码不能为空" })
  password_confirm: string;
}
