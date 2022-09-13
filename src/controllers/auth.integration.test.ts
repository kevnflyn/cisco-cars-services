import request from 'supertest'
import { app } from '../app'
import { User } from '@models/User'

describe('controllers/auth', function () {
  describe('Sign up', function () {
    afterAll(() => {
      User.deleteByEmail('test@gmail.com')
    })

    it('should respond to 400 response / bad request because email is invalid', async function () {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test',
          password: '72hHjS,4',
        })
      expect(response.statusCode).toBe(400)
    })

    it('should respond to 400 response / bad request because password is invalid', async function () {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@gmail.com',
          password: '72hHjS,',
        })
      expect(response.statusCode).toBe(400)
    })

    it('should respond to 200 response / user created', async function () {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@gmail.com',
          password: '72hHjS,4',
        })
      expect(response.statusCode).toBe(200)
    })

    it('should respond to 409 response / duplicate user', async function () {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@gmail.com',
          password: '72hHjS,4',
        })
      expect(response.statusCode).toBe(409)
    })
  })
})
