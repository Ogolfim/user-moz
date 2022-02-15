import { RefreshTokenSchema } from '@account/infra/prisma/schemas'
import { JWTVerifyResult } from 'jose'

export type CreateRefreshAccessToken = (user: RefreshTokenSchema) => Promise<string>
export type VerifyRefreshAccessToken = (token: string) => Promise<JWTVerifyResult>
