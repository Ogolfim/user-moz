import { ServiceSchema } from '@account/infra/prisma/schemas'

export const paymentStatus = {
  padding: 'PADDING',
  payed: 'PAYED',
  failed: 'FAILED'
}

export const services: ServiceSchema = {
  api: 'API',
  webDownload: 'WEB_DOWNLOAD'
}
