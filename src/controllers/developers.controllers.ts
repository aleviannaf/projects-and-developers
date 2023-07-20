import { Request, Response } from "express"
import { IDeveloper } from "../interfaces"
import { developersServices } from "../services"

const create = async (
    request: Request,
    response: Response
): Promise<Response> => {
    
    const newDeveloper: IDeveloper = await developersServices.create(request.body)

    return response.status(201).json(newDeveloper)
}

export default { create}