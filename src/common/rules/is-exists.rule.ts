import { PrismaClient } from "@prisma/client";
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

// 自定义验证规则，用于检查数据库表中指定字段的值是否唯一
export function IsExistsRule(table: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "IsExistsRule", // 规则名称
      target: object.constructor, // 被装饰的类
      propertyName: propertyName, // 被装饰的属性名
      constraints: [table], // 约束参数，指定数据库表名（其他想传的参数也可以一个个的跟在后面）
      options: validationOptions, // 验证选项
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient();

          const res = await prisma[table].findFirst({
            where: {
              [args.property]: value
            }
          });

          return Boolean(res);
        }
      }
    });
  };
}
