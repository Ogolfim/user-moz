import * as t from 'io-ts'
import { PostcodeCodec } from '@account/domain/requiredFields/postcode'
import { ProvinceOrStateCodec } from '@account/domain/requiredFields/province_or_state'
import { CityCodec } from '@account/domain/requiredFields/city'
import { Address1Codec } from '@account/domain/requiredFields/address_1'
import { Address2Codec } from '@account/domain/requiredFields/address_2'
import { CountryCodec } from '@account/domain/requiredFields/country'

export const AddressCodec = t.type({
  country: CountryCodec,
  provinceOrState: ProvinceOrStateCodec,
  city: CityCodec,
  address1: Address1Codec,
  address2: Address2Codec,
  postcode: PostcodeCodec
})

export type Address = t.TypeOf<typeof AddressCodec>
