import { Password } from '../requiredFields/Password'


export type VerifyPassword = (password: Password, hash: string) => Promise<boolean>