import sendMail from '@core/services/email/config/send-mail'
import { MailDataRequired } from '@sendgrid/mail'
import { UserSupportProps } from '@user/domain/requiredFields/user-support'
import dayjs from 'dayjs'
import { config } from 'dotenv'
import fs from 'fs'
import handlebars from 'handlebars'
import { resolve } from 'path'

config()

interface SendEmailProps extends UserSupportProps {
}

interface TempletePros extends UserSupportProps {
  date: string
}

const SERVER_URL = process.env.SERVER_URL

if (!SERVER_URL) {
  throw new Error('Ops, SERVER_URL is empty from .env')
}

const fromEmail = 'team@mozeconomia.co.mz'

const userTempletePath = resolve(__dirname, '..', 'templete', 'me', 'user-support.hbs')
const userTemplete = fs.readFileSync(userTempletePath).toString('utf-8')

const mailTemplateParse = handlebars.compile(userTemplete)

export const sendEmailSupport = async ({ name, phoneNumber, email, message, service }: SendEmailProps) => {
  const date = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  const templetePros: TempletePros = {
    name,
    phoneNumber,
    email,
    message,
    service,
    date
  }

  const html = mailTemplateParse(templetePros)

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
