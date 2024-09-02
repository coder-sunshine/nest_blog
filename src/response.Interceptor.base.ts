import { Injectable, NestInterceptor, CallHandler, HttpStatus, ExecutionContext } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ResultData } from "@/utils/result";
import { Request, Response } from "express";

@Injectable()
export class ResponseInterceptorBase implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResultData> {
    // 因为nestjs使用REST API风格，对于post请求默认返回201，所以需要手动处理成200
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (request.method === "POST" && response.statusCode === HttpStatus.CREATED) {
      response.status(HttpStatus.OK);
    }
    return next.handle().pipe(
      map((data: ResultData) => {
        return data;
      })
    );
  }
}
