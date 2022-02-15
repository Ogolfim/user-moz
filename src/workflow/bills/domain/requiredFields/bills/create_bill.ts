import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { ServiceIdCodec } from '../service_id'
import { BillPeriodCodec } from '../bill_period'

export const ICreateBillCodec = t.type({
  services: t.array(ServiceIdCodec),
  billPeriod: BillPeriodCodec,
  userId: UUID
})

export type ICreateBill = t.TypeOf<typeof ICreateBillCodec>
