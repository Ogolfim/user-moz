import { Router } from 'express'

import { CreateAccountController } from '../controller/create_account'

const router = Router()

router.post('/create', CreateAccountController)

export default router
