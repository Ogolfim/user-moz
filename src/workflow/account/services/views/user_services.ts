import { UserServicesSchema } from '@account/infra/prisma/schemas'

interface UserServices {
  api: boolean
  webDownload: boolean
}

export const userServiceView = (userServices: UserServicesSchema): UserServices => {
  return {
    api: userServices.api,
    webDownload: userServices.webDownload
  }
}
