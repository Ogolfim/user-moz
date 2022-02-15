import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { isServiceId } from '@bills/domain/requiredFields/is/is_service_id'

type ServiceIdBrand = {
  readonly ServiceId: unique symbol
}

export const ServiceIdCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, ServiceIdBrand> => isServiceId(value),
    'ServiceId'
  ),
  () => 'Id do serviço'
)

const IntersectServiceId = t.intersection([t.string, ServiceIdCodec])

export type ServiceId = t.TypeOf<typeof IntersectServiceId>
