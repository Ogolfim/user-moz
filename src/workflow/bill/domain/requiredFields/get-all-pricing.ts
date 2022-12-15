import { LocaleCodec } from '@core/domain/requiredFields/locale'
import * as t from 'io-ts'

export const GetAllPricingPropsCodec = t.type({
  locale: LocaleCodec
})

export type GetAllPricingProps = t.TypeOf<typeof GetAllPricingPropsCodec>
