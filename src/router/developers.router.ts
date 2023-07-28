import { Router } from "express";
import { developersControllers } from "../controllers";
import middlewares from "../middlewares";

const developersRouter: Router = Router()

developersRouter.post("", middlewares.uniqueEmail, developersControllers.create)
developersRouter.post("/:id/infos", middlewares.checkIdDeveloper, developersControllers.createInfos)

developersRouter.get("", developersControllers.retrieve)
developersRouter.get("/:id", middlewares.checkIdDeveloper, developersControllers.retrieveForId)

developersRouter.delete("/:id", middlewares.checkIdDeveloper, developersControllers.deleteDeveloper )

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