import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { ServiceIdCodec } from '../service_id'
import { BillPeriodCodec } from '../bill_period'

export const ICreateBillPropsCodec = t.type({
  services: t.array(ServiceIdCodec),
  billPeriod: BillPeriodCodec,
  userId: UUID
})

export type ICreateBillProps = t.TypeOf<typeof ICreateBillPropsCodec>
