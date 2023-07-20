import format from "pg-format";
import { IDeveloper, TDevelorRequest } from "../interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const create = async (payload: TDevelorRequest): Promise<IDeveloper> => {

    const queryFormat: string = format(
        `INSERT INTO "developers" (%I) VALUES  (%L) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    )

    const queryResul: QueryResult<IDeveloper> = await client.query(queryFormat)

    return queryResul.rows[0]
}

const retrieve = async (): Promise<any> => {

    const queryTemplate: string = `
    SELECT
        "d"."id" AS "developerID",
        "d"."name" AS "developerName",
        "d"."email" AS "developerEmail",
        "di"."id" AS "developerInfoID",
        "di"."developerSince" AS "developerInfoDeveloperSince",
        "di"."preferredOS" AS "developerInfoPreferredOS"
    FROM 
        "developers" AS "d"
    LEFT JOIN 
        "developer_infos" AS "di"
    ON 
        "di"."id" = "d"."developerInfoId";
  `;

    const queryResul: QueryResult = await client.query(queryTemplate)

    return queryResul.rows
}

const retrieveForId = async (developerId: number): Promise<any> => {

    const queryTemplate: string = `
        SELECT
            "d"."id" AS "developerID",
            "d"."name" AS "developerName",
            "d"."email" AS "developerEmail",
            "di"."id" AS "developerInfoID",
            "di"."developerSince" AS "developerInfoDeveloperSince",
            "di"."preferredOS" AS "developerInfoPreferredOS"
        FROM 
            "developers" AS "d"
        LEFT JOIN 
            "developer_infos" AS "di"
        ON 
            "di"."id" = "d"."developerInfoId"
        WHERE d.id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [ developerId ]
  }

    const queryResul: QueryResult = await client.query(queryConfig)

    return queryResul.rows[0]
}

export default { create, retrieve, retrieveForId }