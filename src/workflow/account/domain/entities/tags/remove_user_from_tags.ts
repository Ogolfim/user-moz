import { RemoveUserFromTagsDB } from '@account/domain/contracts/User/Tags/RemoveUserFromTagsService'
import { prisma } from '@account/infra/prisma/client'

export const removeUserFromTagsDB: RemoveUserFromTagsDB = async ({ userId, tags }) => {
  for (const tag of tags) {
    await prisma.tag.update({
      where: {
        id: tag.id
      },
      data: {
        users: {
          disconnect: {
            id: userId
          }
        }
      }
    })
  }

  return { userId, tags }
}
