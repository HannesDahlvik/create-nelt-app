import path from 'node:path'

import { ProjectConfig } from './createProject'
import { installDatabase } from '../installers/database'
import { installApi } from '../installers/api'
import { PackageManager } from '../utils'

interface AddPackagesProps {
    appName: string
    config: ProjectConfig
    packageManager: PackageManager
    projectDir: string
}

export async function addPackages({
    appName,
    config,
    packageManager,
    projectDir
}: AddPackagesProps) {
    const projectPackagesDir = path.join(projectDir, 'packages')

    await installApi({
        appName,
        databaseDriver: config.databaseDriver,
        packageManager,
        projectPackagesDir,
        usingAuth: config.usingAuth
    })

    await installDatabase({
        config,
        packageManager,
        projectPackagesDir
    })
}
