import { Router } from "express";
import { developersControllers } from "../controllers";

const developersRouter: Router = Router()

developersRouter.post("", developersControllers.create)

export default developersRouter