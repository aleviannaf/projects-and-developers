import { Request, Response } from "express"
import { IProject } from "../interfaces"
import { projectServices } from "../services"

const create = async (request: Request, response: Response): Promise<Response> => {
     const newProject: IProject = await projectServices.create(request.body) 

     return response.status(201).json(newProject)
}

export default {
    create
}