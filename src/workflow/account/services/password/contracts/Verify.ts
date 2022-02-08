import { Password } from '@account/domain/requiredFields/password'

export type VerifyPassword = (password: Password, hash: string) => Promise<boolean>
