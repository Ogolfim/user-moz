import { Router } from 'express'

import { createBillController } from '@bills/infra/http/controller/createBill'

const BillsRouter = Router()

BillsRouter.post('/create', createBillController)

export default BillsRouter
