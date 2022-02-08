import { TagSchema } from '@account/infra/prisma/schemas'

interface Tag {
  id: string
  title: string
}

export type TagView = (tag: TagSchema) => Tag
export type ManyTagView = (tag: TagSchema[]) => Tag[]
