import cors from 'cors'
import express, { type NextFunction, type Request, type Response } from 'express'
import { wordCloudRouter } from './word-cloud/routes'

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/word-cloud', wordCloudRouter)

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error)

  res.status(500).json({
    message: error.message || 'Internal server error',
  })
})