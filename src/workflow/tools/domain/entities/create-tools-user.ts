import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { CreateToolsUserDB } from '@tools/domain/Contracts/CreateToolsUser'
import dayjs from 'dayjs'
import { ToolsUserEntity } from 'tools'

export const createToolsUserDB: CreateToolsUserDB = async ({ userId }) => {
  const collection = (await clientDB).db().collection('tools-users')

  const today = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  const { insertedId } = await collection.insertOne({
    userId,
    downloads: 0,
    active: true,
    createdAt: today,
    updateAt: today
  })

  const found = await collection.findOne({ _id: insertedId }) as unknown as ToolsUserEntity

  if (!found) {
    throw new EntityNotFoundError()
  }

  const { _id, downloads, active, createdAt, updateAt } = found

  return {
    id: _id.toString(),
    userId,
    downloads,
    active,
    createdAt,
    updateAt
  }
}
