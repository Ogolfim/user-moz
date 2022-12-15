import { Id } from '@bill/domain/requiredFields/id'
import { Pricing } from 'bill'
import { Locale } from 'mozeconomia'

interface Data {
  pricingId: Id
  locale: Locale
}

export type FindPricingByIdDB = (data: Data) => Promise<Pricing>
