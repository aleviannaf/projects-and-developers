import { NextFunction, Request, Response } from "express"
import { QueryConfig, QueryResult } from "pg"
import { IDeveloper } from "../interfaces"
import { client } from "../database"
import { AppError } from "../error"

const uniqueEmail = async (
    request: Request,
    Response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const email: string = request.body.email

    const queryString: string = `SELECT * FROM developers WHERE email = $1;`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    }

    const queryResul: QueryResult<IDeveloper> = await client.query(queryConfig)

    if(queryResul.rowCount != 0) throw new AppError("Email already exists", 409)
    
    return next()
}

export  default  uniqueEmail