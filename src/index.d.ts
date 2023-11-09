import ErrorHttp from "./_error";
import express from 'express';

declare module '@obi-tec/express-response-models' {

  interface Response {
    success(res: express.Response, body?: any, statusCode?: number, headers?: any, cache?: number): void;
    error(res: express.Response, error: any, preserveBody?: boolean): any;
  }


  export const ErrorHttp: ErrorHttp;
  export const response: Response;
}