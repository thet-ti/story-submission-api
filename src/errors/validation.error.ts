import httpStatus from 'http-status'

export default class ValidationError extends Error {
  status: number
  action: string
  path?: string
  constructor (message: string, action: string, path?: string) {
    super()
    this.message = message
    this.status = httpStatus.BAD_REQUEST
    this.path = path
    this.action = action
    this.stack = (new Error()).stack
  }
}
