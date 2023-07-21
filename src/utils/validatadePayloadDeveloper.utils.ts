import { AppError } from "../error"
import { TDeveloperRequiredKeyes, TDevelorRequest } from "../interfaces"

const validatePayloadDeveloper = (payload: TDevelorRequest): Partial<TDevelorRequest> => {
    const filteredPayload: Partial<TDevelorRequest> = {}
    const validKeys: Array<TDeveloperRequiredKeyes> = ['name', 'email']

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

export default validatePayloadDeveloper