import { AppRouter } from './root'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

export { createContext } from './context'
export { appRouter, type AppRouter } from './root'
export { type Auth, auth, getServerSession } from './auth/lucia'
export { type Session, type User } from 'lucia'

export type RouterInputs = inferRouterInputs<AppRouter>

export type RouterOutputs = inferRouterOutputs<AppRouter>
