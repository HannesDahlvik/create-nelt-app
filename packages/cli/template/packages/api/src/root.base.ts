import { postsRuoter } from './routers/posts'
import { router } from './trpc'

export const appRouter = router({
    posts: postsRuoter
})

export type AppRouter = typeof appRouter
