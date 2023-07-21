import { Request, Response } from "express"
import { IDeveloper } from "../interfaces"
import { developersServices } from "../services"

const create = async (request: Request, response: Response): Promise<Response> => {

    const newDeveloper: IDeveloper = await developersServices.create(request.body)

    return response.status(201).json(newDeveloper)
}

const retrieve = async (request: Request, response: Response): Promise<Response> => {
    
    const listData = await developersServices.retrieve()

    return response.status(200).json(listData)
}

const retrieveForId = async (request: Request, response: Response): Promise<Response> => {
    
    const developerId: number = parseInt(request.params.id)
    const data = await developersServices.retrieveForId(developerId)

    return response.status(200).json(data)
}

const createInfos = async (request: Request, response: Response): Promise<Response> => {
    
    const id: number = parseInt(request.params.id)
    const infos = await developersServices.createInfos(request.body, id)

    return response.status(201).json(infos)
}


export default { create, retrieve, retrieveForId, createInfos }