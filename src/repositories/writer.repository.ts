import { Prisma, Writer } from '@prisma/client'
import { prisma } from '../services/prisma.service'

const create = async (writerData: Prisma.WriterCreateInput): Promise<Writer> => {
  const createdWriter = await prisma.writer.create({
    data: writerData
  })

  return createdWriter
}

const selectOne = async (options: Prisma.WriterFindFirstArgs): Promise<Writer | null> => {
  const selectedWriter = await prisma.writer.findFirst(options)

  return selectedWriter
}

const selectAll = async (options: Prisma.WriterFindManyArgs): Promise<Writer[]> => {
  const selectedWriters = await prisma.writer.findMany(options)

  return selectedWriters
}

export const WriterRepository = {
  create,
  selectOne,
  selectAll
}
