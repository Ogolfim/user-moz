import { RefreshTokenSchema } from '@account/infra/prisma/schemas'
import { JwtPayload } from 'jsonwebtoken'

export type CreateRefreshAccessToken = (user: RefreshTokenSchema) => Promise<string>
export type VerifyRefreshAccessToken = (token: string) => Promise<JwtPayload>
