import { UUID } from 'io-ts-types'
import { CustomerSchema } from '@bills/infra/prisma/schemas'

export type FindCustomerByIdDB = (id: UUID) => Promise<CustomerSchema | null>
