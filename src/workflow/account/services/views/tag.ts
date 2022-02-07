import { ManyTagView, TagView } from './contract/tag'

export const tagView: TagView = (tag) => {
  return {
    id: tag.id,
    title: tag.title
  }
}

export const manyTagView: ManyTagView = (tags) => {
  return tags.map(tag => tagView(tag))
}
