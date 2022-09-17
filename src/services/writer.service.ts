import { Prisma, Writer } from '@prisma/client'
import httpStatus from 'http-status'
import { USER_ACTIONS } from '../constants/actions.constant'
import BusinessError, { BUSINESS_ERROR_MESSAGES } from '../errors/business.error'
import { WriterRepository } from '../repositories/writer.repository'

const create = async (writer: Prisma.WriterCreateInput): Promise<Writer> => {
  const userAlreadyExists = await selectByEmail(writer.email)

  console.log('USER ALREADY EXISTS', userAlreadyExists)

  if (userAlreadyExists != null) {
    throw new BusinessError(
      BUSINESS_ERROR_MESSAGES.already_exists,
      httpStatus.CONFLICT,
      USER_ACTIONS.create_user
    )
  }

  const createdWriter = await WriterRepository.create(writer)

  // Send e-mail of confirmation

  return createdWriter
}

const selectByEmail = async (email: string): Promise<Writer | null> => {
  const selectedWriter = await WriterRepository.selectOne({
    where: { email }
  })

  if (selectedWriter == null) {
    throw new BusinessError(
      BUSINESS_ERROR_MESSAGES.not_found,
      httpStatus.NOT_FOUND,
      USER_ACTIONS.select_by_email
    )
  }

  return selectedWriter
}

export const WriterService = {
  create,
  selectByEmail
}
