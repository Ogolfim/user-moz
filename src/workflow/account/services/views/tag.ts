import { TagSchema } from '@account/infra/prisma/schemas'

interface Tag {
  id: string
  title: string
}

export const tagView = (tag: TagSchema): Tag => {
  return {
    id: tag.id,
    title: tag.title
  }
}

export const manyTagView = (tags: TagSchema[]): Tag[] => {
  return tags.map(tag => tagView(tag))
}
