import { Either } from "./Result"


export interface ValidatedUser {
  validName: string
  ValidEmail: string
  validPassword: string
}

export interface HashedPasswordValidatedUser {
  validName: string
  ValidEmail: string
  HashedPassword: string
}

