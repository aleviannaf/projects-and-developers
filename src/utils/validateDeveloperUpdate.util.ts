import { AppError } from "../error"
import { TDeveloperRequiredKeyes, TDeveloperUpdate, TDevelorRequest } from "../interfaces"

const validateDeveloperUpdate = (payload: TDeveloperUpdate): Partial<TDevelorRequest> => {
    const filteredPayload: Partial<TDevelorRequest> = {}
    const validKeys: Array<TDeveloperRequiredKeyes> = ['name', 'email']

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

export default validateDeveloperUpdate 