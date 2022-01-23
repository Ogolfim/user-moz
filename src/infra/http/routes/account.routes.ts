import { Router } from 'express'

import CreateAcountMiddleware from '../controller/create_account'




const router = Router()

router.get('/create', CreateAcountMiddleware)

export default router
