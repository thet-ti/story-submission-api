import { Prisma, Writer } from '@prisma/client'
import { WriterRepository } from '../repositories/writer.repository'

const create = async (writer: Prisma.WriterCreateInput): Promise<Writer> => {
  const createdWriter = await WriterRepository.create(writer)

  // Send e-mail of confirmation

  return createdWriter
}

const selectByEmail = async (email: string): Promise<Writer | null> => {
  const selectedWriter = await WriterRepository.selectOne({
    where: { email }
  })

  if (selectedWriter == null) {
    throw new Error('user-not-found')
  }

  return selectedWriter
}

export const WriterService = {
  create,
  selectByEmail
}
