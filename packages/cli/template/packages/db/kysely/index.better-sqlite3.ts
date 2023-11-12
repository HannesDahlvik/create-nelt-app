import { Kysely, SqliteDialect } from 'kysely'
import * as SQLite from 'better-sqlite3'
import { Database } from './schema'

const dialect = new SqliteDialect({
    database: new SQLite(':memory:')
})
export const db = new Kysely<Database>({
    dialect
})
