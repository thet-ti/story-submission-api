import { NextFunction, Request, Response } from 'express'
import ValidationError from '../errors/validation.error'

export const validator = (schema: any, action: string) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: request.body,
        query: request.query,
        params: request.params
      })
      return next()
    } catch (error) {
      const yupError = error as any
      const e = new ValidationError(yupError.message, action)

      const responseData: {
        message: string
        status: number
        action: string
        path: string
      } = {
        message: e.message,
        action: e.action,
        path: yupError.path,
        status: e.status
      }

      return response.status(e.status).json(responseData)
    }
  }
