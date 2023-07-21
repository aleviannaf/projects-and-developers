import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import { IDeveloper } from "../interfaces"
import { client } from "../database"
import { AppError } from "../error"

const checkIdDeveloper = async (
    request: Request,
    Response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = parseInt(request.params.id)

    const queryString: string = `SELECT * FROM developers WHERE id = $1;`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResul: QueryResult<IDeveloper> = await client.query(queryConfig)

    if(queryResul.rowCount === 0) throw new AppError("Developer not found.", 404)
    
    return next()
}

export  default  checkIdDeveloper