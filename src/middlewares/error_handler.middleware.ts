import { Request, Response } from 'express'
import { ErrorTypes } from '../@types/error.types'

export const errorHandler = async (
  error: ErrorTypes,
  request: Request,
  response: Response
): Promise<Response> => {
  const responseData: {
    message: string
    status: number
    action: string
  } = {
    message: error.message,
    action: error.action,
    status: error.status
  }
  return response.status(error.status).json(responseData)
}
