import { Left, Right } from "fp-ts/lib/Either";


export type Either<Success, Error> = Right<Success> | Left<Error>