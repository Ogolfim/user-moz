import { AddressSchema } from '@core/infra/prisma/schemas'

export interface Address {
  country: string
  provinceOrState: string
  city: string
  address1: string
  address2: string
  postcode: string
}

export const addressView = (address: AddressSchema): Address => {
  return {
    country: address.country,
    provinceOrState: address.provinceOrState,
    city: address.city,
    address1: address.address1,
    address2: address.address2,
    postcode: address.postcode
  }
}

export const manyAddressesView = (addresses: AddressSchema[]): Address[] => {
  return addresses.map(address => addressView(address))
}
