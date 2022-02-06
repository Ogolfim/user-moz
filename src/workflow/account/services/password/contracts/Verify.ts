import { Password } from '../../../domain/requiredFields/Password'

export type VerifyPassword = (password: Password, hash: string) => Promise<boolean>
