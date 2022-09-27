import { drive_v3, google } from 'googleapis'
import stream from 'stream'
import { getEnv } from '../utils/env'

const FOLDER_ID = getEnv('FOLDER_ID')

const googleAuth = new google.auth.GoogleAuth({
  keyFile: './google_drive_key.json',
  scopes: ['https://www.googleapis.com/auth/drive']
})

const googleDriveService = google.drive({
  version: 'v3',
  auth: googleAuth
})

interface IFileData {
  name: string
  mimeType: string
  fileEncoded: BufferEncoding
}

const create = async (file: IFileData): Promise<drive_v3.Schema$File> => {
  const bufferStream = new stream.PassThrough()
  const bufferBase64 = Buffer.from(file.fileEncoded, 'base64')
  bufferStream.end(bufferBase64)
  const { data } = await googleDriveService.files.create({
    media: {
      mimeType: file.mimeType,
      body: bufferStream
    },
    requestBody: {
      name: file.name,
      parents: [FOLDER_ID],
      mimeType: file.mimeType
    },
    fields: 'id, name'
  })

  return data
}

const findById = async (fileId: string): Promise<drive_v3.Schema$File> => {
  const { data } = await googleDriveService.files.get({
    fileId
  })

  return data
}

export const DriveService = {
  create,
  findById
}
