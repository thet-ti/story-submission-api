import { Prisma, Story } from '@prisma/client'
import BusinessError, { BUSINESS_ERROR_MESSAGES } from '../errors/business.error'
import httpStatus from 'http-status'
import { StoryRepository } from '../repositories/story.repository'
import { STORY_ACTIONS } from '../constants/actions.constant'
import { WriterService } from './writer.service'

const create = async (story: Prisma.StoryUncheckedCreateInput): Promise<Story> => {
  const userStoriesAlreadyExists = await selectByWriterId(story.writerId)

  // This validation is temporary, one write can have one story

  if (userStoriesAlreadyExists.length > 0) {
    throw new BusinessError(
      BUSINESS_ERROR_MESSAGES.already_exists,
      httpStatus.CONFLICT,
      STORY_ACTIONS.create_story
    )
  }

  // Upload story infos

  const createdStory = await StoryRepository.create(story)

  return createdStory
}

const selectByWriterId = async (writerId: string): Promise<Story[]> => {
  await WriterService.selectById(writerId)

  const selectedStory = await StoryRepository.selectAll({
    where: {
      writerId
    }
  })

  return selectedStory
}

export const StoryService = {
  create,
  selectByWriterId
}
