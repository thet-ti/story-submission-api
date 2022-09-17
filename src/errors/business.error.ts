import httpStatus from 'http-status'

export default class BusinessError extends Error {
  status: number
  action: string
  constructor (message: string, status: number, action: string) {
    super()
    this.message = message
    this.status = status
    this.action = action
    this.stack = (new Error()).stack
  }
}

export const BUSINESS_ERROR_MESSAGES: { [key: string]: string } = {
  not_found: httpStatus['404_MESSAGE'],
  already_exists: httpStatus['409_MESSAGE']
}
