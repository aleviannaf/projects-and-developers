import format from "pg-format";
import { IDeveloper, Infos, TDeveloperRequiredKeyes, TDeveloperUpdate, TDevelorRequest, TInfosRequest, TInfosUpdate } from "../interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import utils from "../utils";
import { AppError } from "../error";

const create = async (payload: TDevelorRequest): Promise<IDeveloper> => {

    const filteredPayload = utils.validatePayloadDeveloper(payload)

    const queryFormat: string = format(
        `INSERT INTO "developers" (%I) VALUES  (%L) RETURNING *;`,
        Object.keys(filteredPayload),
        Object.values(filteredPayload)
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
        values: [developerId]
    }

    const queryResul: QueryResult = await client.query(queryConfig)

    return queryResul.rows[0]
}

const createInfos = async (payload: TInfosRequest, developerId: number): Promise<Infos> => {


    const filteredPayload = utils.validatePayloadInfos(payload)
  


    const checkExistInfo: QueryResult = await client.query(
        `SELECT "developerInfoId" FROM "developers" WHERE id = $1;`,
        [developerId]
    )

    if (checkExistInfo.rows[0].developerInfoId != null) {
        throw new AppError("Developer alredy has infos", 409)
    }


    const queryString: string = format(
        `INSERT INTO 
            "developer_infos" (%I) 
        VALUES 
            (%L)
        RETURNING *;
        `,
        Object.keys(filteredPayload),
        Object.values(filteredPayload)
    )

    const queryResultInfo: QueryResult<Infos> = await client.query(queryString)


    await client.query(
        `UPDATE developers set("developerInfoId") = ROW($1)  WHERE id = $2;`,
        [queryResultInfo.rows[0].id, developerId]
    )

    return queryResultInfo.rows[0]
}

const updateDeveloper = async (payload: TDeveloperUpdate, developerId: number): Promise<IDeveloper> => {
    const filteredPayload = utils.validateDeveloperUpdate(payload)

    const queryString: string = format(
        `UPDATE developers set(%I) = ROW(%L)  WHERE id = $1 RETURNING *;`,
        Object.keys(filteredPayload),
        Object.values(filteredPayload)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [developerId]
    }

    const queryResult: QueryResult<IDeveloper> = await client.query(queryConfig)

    return queryResult.rows[0]
}


const updateInfo = async (payload: TInfosUpdate, infoId: number): Promise<Infos> => {
    const filteredPayload = utils.validateInfoUpdate(payload)

    const checkExistInfo: QueryResult = await client.query(
        `SELECT "developerInfoId" FROM "developers" WHERE id = $1;`,
        [infoId]
    )

    const queryString: string = format(
        `UPDATE "developer_infos" set(%I) = ROW(%L)  WHERE id = $1 RETURNING *;`,
        Object.keys(filteredPayload),
        Object.values(filteredPayload)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [checkExistInfo.rows[0].developerInfoId]
    }

    const queryResult: QueryResult<Infos> = await client.query(queryConfig)

    return queryResult.rows[0]
}

const deleteDeloper = async (developerId: string): Promise<void> =>{
    
    const querySrting: string = `
        DELETE FROM developers WHERE id = $1;
    `
    const queryConfig: QueryConfig = {
        text: querySrting,
        values: [developerId]
    }

    await client.query(queryConfig)
}

export default { 
    create, 
    retrieve, 
    retrieveForId, 
    createInfos, 
    updateDeveloper, 
    updateInfo, 
    deleteDeloper 
}