import { Router } from "express";
import { developersControllers } from "../controllers";
import middlewares from "../middlewares";

const developersRouter: Router = Router()

developersRouter.post("", middlewares.uniqueEmail, developersControllers.create)
developersRouter.get("", developersControllers.retrieve)
developersRouter.get("/:id", middlewares.checkIdDeveloper, developersControllers.retrieveForId)
developersRouter.post("/:id/infos", middlewares.checkIdDeveloper, developersControllers.createInfos)

developersRouter.patch(
    "/:id", 
    middlewares.checkIdDeveloper, 
    middlewares.uniqueEmail, 
    developersControllers.updateDeveloper
)

developersRouter.patch(
    "/:id/infos", 
    middlewares.checkIdDeveloper,
    developersControllers.updateInfo
)

export default developersRouter