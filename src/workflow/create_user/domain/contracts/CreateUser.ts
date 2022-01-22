import { Left, Right } from 'fp-ts/lib/Either'
import { clientError, unauthorized, HttpResponse } from '../../../../core/infra/HttpResponse'

import Email from './Email'

type Either<Success, Error> = Right<Success> | Left<Error>

interface UncreatedUser {
  name: Name
  email: Email
  password: Password
}

interface createdUser {
  name: Name
  email: Email
}


type CreationError<Error = clientError> = HttpResponse


type CreateUser = (user: UncreatedUser) => Either<createdUser, CreationError>

export declare const chain: <E, A, B>(f: (email: Email) => Either<Email, Error>) => (ma: Either<E, A>) => Either<E, B>
