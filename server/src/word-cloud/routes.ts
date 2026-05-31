import { Router } from 'express'
import { getWordCloud } from './service'

export const wordCloudRouter = Router()

wordCloudRouter.get('/', async (_req, res, next) => {
  try {
    const data = await getWordCloud()

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})