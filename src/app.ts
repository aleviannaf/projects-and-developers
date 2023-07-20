import 'express-async-errors'
import express, { Application, json } from "express"
import developersRouter from "./router/developers.router"
import { handleError } from './middlewares/handleErrors.middlewares'

const app: Application = express()

app.use(json())
app.use("/developers", developersRouter)

app.use(handleError)

export default app