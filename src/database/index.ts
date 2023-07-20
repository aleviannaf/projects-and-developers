import { Client } from "pg";

const client: Client = new Client({
    user: 'aleviannaf',
    host: 'localhost',
    port: 5432,
    password: '2406',
    database: 'entrega'
})

const startDatabase = async ():Promise<void> =>{
    await client.connect()
    console.log("Database connected")
}

export { client, startDatabase}