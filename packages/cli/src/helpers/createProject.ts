import path from 'node:path'
import chalk from 'chalk'
import ora from 'ora'
import { PackageManager } from '../utils'
import { Database, DatabaseDriver } from '../prompts'
import { addPackages } from './addPackages'
import { scaffoldProject } from './scaffoldProject'

export interface ProjectConfig {
    database: Database
    databaseDialect: string
    databaseDriver: DatabaseDriver
    usingAuth: boolean
    usingTailwind: boolean
}

interface CreateProjectProps {
    appPath: string
    packageManager: PackageManager
    config: ProjectConfig
}

export async function createProject({
    appPath,
    config,
    packageManager
}: CreateProjectProps): Promise<void> {
    const spinner = ora('Creating project...').start()
    const appName = path.basename(appPath)
    const root = path.resolve(appPath)

    await scaffoldProject({
        packageManager,
        projectDir: root,
        projectName: appName
    })

    await addPackages({
        appName,
        packageManager,
        projectDir: root,
        config
    })

    spinner.succeed(`Created project in ${chalk.green(`./${path.basename(root)}`)}`)
}
