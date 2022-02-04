import { Router } from 'express'
import { meAdminRegisterController } from './controller/meAdminRegisterController'
import { tagCreatorController } from './controller/tagCreator'


const MeAdminRouter = Router()

MeAdminRouter.post('/create', meAdminRegisterController)
MeAdminRouter.post('/create_tag', tagCreatorController)



export default MeAdminRouter
