import { sql } from 'drizzle-orm'
import { date, integer, pgTable, text } from 'drizzle-orm/pg-core'

export const post = pgTable('post', {
    id: integer('id').notNull().primaryKey(),
    title: text('title'),
    body: text('body'),
    createdAt: date('created_at').default(sql`(strftime('%s', 'now'))`)
})
