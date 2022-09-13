import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

export const emailTransporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY || ''
    }
  })
)
