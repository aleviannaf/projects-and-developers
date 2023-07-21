import { Router } from "express";
import { developersControllers } from "../controllers";

const developersRouter: Router = Router()

developersRouter.post("", developersControllers.create)
developersRouter.get("", developersControllers.retrieve)
developersRouter.get("/:id", developersControllers.retrieveForId)
developersRouter.post("/:id/infos", developersControllers.createInfos)

export default developersRouter