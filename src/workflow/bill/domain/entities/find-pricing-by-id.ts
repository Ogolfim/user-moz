import { FindPricingByIdDB } from '@bill/domain/Contracts/FindPricingById'
import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { PricingEntity } from 'bill'
import { ObjectId } from 'mongodb'

export const findPricingByIdDB: FindPricingByIdDB = async ({ pricingId, locale }) => {
  const _id = new ObjectId(pricingId)
  const collection = (await clientDB).db().collection('pricing')

  const found = await collection.findOne({ _id }) as unknown as PricingEntity

  if (!found) {
    throw new EntityNotFoundError()
  }

  const { discount, name, price, teamMemberBaseLimit, services } = found

  const pricingDiscounts = {
    period: discount.period.map(({ id, name, percentage }) => ({
      id,
      name: name[locale],
      percentage
    })),
    other: discount.other && {
      id: discount.other.id,
      name: discount.other.name[locale],
      percentage: discount.other.percentage
    }
  }

  return {
    id: pricingId,
    discount: pricingDiscounts,
    name: name[locale],
    price,
    teamMemberBaseLimit,
    services: services.map(({ id, description }) => ({
      id,
      description: description[locale]
    }))
  }
}
