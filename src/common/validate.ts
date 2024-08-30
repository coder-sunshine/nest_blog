import { HttpException, HttpStatus, ValidationError, ValidationPipe } from "@nestjs/common";

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const message = {};

    validationErrors.forEach(error => {
      message[error.property] = Object.values(error.constraints)[0];
    });

    throw new HttpException(
      {
        code: 422, // 请求格式正确，但是由于含有语义错误，无法响应
        message
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
}
