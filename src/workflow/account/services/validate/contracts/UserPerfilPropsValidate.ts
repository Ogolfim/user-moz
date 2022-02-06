import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { ValidationError } from '../errors/ValidationError'

export type UserPerfilPropsValidate = (id: string) => E.Either<ValidationError, UUID>
