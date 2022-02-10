import { Router } from 'express'

import { findOrCreateCustomerController } from '@bills/infra/http/controller/customer/find_or_create_customer'

const BillsRouter = Router()

BillsRouter.post('/customer', findOrCreateCustomerController)

export default BillsRouter
