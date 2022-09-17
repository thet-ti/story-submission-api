import { Prisma, Story } from '@prisma/client'
import BusinessError, { BUSINESS_ERROR_MESSAGES } from '../errors/business.error'
import httpStatus from 'http-status'
import { StoryRepository } from '../repositories/story.repository'
import { STORY_ACTIONS } from '../constants/actions.constant'
import { WriterService } from './writer.service'
import { DriveService } from './google_drive.service'

const create = async (
  story: Prisma.StoryUncheckedCreateInput & {
    file: {
      name: string
      mimeType: string
      fileEncoded: BufferEncoding
    }
  }
): Promise<Story> => {
  const userStoriesAlreadyExists = await selectByWriterId(story.writerId)

  // This validation is temporary, one write can have one story

  if (userStoriesAlreadyExists.length > 0) {
    throw new BusinessError(
      BUSINESS_ERROR_MESSAGES.already_exists,
      httpStatus.CONFLICT,
      STORY_ACTIONS.create_story
    )
  }

  const storyData: Prisma.StoryUncheckedCreateInput = {
    title: story.title,
    synopsis: story.synopsis,
    writerId: story.writerId,
    isCompleted: story.isCompleted
  }

  if ((story.file != null)) {
    const {
      fileEncoded,
      mimeType,
      name
    } = story.file

    const file = await DriveService.create({
      fileEncoded,
      mimeType,
      name: `${story.writerId}-${name}`
    })

    storyData.googleDriveId = file.id
  }

  const createdStory = await StoryRepository.create(storyData)

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
