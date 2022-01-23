import { Router } from 'express'

import CreateAcountMiddleware from '../../Middleware/create_account'




const router = Router()

router.get('/create', CreateAcountMiddleware)

export default router
