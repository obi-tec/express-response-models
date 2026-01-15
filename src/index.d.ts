import express from 'express';

declare module '@obi-tec/express-response-models' {

  interface Response {
    success(res: express.Response, body?: any, statusCode?: number, headers?: any, cache?: number): void;
    error(res: express.Response, error: any, preserveBody?: boolean): any;
  }

  type LogType = 'warn' | 'error' | 'info' | 'debug';

  export class ErrorHttp extends Error {
    constructor(
      message: string,
      httpStatusCode: number,
      businessStatusCode: string,
      originalError?: Error | null,
      logType?: LogType
    );
    name: string;
    httpStatusCode: number;
    businessStatusCode: string;
    logType: LogType;
    originalError?: {
      name: string;
      message: string;
      [key: string]: any;
    } | null;
  }



  export const response: Response;
}