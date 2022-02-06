import { Router } from 'express'
import { meAdminLoggerController } from './controller/meadmin_logger'
import { meAdminRegisterController } from './controller/meadmin_register'
import { tagCreatorController } from './controller/tag_creator'

const MeAdminRouter = Router()

MeAdminRouter.post('/create', meAdminRegisterController)
MeAdminRouter.post('/create_tag', tagCreatorController)
MeAdminRouter.post('/login', meAdminLoggerController)

export default MeAdminRouter
