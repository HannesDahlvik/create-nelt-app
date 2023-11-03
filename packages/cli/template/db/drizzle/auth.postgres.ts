import { sql } from 'drizzle-orm'
import { bigint, date, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
    id: varchar('id', {
        length: 15
    }).primaryKey()
})

export const session = pgTable('session', {
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

export const key = pgTable('key', {
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

export const post = pgTable('post', {
    id: integer('id').notNull().primaryKey(),
    title: text('title'),
    body: text('body'),
    createdAt: date('created_at').default(sql`(strftime('%s', 'now'))`)
})
