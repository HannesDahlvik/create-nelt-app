#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings'
import { TITLE_TEXT } from './consts'
import { getPkgManager } from './utils'
import chalk from 'chalk'
import gradient from 'gradient-string'
import prompts from 'prompts'
import path from 'node:path'
import packageJson from '../package.json'
import { createApp } from './createApp'
import { promptDatabase } from './prompts'

let projectPath = ''

const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .action((name) => {
        projectPath = name
    })
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .option('--use-npm', 'Explicitly use npm during installation')
    .option('--use-pnpm', 'Explicitly use pnpm during installation')
    .allowUnknownOption()

async function main(): Promise<void> {
    console.log('\n' + gradient.retro.multiline(TITLE_TEXT))

    if (typeof projectPath === 'string') {
        projectPath = projectPath.trim()
    }

    if (!projectPath) {
        const res = await prompts({
            type: 'text',
            name: 'path',
            message: 'Project name',
            initial: 'my-nelt-app'
        })

        if (typeof res.path === 'string') {
            projectPath = res.path.trim()
        }
    }

    const options = program.opts()
    const resolvedProjectPath = path.resolve(projectPath)
    const packageManager = !!options.useNpm ? 'npm' : !!options.usePnpm ? 'pnpm' : getPkgManager()

    try {
        const promptDB = await promptDatabase()

        if (!promptDB) {
            throw 'test'
        }

        const { database, databaseDriver, databaseDialect } = promptDB

        console.log(database, databaseDriver, databaseDialect)
        console.log(options)

        await createApp({
            appPath: resolvedProjectPath,
            packageManager
        })
    } catch (error) {
        throw error
    }
}

main().catch((err) => {
    console.log()
    console.log('Aborting installation.')
    console.error(err)
    console.log()
    process.exit(1)
})