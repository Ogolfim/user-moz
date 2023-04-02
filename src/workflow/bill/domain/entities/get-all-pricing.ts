import { GetAllPricingDB } from '@bill/domain/Contracts/GetAllPricing'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { PricingEntity } from 'bill'
import { Locale } from 'mozeconomia'

export const getAllPricingDB: GetAllPricingDB = async ({ locale }) => {
  const collection = (await clientDB).db().collection('pricing')

  const found = await collection.find().toArray() as unknown as PricingEntity[]

  if (!found[0]) {
    throw new EntityNotFoundError()
  }

  const prices = found.map((pricing) => {
    const { _id, name, price, teamMemberBaseLimit, discount, services } = pricing

    const id = _id.toString()

    const pricingDiscounts = {
      period: discount.period.map(({ id, name, percentage }) => ({
        id,
        name: name[locale as Locale],
        percentage
      })),
      other: discount.other && {
        id: discount.other.id,
        name: discount.other.name[locale as Locale],
        percentage: discount.other.percentage
      }
    }

    return {
      id,
      discount: pricingDiscounts,
      name: name[locale as Locale],
      price,
      teamMemberBaseLimit,
      services: services.map(({ id, description }) => ({
        id,
        description: description[locale as Locale]
      }))
    }
  })

  return prices
}
