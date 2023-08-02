import { AppError } from "../error"
import { TProjectRequest, TProjectRequiredKeyes } from "../interfaces"


const validateProjectKeys = (payload: any): Partial<TProjectRequest> => {
    let filteredPayload: Partial<TProjectRequest> = {}
    const validAllKeys: Array<TProjectRequiredKeyes> = [
        "name",
        "description",
        "estimatedTime",
        "repository",
        "endDate",
        "startDate",
        "developerId"
    ]
    const validKeys: Array<TProjectRequiredKeyes> = [
        "name",
        "description",
        "estimatedTime",
        "repository",
        "startDate",
        "developerId"
    ]

    for (const key of validAllKeys) {
        if (key in payload) {
            filteredPayload[key] = payload[key]
        }
    }

    if (Object.keys(filteredPayload).length === 0) {
        throw new AppError(`At least one of those keys must be send.`, 404)
    }

    const missingKeys = validKeys.filter(key => !filteredPayload.hasOwnProperty(key))
    if (missingKeys.length > 0) {
        throw new AppError(`Missing required keys:  ${missingKeys.join(', ')}`, 404)
    }

    return filteredPayload;
}

export default validateProjectKeys