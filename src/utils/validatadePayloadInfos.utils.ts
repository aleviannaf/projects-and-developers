import { AppError } from "../error"
import { TInfosRequest, TInfosRequiredKeyes } from "../interfaces"

const validatePayloadInfos = (payload: any): Partial<TInfosRequest> => {
    const filteredPayload: Partial<TInfosRequest> = {}
    const validKeys: Array<TInfosRequiredKeyes> = ["developerSince" , "preferredOS"]

    for (const key of validKeys) {
        if (key in payload) {
            filteredPayload[key] = payload[key]
        }
    }

    const missingKeys = validKeys.filter(key => !filteredPayload.hasOwnProperty(key))
    if (missingKeys.length > 0) {
        throw new AppError(`Missing required keys:  ${missingKeys.join(', ')}`, 404)
    }

    return filteredPayload;
}

export default validatePayloadInfos