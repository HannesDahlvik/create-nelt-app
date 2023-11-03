import { Generated } from 'kysely'

export type Database = {
    user: UserTable
    key: KeyTable
    session: SessionTable
    post: PostTable
}

type UserTable = {
    id: string
}

type KeyTable = {
    id: string
    user_id: string
    hashed_password: string | null
}

type SessionTable = {
    id: string
    user_id: string
    active_expires: bigint
    idle_expires: bigint
}

type PostTable = {
    id: Generated<number>
    title: string
    body: string | null
    createdAt: Generated<Date>
}
