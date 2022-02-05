import { Router } from 'express'
import { meAdminLoggerController } from './controller/meAdminLogger'
import { meAdminRegisterController } from './controller/meAdminRegister'
import { tagCreatorController } from './controller/tagCreator'

const MeAdminRouter = Router()

MeAdminRouter.post('/create', meAdminRegisterController)
MeAdminRouter.post('/create_tag', tagCreatorController)
MeAdminRouter.post('/login', meAdminLoggerController)

export default MeAdminRouter
