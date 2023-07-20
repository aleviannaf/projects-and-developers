import format from "pg-format";
import { IDeveloper, TDevelorRequest } from "../interfaces";
import { QueryResult } from "pg";
import { client } from "../database";

const create = async (
    payload: TDevelorRequest
): Promise<IDeveloper> => {

    const queryFormat: string = format(
        `INSERT INTO "developers" (%I) VALUES  (%L) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    )

    const queryResul: QueryResult<IDeveloper> = await client.query(queryFormat)

    return queryResul.rows[0]
}

export default { create }