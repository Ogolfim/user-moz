import { AddressSchema, UnipersonalSchema } from '@account/infra/prisma/schemas'
import { Address, addressView } from '@account/services/views/address'

interface IUnipersonal extends UnipersonalSchema {
  address: AddressSchema
}

export interface Unipersonal {
  phone: string
  address: Address
}

export const unipersonalView = (unipersonal: IUnipersonal): Unipersonal => {
  return {
    phone: unipersonal.phone,
    address: addressView(unipersonal.address)
  }
}

export const manyUnipersonalView = (personals: IUnipersonal[]): Unipersonal[] => {
  return personals.map(unipersonal => unipersonalView(unipersonal))
}
