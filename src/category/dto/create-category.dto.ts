import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: "类别名称不能为空" })
  @IsString({ message: "类别名称必须是字符串" })
  title: string;
}
