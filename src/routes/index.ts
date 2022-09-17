import express from 'express'

import { router as WriterRoutes } from '../controllers/writer.controller'
import { router as StoryRoutes } from '../controllers/story.controller'

const Router = express.Router()

Router.use('/writer', WriterRoutes)
Router.use('/story', StoryRoutes)

export { Router }
