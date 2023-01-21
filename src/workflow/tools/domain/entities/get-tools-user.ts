import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { GetToolsUserDB } from '@tools/domain/Contracts/GetToolsUser'
import { ToolsUserEntity } from 'tools'

export const getToolsUserDB: GetToolsUserDB = async ({ userId }) => {
  const collection = (await clientDB).db().collection('tools')

  const found = await collection.findOne({ userId }) as unknown as ToolsUserEntity

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
