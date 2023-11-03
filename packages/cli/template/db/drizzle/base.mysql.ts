import { sql } from 'drizzle-orm'
import { mysqlTable, int, text, date } from 'drizzle-orm/mysql-core'

export const post = mysqlTable('post', {
    id: int('id').notNull().primaryKey(),
    title: text('title'),
    body: text('body'),
    createdAt: date('created_at').default(sql`(strftime('%s', 'now'))`)
})
