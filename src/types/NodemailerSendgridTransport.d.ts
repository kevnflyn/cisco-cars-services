interface NodemailerSendgridTransportArg {
  auth: {
    api_key: string
  }
}

type NodemailerSendgridTransport = (config: NodemailerSendgridTransportArg) => SMTPTransport

declare module 'nodemailer-sendgrid-transport' {
  const value: NodemailerSendgridTransport
  export default value
}
