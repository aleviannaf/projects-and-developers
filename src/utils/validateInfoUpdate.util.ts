import utils from "."
import { AppError } from "../error"
import {  TInfosRequest, TInfosRequiredKeyes, TInfosUpdate } from "../interfaces"

const validateInfoUpdate = (payload: any): Partial<TInfosRequest> => {
    const filteredPayload: Partial<TInfosRequest> = {}
    const validKeys: Array<TInfosRequiredKeyes> = [ 'developerSince' , 'preferredOS']


    for (const key of validKeys) {
        if (key in payload) {
            filteredPayload[key] = payload[key]
        }
    }
    if (Object.keys(filteredPayload).length === 0) {
        throw new AppError(`At least one of those keys must be send.`, 404)
    }

    return filteredPayload;
}

export default validateInfoUpdate 