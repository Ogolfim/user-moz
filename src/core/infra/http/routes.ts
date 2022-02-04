import { Router } from 'express'

import AccountRouter from '../../../workflow/account/infra/http/routes'
import MeAdminRouter from '../../../workflow/meAdmin/infra/http/routes'




const router = Router()

router.use('/account', AccountRouter)
router.use('/admin', MeAdminRouter)

export default router
