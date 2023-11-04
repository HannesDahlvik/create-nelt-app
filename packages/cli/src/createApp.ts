import { PackageManager } from './utils'
import chalk from 'chalk'
import fs from 'node:fs'
import path from 'node:path'

interface CreateAppProps {
    appPath: string
    packageManager: PackageManager
}

export async function createApp({ appPath, packageManager }: CreateAppProps): Promise<void> {
    const appName = path.basename(appPath)
    const root = path.resolve(appPath)

    /* fs.mkdirSync(appPath)

    console.log(packageManager)
    console.log(`Creating a new NELT app in ${chalk.green('./' + appName)}\n`)

    process.chdir(root) */
}
