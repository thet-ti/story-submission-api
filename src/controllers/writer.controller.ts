
import { Prisma } from '@prisma/client'
import { Request, Response, Router } from 'express'
import { WriterService } from '../services/writer.service'

const router = Router()

router.post('/',
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
      // error handling adn return
      return response.sendStatus(400)
    }
  })

router.get('/:email',
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const email = request.query.email as string

      const selectedWriter = await WriterService.selectByEmail(email)

      return response.status(200).json(selectedWriter)
    } catch (error) {
      // error handling adn return
      return response.sendStatus(400)
    }
  })

export { router }
