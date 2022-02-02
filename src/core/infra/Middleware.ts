import { TaskEither } from "fp-ts/lib/TaskEither"
import { HttpErrorResponse } from "./HttpErrorResponse"
import { HttpSuccessResponse } from "./HttpSuccessResponse"


export type Middleware<T = any, U = any> = (httpRequest: T, httpBody?: U) 
=> TaskEither<HttpErrorResponse, HttpSuccessResponse>