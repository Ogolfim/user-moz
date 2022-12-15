import { Id } from '@bill/domain/requiredFields/id'
import { Bill } from 'bill'

export type FindBillByIdDB = (data: Id) => Promise<Bill>

export type FindActiveBillsDB = () => Promise<Bill[]>
