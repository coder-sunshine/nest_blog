import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsConfirmRule(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "IsConfirmRule",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          return Boolean(value == args.object[`${args.property}_confirm`]);
        }
      }
    });
  };
}
