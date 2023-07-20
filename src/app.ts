import 'express-async-errors'
import express, { Application, json } from "express"
import developersRouter from "./router/developers.router"
import middlewares from './middlewares'


const app: Application = express()

app.use(json())
app.use("/developers", developersRouter)

app.use(middlewares.handleError)

export default app