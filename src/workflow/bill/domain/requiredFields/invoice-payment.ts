import { IdCodec } from '@bill/domain/requiredFields/id'
import { InvoiceCodeCodec } from '@bill/domain/requiredFields/invoice-code'
import { PaymentMethodIdCodec } from '@bill/domain/requiredFields/payment-method-id'
import { AddressCodec } from '@user/domain/requiredFields/address'
import { NameCodec } from '@user/domain/requiredFields/name'
import { PhoneNumberCodec } from '@user/domain/requiredFields/phone-number'
import * as t from 'io-ts'

export const InvoicePaymentPropsCodec = t.type({
  userId: IdCodec,
  name: NameCodec,
  phoneNumber: PhoneNumberCodec,
  address: AddressCodec,
  billId: IdCodec,
  invoiceCode: InvoiceCodeCodec,
  paymentMethodId: PaymentMethodIdCodec
})

export type InvoicePaymentProps = t.TypeOf<typeof InvoicePaymentPropsCodec>
