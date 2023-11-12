import { sql } from 'drizzle-orm'
import { sqliteTable, text, blob, integer } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
    id: text('id').primaryKey()
})

export const session = sqliteTable('session', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    activeExpires: blob('active_expires', {
        mode: 'bigint'
    }).notNull(),
    idleExpires: blob('idle_expires', {
        mode: 'bigint'
    }).notNull()
})

export const key = sqliteTable('key', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    hashedPassword: text('hashed_password')
})

export const post = sqliteTable('post', {
    id: integer('id').notNull().primaryKey(),
    title: text('title'),
    body: text('body'),
    createdAt: integer('created_at').default(sql`(strftime('%s', 'now'))`)
})
