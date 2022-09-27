
import { Prisma } from '@prisma/client'
import express, { Request, Response } from 'express'
import { ErrorTypes } from '../@types/error.types'
import { STORY_ACTIONS } from '../constants/actions.constant'
import { errorHandler } from '../middlewares/error_handler.middleware'
import { validator } from '../middlewares/validatior_handler.middleware'
import { StoryCreateSchema } from '../schemas/story.schema'
import { StoryService } from '../services/story.service'

const router = express.Router()

router.post('/',
  validator(StoryCreateSchema, STORY_ACTIONS.create_story),
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const {
        title,
        synopsis,
        writerId,
        isCompleted,
        file
      }: Omit<Prisma.StoryUncheckedCreateInput & {
        file: {
          name: string
          mimeType: string
          fileEncoded: BufferEncoding
        }
      }, 'storyProtocol'> = request.body

      const createdStory = await StoryService.create({
        title,
        synopsis,
        writerId,
        isCompleted,
        file
      })

      return response.status(200).json(createdStory)
    } catch (error) {
      const e = error as ErrorTypes
      return await errorHandler(e, request, response)
    }
  })

export { router }
