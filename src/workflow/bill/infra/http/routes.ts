import { createBillController } from '@bill/infra/http/controller/create-bill'
import { getAllBillsController } from '@bill/infra/http/controller/get-all-bills'
import { getBillController } from '@bill/infra/http/controller/get-bill'
import { getBillsController } from '@bill/infra/http/controller/get-bills'
import { getInvoiceController } from '@bill/infra/http/controller/get-invoice'
import { getPaymentMethodController } from '@bill/infra/http/controller/get-payment-method'
import { getAllPricingController } from '@bill/infra/http/controller/get-services'
import { FastifyPluginCallback } from 'fastify'

export const billRouter: FastifyPluginCallback = (app, _option, done) => {
  app.get('/v1/pricing/:locale', getAllPricingController)
  app.get('/v1/payment-method', getPaymentMethodController)

  app.post('/v1/bill', createBillController)

  app.get('/v1/invoice', getInvoiceController)

  app.get('/v1/bill/:id', getBillController)
  app.get('/v1/bills', getBillsController)
  app.get('/v1/all-bills', getAllBillsController)

  done()
}
