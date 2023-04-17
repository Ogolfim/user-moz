import { emailServerHost, emailServerPassword, emailServerPort, emailServerUser } from '@utils/env'
import nodemailer from 'nodemailer'
import { Options } from 'nodemailer/lib/mailer'

const transporter = nodemailer.createTransport({
  host: emailServerHost,
  port: Number(emailServerPort),
  auth: {
    user: emailServerUser,
    pass: emailServerPassword
  }
})

const sendMail = async (msg: Options) => {
  await transporter.sendMail(msg)
}
export default sendMail
