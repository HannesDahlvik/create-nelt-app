import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const post = sqliteTable('post', {
    id: integer('id').notNull().primaryKey(),
    title: text('title'),
    body: text('body'),
    createdAt: integer('created_at').default(sql`(strftime('%s', 'now'))`)
})
