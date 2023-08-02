import { Router } from "express";
import { projectsControlers } from "../controllers";

const projectRouter: Router = Router()

projectRouter.post("", projectsControlers.create)

export default projectRouter