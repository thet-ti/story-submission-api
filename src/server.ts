import express from 'express'
import { Router } from './routes'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { getEnv } from './utils/env'
import cors from 'cors'

const app = express()

// Logger middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// Security options for HTTP
app.use(helmet())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

app.use(cors())

app.use('/api', Router)

app.listen(getEnv('PORT', 3000), () => { console.log('[START] On port 3000') })
