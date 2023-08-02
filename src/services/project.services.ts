import { QueryConfig, QueryResult } from "pg"
import { client } from "../database"
import { IDeveloper, IProject, TProjectRequest } from "../interfaces"
import { AppError } from "../error"
import utils from "../utils"
import format from "pg-format"

const create = async (payload: TProjectRequest): Promise<IProject> =>{
    const id = payload.developerId
    const queryString: string = `SELECT * FROM developers WHERE id = $1;`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResul: QueryResult<IDeveloper> = await client.query(queryConfig)

    if(queryResul.rowCount === 0) throw new AppError("Developer not found.", 404)
    

    const filteredPayload = utils.validateProjectKeys(payload)


    const queryFormat: string = format(
        `INSERT INTO 
        projects (%I) 
        VALUES 
            (%L)
        RETURNING *;
        `,
        Object.keys(filteredPayload),
        Object.values(filteredPayload)
    )

    const queryResulProject: QueryResult<IProject> = await client.query(queryFormat)

    return queryResulProject.rows[0]
}

export default {
    create
}