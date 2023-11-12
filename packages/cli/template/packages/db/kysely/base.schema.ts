import { Generated } from 'kysely'

export type Database = {
    post: PostTable
}

type PostTable = {
    id: Generated<number>
    title: string
    body: string | null
    createdAt: Generated<Date>
}
