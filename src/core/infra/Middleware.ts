import { TaskEither } from 'fp-ts/lib/TaskEither'
import { HttpErrorResponse } from './http_error_response'
import { HttpSuccessResponse } from './http_success_response'

export type Middleware<T = any, U = any> = (httpRequest: T, httpBody?: U)
=> TaskEither<HttpErrorResponse, HttpSuccessResponse>
