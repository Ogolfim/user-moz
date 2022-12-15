import sendMail from '@core/services/email/config/send-mail'
import { MailDataRequired } from '@sendgrid/mail'
import { Invoice, Pricing } from 'bill'
import { config } from 'dotenv'
import fs from 'fs'
import handlebars from 'handlebars'
import { User } from 'mozeconomia'
import { resolve } from 'path'

config()

interface SendInvoiceProps {
  user: User
  invoice: Invoice
  pricing: Pricing
}

interface TempletePros {
  name: string
  plan: string
  invoiceCode: string
  teamMemberLimit: number
  subTotal: number
  total: number
  dueAt: string
  createdAt: string
  nextPayDate: string
  services: string[]
  fromEmail: string
}

const SERVER_URL = process.env.SERVER_URL

if (!SERVER_URL) {
  throw new Error('Ops, SERVER_URL is empty from .env')
}

const fromEmail = 'team@mozeconomia.co.mz'

const userTempletePath = resolve(__dirname, '..', 'templete', 'user', 'created-invoice.hbs')
const userTemplete = fs.readFileSync(userTempletePath).toString('utf-8')

const mailTemplateParse = handlebars.compile(userTemplete)

export const sendInvoicesToUser = async ({ user, invoice, pricing }: SendInvoiceProps) => {
  const services = pricing.services.map(({ description }) => description)

  const { invoiceCode, teamMemberLimit, subTotal, total, dueAt, nextPayDate, createdAt } = invoice

  const templetePros: TempletePros = {
    name: user.name!,
    plan: pricing.name,
    invoiceCode,
    teamMemberLimit,
    subTotal,
    total,
    dueAt,
    createdAt,
    nextPayDate,
    services: services,
    fromEmail
  }

  const html = mailTemplateParse(templetePros)

  const msg: MailDataRequired = {
    to: user.email,
    from: {
      name: 'MozEconomia',
      email: fromEmail
    },
    subject: 'Obrigado Por Escolher MozEconomia',
    html: html
  }
  await sendMail(msg)
}
