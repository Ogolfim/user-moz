import { UserSchema } from '@account/infra/prisma/schemas'
import { JwtPayload } from 'jsonwebtoken'

interface User extends UserSchema {
  services: {
    api: boolean,
    webDownload: boolean
  }
}

export type CreateAccessToken = (user: User) => Promise<string>
export type VerifyAccessToken = (token: string) => Promise<JwtPayload>
