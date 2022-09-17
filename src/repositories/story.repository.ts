import { Prisma, Story } from '@prisma/client'
import { prisma } from '../services/prisma.service'

const create = async (storyData: Prisma.StoryUncheckedCreateInput): Promise<Story> => {
  const createdStory = await prisma.story.create({
    data: storyData
  })

  return createdStory
}

const selectOne = async (options: Prisma.StoryFindFirstArgs): Promise<Story | null> => {
  const selectedStory = await prisma.story.findFirst(options)

  return selectedStory
}

const selectAll = async (options: Prisma.StoryFindManyArgs): Promise<Story[]> => {
  const selectedStories = await prisma.story.findMany(options)

  return selectedStories
}

export const StoryRepository = {
  create,
  selectOne,
  selectAll
}
