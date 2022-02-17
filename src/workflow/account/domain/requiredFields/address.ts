import * as t from 'io-ts'
import { PostcodeCodec } from '@bills/domain/requiredFields/postcode'
import { ProvinceOrStateCodec } from '@bills/domain/requiredFields/province_or_state'
import { CityCodec } from '@bills/domain/requiredFields/city'
import { Address1Codec } from '@bills/domain/requiredFields/address_1'
import { Address2Codec } from '@bills/domain/requiredFields/address_2'
import { CountryCodec } from '@bills/domain/requiredFields/country'

export const AddressCodec = t.type({
  country: CountryCodec,
  provinceOrState: ProvinceOrStateCodec,
  city: CityCodec,
  address1: Address1Codec,
  address2: Address2Codec,
  postcode: PostcodeCodec
})

export type Address = t.TypeOf<typeof AddressCodec>
