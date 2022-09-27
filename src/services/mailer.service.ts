import nodemailer from 'nodemailer'
import { getEnv } from '../utils/env'

// const transporter = nodemailer.createTransport({
//   host: getEnv('SMTP_HOST'),
//   port: Number(getEnv('SMTP_PORT')),
//   auth: {
//     user: getEnv('SMTP_USER'),
//     pass: getEnv('SMTP_PASSWORD')
//   }
// })

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'electa.batz15@ethereal.email',
    pass: 'HQ8ZFvwpU5bcV268NB'
  }
})

const send = async (
  to: string,
  subject: string,
  html: string,
  attachments?: any[],
  cc?: string,
  replyTo?: string
): Promise<any> => {
  const sentEmail = await transporter.sendMail({
    from: `"${getEnv('SMTP_ALIAS')}" <${getEnv('SMTP_EMAIL')}>`,
    to,
    cc,
    replyTo,
    subject,
    html,
    attachments
  })

  return sentEmail
}

export const MailerService = {
  send
}
