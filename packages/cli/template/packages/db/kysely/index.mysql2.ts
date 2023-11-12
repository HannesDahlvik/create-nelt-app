import { Kysely, MysqlDialect } from 'kysely'
import { createPool } from 'mysql2'
import { Database } from './schema'

const dialect = new MysqlDialect({
    pool: createPool({
        database: 'test',
        host: 'localhost',
        user: 'admin',
        password: '123',
        port: 3308,
        connectionLimit: 10
    })
})
export const db = new Kysely<Database>({
    dialect
})
