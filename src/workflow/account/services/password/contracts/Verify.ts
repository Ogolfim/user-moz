import { Password } from '../../../domain/requiredFields/password'

export type VerifyPassword = (password: Password, hash: string) => Promise<boolean>
