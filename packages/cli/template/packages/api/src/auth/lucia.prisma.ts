import { cache } from 'react'

import { cookies } from 'next/headers'

import { db } from '@acme/db'

import { adapter } from '@lucia-auth/adapter-prisma'
import { lucia } from 'lucia'
import { nextjs } from 'lucia/middleware'

export const auth = lucia({
    env: process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
    middleware: nextjs(),
    adapter: adapter(db),
    sessionCookie: {
        expires: false
    }
})

export type Auth = typeof auth

export const getServerSession = cache(() => {
    const authRequest = auth.handleRequest({
        request: null,
        cookies
    })
    return authRequest.validate()
})
