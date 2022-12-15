import { Period } from '@bill/domain/requiredFields/period'
import { HttpErrorResponse } from '@core/infra/middleware/http_error_response'
import { Invoice, InvoiceIdEntity, Pricing } from 'bill'
import * as TE from 'fp-ts/lib/TaskEither'

interface Props {
  pricing: Pricing
  teamMemberLimit: number
  period: Period
}

export type CreateInvoiceNumberDB = () => Promise<InvoiceIdEntity>

export type CreateInvoicesService = (db: CreateInvoiceNumberDB) => (data: Props) => TE.TaskEither<HttpErrorResponse, Invoice>
