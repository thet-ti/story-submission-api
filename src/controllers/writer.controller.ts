
import { Prisma } from '@prisma/client'
import express, { Request, Response } from 'express'
import { ErrorTypes } from '../@types/error.types'
import { WRITER_ACTIONS } from '../constants/actions.constant'
import { errorHandler } from '../middlewares/error_handler.middleware'
import { validator } from '../middlewares/validatior_handler.middleware'
import { WriterCreateSchema, WriterSelectByEmailSchema } from '../schemas/writer.schema'
import { WriterService } from '../services/writer.service'

const router = express.Router()

router.post('/',
  validator(WriterCreateSchema, WRITER_ACTIONS.create_writer),
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
  validator(WriterSelectByEmailSchema, WRITER_ACTIONS.select_by_email),
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const selectedWriter = await WriterService.selectByEmail(request.params.email)

      return response.status(200).json(selectedWriter)
    } catch (error) {
      const e = error as ErrorTypes
      return await errorHandler(e, request, response)
    }
  })

export { router }
