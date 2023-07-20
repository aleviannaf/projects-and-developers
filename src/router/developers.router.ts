import { Router } from "express";
import { developersControllers } from "../controllers";

const developersRouter: Router = Router()

developersRouter.post("", developersControllers.create)
developersRouter.get("", developersControllers.retrieve)
developersRouter.get("/:id", developersControllers.retrieveForId)

export default developersRouter