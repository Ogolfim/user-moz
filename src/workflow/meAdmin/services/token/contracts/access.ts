import { MeAdminSchema } from '@meAdmin/infra/prisma/schemas'
import { JWTVerifyResult } from 'jose'

export type CreateAccessToken = (user: MeAdminSchema) => Promise<string>
export type VerifyAccessToken = (token: string) => Promise<JWTVerifyResult>
