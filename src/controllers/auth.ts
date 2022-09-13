import bcrypt from 'bcrypt'
import { ExpReq, ExpRes } from '@customTypes/express'
import { User } from '@models/User'
import { response200Success, response409NotFound } from '@utils/response'
import { emailTransporter } from '@utils/emailTransporter'

export const postSignup = async (req: ExpReq, res: ExpRes) => {
  const { email, password } = req.body

  const existingUser = await User.fetchByEmail(email)

  if (existingUser) {
    return response409NotFound(res, 'User already signed up.')
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = new User(email, hashedPassword, true)
  user.save()
  response200Success(res, user)
  return emailTransporter.sendMail({
    to: req.body.email,
    from: process.env.FROM_EMAIL_ADDRESS,
    subject: 'Signup done!',
    html: '<h1>You successfully signed up.</h1>',
  })
}
