import { AppRouter } from './root'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

export { createContext } from './context'
export { appRouter, type AppRouter } from './root'

export type RouterInputs = inferRouterInputs<AppRouter>

export type RouterOutputs = inferRouterOutputs<AppRouter>
