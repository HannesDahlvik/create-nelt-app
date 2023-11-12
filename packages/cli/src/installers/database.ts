import fs from 'fs-extra'
import path from 'node:path'
import { PKG_ROOT } from '../consts'
import { ProjectConfig } from '../helpers/createProject'
import { PackageManager, addPackageDependency } from '../utils'

interface InstallDatabaseProps {
    config: ProjectConfig
    packageManager: PackageManager
    projectPackagesDir: string
}

export async function installDatabase({
    config,
    packageManager,
    projectPackagesDir
}: InstallDatabaseProps) {
    const templateDBDir = path.join(PKG_ROOT, 'template/packages/db')
    const projectDBDir = path.join(projectPackagesDir, 'db')

    fs.ensureDirSync(projectDBDir)
    fs.ensureDirSync(path.join(projectDBDir, 'src'))

    if (config.databaseDriver === 'drizzle') {
        if (config.usingAuth) {
            fs.copyFileSync(
                path.join(templateDBDir, `drizzle/auth.${config.database}.ts`),
                path.join(projectDBDir, 'src/schema.ts')
            )
        } else {
            fs.copyFileSync(
                path.join(templateDBDir, `drizzle/base.${config.database}.ts`),
                path.join(projectDBDir, 'src/schema.ts')
            )
        }

        fs.copyFileSync(
            path.join(templateDBDir, `drizzle/index.${config.databaseDialect}.ts`),
            path.join(projectDBDir, 'src/index.ts')
        )
    } else if (config.databaseDriver === 'kysely') {
        if (config.usingAuth) {
            fs.copyFileSync(
                path.join(templateDBDir, `kysely/auth.schema.ts`),
                path.join(projectDBDir, 'src/schema.ts')
            )
        } else {
            fs.copyFileSync(
                path.join(templateDBDir, `kysely/base.schema.ts`),
                path.join(projectDBDir, 'src/schema.ts')
            )
        }

        fs.copyFileSync(
            path.join(templateDBDir, `kysely/index.${config.databaseDialect}.ts`),
            path.join(projectDBDir, 'src/index.ts')
        )
    } else if (config.databaseDriver === 'prisma') {
        fs.ensureDirSync(path.join(projectDBDir, 'prisma'))
        if (config.usingAuth) {
            fs.copyFileSync(
                path.join(templateDBDir, 'prisma/auth.prisma'),
                path.join(projectDBDir, 'prisma/schema.prisma')
            )
        } else {
            fs.copyFileSync(
                path.join(templateDBDir, 'prisma/base.prisma'),
                path.join(projectDBDir, 'prisma/schema.prisma')
            )
        }

        fs.copyFileSync(
            path.join(templateDBDir, 'prisma/index.ts'),
            path.join(projectDBDir, 'src/index.ts')
        )
    }
}
