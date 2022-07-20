import express from 'express'
import {Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import {todos} from './routers'
import {PORT, mongoDB} from './settings'

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use('/todos', todos)
app.use(error)

mongoose.connect(mongoDB).finally()

app.listen(PORT, () => console.log('listening on port ', PORT))

function error(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500)
  res.send('Internal Server Error')
}