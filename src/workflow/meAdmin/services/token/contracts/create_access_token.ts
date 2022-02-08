import { MeAdminSchema } from '@meAdmin/infra/prisma/schemas'

export type CreateAccessToken = (admin: MeAdminSchema) => string
