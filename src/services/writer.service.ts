import { Prisma, Writer } from '@prisma/client'
import httpStatus from 'http-status'
import { WRITER_ACTIONS } from '../constants/actions.constant'
import BusinessError, { BUSINESS_ERROR_MESSAGES } from '../errors/business.error'
import { WriterRepository } from '../repositories/writer.repository'

const create = async (writer: Prisma.WriterCreateInput): Promise<Writer> => {
  const writerAlreadyExists = await selectByEmail(writer.email, true)

  if (writerAlreadyExists != null) {
    throw new BusinessError(
      BUSINESS_ERROR_MESSAGES.already_exists,
      httpStatus.CONFLICT,
      WRITER_ACTIONS.create_writer
    )
  }

  const createdWriter = await WriterRepository.create(writer)

  // Send e-mail of confirmation and create in local data-base

  return createdWriter
}

const selectByEmail = async (email: string, ignoreError = false): Promise<Writer | null> => {
  const selectedWriter = await WriterRepository.selectOne({
    where: { email },
    include: {
      stories: true,
      confirmEmail: true
    }
  })

  if (selectedWriter == null && !ignoreError) {
    throw new BusinessError(
      BUSINESS_ERROR_MESSAGES.not_found,
      httpStatus.NOT_FOUND,
      WRITER_ACTIONS.select_by_email
    )
  }

  return selectedWriter
}

const selectById = async (writerId: string): Promise<Writer | null> => {
  const selectedWriter = await WriterRepository.selectOne({
    where: { id: writerId }
  })

  if (selectedWriter == null) {
    throw new BusinessError(
      BUSINESS_ERROR_MESSAGES.not_found,
      httpStatus.NOT_FOUND,
      WRITER_ACTIONS.select_writer_by_id
    )
  }

  return selectedWriter
}

export const WriterService = {
  create,
  selectByEmail,
  selectById
}
