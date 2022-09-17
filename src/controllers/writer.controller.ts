
import { Prisma } from '@prisma/client'
import { Request, Response, Router } from 'express'
import { ErrorTypes } from '../@types/error.types'
import { USER_ACTIONS } from '../constants/actions.constant'
import { errorHandler } from '../middlewares/error_handler.middleware'
import { validator } from '../middlewares/validatior_handler.middleware'
import { UserCreateSchema, UserSelectByEmailSchema } from '../schemas/writer.schema'
import { WriterService } from '../services/writer.service'

const router = Router()

router.post('/',
  validator(UserCreateSchema, USER_ACTIONS.create_user),
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const {
        email,
        name
      }: Prisma.WriterCreateInput = request.body

      const createdWriter = await WriterService.create({
        email,
        name
      })

      return response.status(200).json(createdWriter)
    } catch (error) {
      const e = error as ErrorTypes
      return await errorHandler(e, request, response)
    }
  })

router.get('/:email',
  validator(UserSelectByEmailSchema, USER_ACTIONS.select_by_email),
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const email = request.query.email as string

      const selectedWriter = await WriterService.selectByEmail(email)

      return response.status(200).json(selectedWriter)
    } catch (error) {
      const e = error as ErrorTypes
      return await errorHandler(e, request, response)
    }
  })

export { router }
