import { sql } from 'drizzle-orm'
import { mysqlTable, bigint, int, text, varchar, date } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('user', {
    id: varchar('id', {
        length: 15
    }).primaryKey()
})

export const key = mysqlTable('key', {
    id: varchar('id', {
        length: 255
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 15
    })
        .notNull()
        .references(() => user.id),
    hashedPassword: varchar('hashed_password', {
        length: 255
    })
})

export const session = mysqlTable('session', {
    id: varchar('id', {
        length: 128
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 15
    })
        .notNull()
        .references(() => user.id),
    activeExpires: bigint('active_expires', {
        mode: 'number'
    }).notNull(),
    idleExpires: bigint('idle_expires', {
        mode: 'number'
    }).notNull()
})

export const post = mysqlTable('post', {
    id: int('id').notNull().primaryKey(),
    title: text('title'),
    body: text('body'),
    createdAt: date('created_at').default(sql`(strftime('%s', 'now'))`)
})
