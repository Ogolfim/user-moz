import { Router } from 'express'

import {CreateAccountMiddleware} from '../controller/create_account'




const router = Router()

router.post('/create', CreateAccountMiddleware)

export default router
