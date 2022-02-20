import { AddUserToTagsDB } from '@account/domain/contracts/User/Tags/AddUserToTags'
import { prisma } from '@core/infra/prisma/client'

export const addUserToTagsDB: AddUserToTagsDB = async ({ userId, tags }) => {
  for (const tag of tags) {
    await prisma.tag.update({
      where: {
        id: tag.id
      },
      data: {
        users: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  return { userId, tags }
}
