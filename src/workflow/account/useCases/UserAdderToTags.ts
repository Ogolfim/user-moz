import * as TE from 'fp-ts/lib/TaskEither'
import { Email } from '../domain/requiredFields/Email'
import { Name } from '../domain/requiredFields/Name'
import { Tag } from '../domain/requiredFields/Tag'
import { UserAdderToTagsProps } from '../domain/requiredFields/Users/UserAdderToTagsProps'

export interface Event {
  name: Name
  email: Email
  tags: Tag[]
}

export type UserLoggerByOauth = (user: UserAdderToTagsProps) => TE.TaskEither<Error, Event>