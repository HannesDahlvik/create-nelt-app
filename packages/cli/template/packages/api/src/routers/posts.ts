import { procedure, router } from '../trpc'

export const postsRuoter = router({
    all: procedure.query(() => {
        return [
            {
                id: 1,
                title: 'test',
                body: 'Lorem ipsum'
            }
        ]
    })
})
