import * as fs from 'fs'
import path from 'path'

function randomString (length: number): string {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const getHtmlTemplate =
async (fileName: string): Promise<string> =>
  await new Promise((resolve, reject) => {
    const htmlPath = path.join(__dirname, '..', 'html', fileName)

    fs.readFile(htmlPath, 'utf8', (err, html) => {
      if (err != null) { reject(err) }

      resolve(html)
    })
  })

function stringReplace (base: string, params: {
  [key: string]: any
}): string {
  Object.keys(params).forEach((opt: string) => {
    base = base.replace(new RegExp(`\\{${opt}\\}`, 'g'), params[opt])
  })

  return base
}

export const Utils = {
  randomString,
  getHtmlTemplate,
  stringReplace
}
