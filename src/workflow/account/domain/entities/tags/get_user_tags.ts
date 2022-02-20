import { GetUserTagsDB } from '@account/domain/contracts/User/Tags/GetUserTags'
import { prisma } from '@core/infra/prisma/client'

export const getUserTagsDB: GetUserTagsDB = async (userId) => {
  const { tags } = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      tags: true
    }
  })

  return tags
}
