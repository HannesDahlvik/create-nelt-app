import fs from 'fs-extra'
import path from 'node:path'
import { PKG_ROOT } from '../consts'
import { DatabaseDriver } from '../prompts'
import { PackageManager, addPackageDependency, createPackageJson } from '../utils'

interface InstallApiProps {
    appName: string
    databaseDriver: DatabaseDriver
    packageManager: PackageManager
    projectPackagesDir: string
    usingAuth: boolean
}

export async function installApi({
    appName,
    databaseDriver,
    packageManager,
    projectPackagesDir,
    usingAuth
}: InstallApiProps) {
    const templateApiDir = path.join(PKG_ROOT, 'template/packages/api')
    const projectApiDir = path.join(projectPackagesDir, 'api')

    fs.ensureDirSync(projectApiDir)
    fs.ensureDirSync(path.join(projectApiDir, 'src'))
    fs.ensureDirSync(path.join(projectApiDir, 'src/routers'))

    let indexFile = 'index.base.ts'
    let srcRootFile = 'root.base.ts'
    let srcTrpcFile = 'trpc.base.ts'

    if (usingAuth) {
        indexFile = 'index.auth.ts'
        srcRootFile = 'root.auth.ts'
        srcTrpcFile = 'trpc.auth.ts'

        fs.ensureDirSync(path.join(projectApiDir, 'src/auth'))

        fs.copyFileSync(
            path.join(templateApiDir, 'src/routers/auth.ts'),
            path.join(projectApiDir, 'src/routers/auth.ts')
        )
        fs.copyFileSync(
            path.join(templateApiDir, `src/auth/lucia.${databaseDriver}.ts`),
            path.join(projectApiDir, 'src/auth/lucia.ts')
        )
    }

    fs.copyFileSync(
        path.join(templateApiDir, 'src', indexFile),
        path.join(projectApiDir, 'src/index.ts')
    )
    fs.copyFileSync(
        path.join(templateApiDir, 'src/context.ts'),
        path.join(projectApiDir, 'src/context.ts')
    )
    fs.copyFileSync(
        path.join(templateApiDir, 'src', srcRootFile),
        path.join(projectApiDir, 'src/root.ts')
    )
    fs.copyFileSync(
        path.join(templateApiDir, 'src', srcTrpcFile),
        path.join(projectApiDir, 'src/trpc.ts')
    )

    fs.copyFileSync(
        path.join(templateApiDir, 'src/routers/posts.ts'),
        path.join(projectApiDir, 'src/routers/posts.ts')
    )

    createPackageJson({
        dest: path.join(projectApiDir),
        name: `@${appName}/api`,
        other: {
            main: './src/index.ts',
            types: './src/index.ts'
        }
    })

    await addPackageDependency({
        dependencies: [
            usingAuth ? 'lucia' : '',
            `@${appName}/db`,
            '@trpc/server',
            '@trpc/client',
            'next',
            'react',
            'superjson',
            'zod'
        ],
        dev: false,
        dir: projectApiDir,
        packageManager
    })
    await addPackageDependency({
        dependencies: ['@types/node', '@types/react', 'typescript'],
        dev: true,
        dir: projectApiDir,
        packageManager
    })
}
