import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ResultData {
  @ApiProperty({ type: "number", default: 200 })
  code: number;

  @ApiProperty({ type: "string", default: "success" })
  msg: string;

  data?: any;

  constructor(code = HttpStatus.OK, msg?: string, data?: any) {
    this.code = code;
    this.msg = msg || "success";
    this.data = data || null;
  }

  static success(data?: any, msg?: string): ResultData {
    return new ResultData(HttpStatus.OK, msg, data);
  }

  static error(code: number = HttpStatus.BAD_REQUEST, msg: string = "fail", data?: any): ResultData {
    return new ResultData(code, msg, data);
  }
}
