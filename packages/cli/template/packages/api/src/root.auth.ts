import { authRouter } from './routers/auth'
import { postsRuoter } from './routers/posts'
import { router } from './trpc'

export const appRouter = router({
    auth: authRouter,
    posts: postsRuoter
})

export type AppRouter = typeof appRouter
