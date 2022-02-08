import { Router } from 'express'

import AccountRouter from '@account/infra/http/routes'
import MeAdminRouter from '@meAdmin/infra/http/routes'

const router = Router()

router.use('/account', AccountRouter)
router.use('/admin', MeAdminRouter)

export default router
