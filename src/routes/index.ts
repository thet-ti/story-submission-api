import express from 'express'

import { router as WriterRoutes } from '../controllers/writer.controller'

const Router = express.Router()

Router.use('/writer', WriterRoutes)

export { Router }
