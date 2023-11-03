import prompts from 'prompts'
import { z } from 'zod'

type Database = 'postgres' | 'mysql' | 'sqlite'
type DatabaseDriver = 'prisma' | 'drizzle' | 'kysely'

interface DatabaseDialect {
    drivers: DatabaseDriver[]
    value: string
}
interface DatabaseDialects {
    database: Database
    dialects: DatabaseDialect[]
}

interface PromptReturn {
    database: Database
    databaseDriver: DatabaseDriver
    databaseDialect: string
}

const availableDatabaseDialects: DatabaseDialects[] = [
    {
        database: 'mysql',
        dialects: [
            {
                drivers: ['drizzle', 'kysely'],
                value: 'mysql2'
            },
            {
                drivers: ['drizzle'],
                value: '@planetscale/database'
            }
        ]
    },
    {
        database: 'postgres',
        dialects: [
            {
                drivers: ['drizzle', 'kysely'],
                value: 'pg'
            },
            {
                drivers: ['drizzle'],
                value: 'postgres'
            }
        ]
    },
    {
        database: 'sqlite',
        dialects: [
            {
                drivers: ['drizzle', 'kysely'],
                value: 'better-sqlite3'
            },
            {
                drivers: ['drizzle'],
                value: '@libsql/client'
            }
        ]
    }
]

const databasePromptSchema = z.object({
    database: z.custom<Database>(),
    databaseDriver: z.custom<DatabaseDriver>()
})

export async function promptDatabase(): Promise<PromptReturn> {
    const res = await prompts([
        {
            type: 'select',
            name: 'databaseDriver',
            message: 'Select database driver',
            choices: [
                { title: 'Prisma', value: 'prisma' },
                { title: 'Drizzle', value: 'drizzle' },
                { title: 'Kysely', value: 'kysely' }
            ]
        },
        {
            type: 'select',
            name: 'database',
            message: 'Select database type',
            choices: [
                { title: 'PostgreSQL', value: 'postgres' },
                { title: 'MySQL', value: 'mysql' },
                { title: 'SQLite', value: 'sqlite' }
            ]
        }
    ])

    const databasePrompt = databasePromptSchema.safeParse(res)
    if (!databasePrompt.success) {
        throw databasePrompt.error
    }

    const { database, databaseDriver } = databasePrompt.data
    const dialectChoices: prompts.Choice[] = []

    availableDatabaseDialects.map((row) => {
        if (row.database === database) {
            row.dialects.map((dialect) => {
                if (dialect.drivers.includes(databaseDriver)) {
                    dialectChoices.push({
                        title: dialect.value,
                        value: dialect.value
                    })
                }
            })
        }
    })

    if (dialectChoices.length > 0) {
        const { databaseDialect } = await prompts({
            type: 'select',
            name: 'databaseDialect',
            message: 'Select database dialect',
            choices: dialectChoices
        })

        return {
            database,
            databaseDriver,
            databaseDialect
        }
    }

    return {
        database,
        databaseDriver,
        databaseDialect: database
    }
}
