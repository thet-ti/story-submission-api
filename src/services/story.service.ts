import { Prisma, Story } from '@prisma/client'
import BusinessError, { BUSINESS_ERROR_MESSAGES } from '../errors/business.error'
import httpStatus from 'http-status'
import { StoryRepository } from '../repositories/story.repository'
import { STORY_ACTIONS } from '../constants/actions.constant'
import { WriterService } from './writer.service'
import { DriveService } from './google_drive.service'
import { MailerService } from './mailer.service'
import { Utils } from '../utils/utils'
import { getEnv } from '../utils/env'

const create = async (
  story: Omit<Prisma.StoryUncheckedCreateInput & {
    file: {
      name: string
      mimeType: string
      fileEncoded: BufferEncoding
    }
  }, 'storyProtocol'>
): Promise<Story> => {
  const foundWriter = await WriterService.selectById(story.writerId)

  if (foundWriter == null) {
    throw new BusinessError(
      BUSINESS_ERROR_MESSAGES.not_found,
      httpStatus.NOT_FOUND,
      STORY_ACTIONS.create_story
    )
  }

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
    isCompleted: story.isCompleted,
    storyProtocol: Utils.randomString(12)
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

  const StoryWasBeenSentHtml = await Utils
    .getHtmlTemplate('story_was_been_sent.html')

  const replacedHtml = Utils.stringReplace(StoryWasBeenSentHtml, {
    storyProtocol: createdStory.storyProtocol,
    websiteUrl: getEnv('WEBSITE_URL')
  })

  await MailerService
    .send(
      foundWriter.email,
      'Envio de historia',
      replacedHtml
    )

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
