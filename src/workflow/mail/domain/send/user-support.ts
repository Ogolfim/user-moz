import sendMail from '@core/services/mail'
import { UserSupportSend } from '@mail/domain/Contracts/UserSupport'
import { MailDataRequired } from '@sendgrid/mail'

export const userSupportSend: UserSupportSend = async ({ name, html }) => {
  const fromEmail = 'team@mozeconomia.co.mz'

  const msg: MailDataRequired = {
    to: ['team@mozeconomia.co.mz', 'arlindojosboa@gmail.com'],
    from: {
      name: 'MozEconomia',
      email: fromEmail
    },
    subject: `${name} Asking for Support`,
    html: html
  }

  await sendMail(msg)
}
