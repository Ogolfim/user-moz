import { Either } from "./Result"


export interface User {
  name: string
  email: string
  password: string
}


export type ValidateUser = ({ name, email, password }: User) => Either<User, Error>
