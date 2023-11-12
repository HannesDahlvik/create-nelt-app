import fs from 'fs-extra'
import { execa } from 'execa'
import path from 'node:path'
import sortPackageJson from 'sort-package-json'
import { PKG_ROOT } from '../consts'
import { PackageManager } from '../utils'

interface ScaffoldProjectProps {
    packageManager: PackageManager
    projectDir: string
    projectName: string
}

export async function scaffoldProject({
    packageManager,
    projectDir,
    projectName
}: ScaffoldProjectProps) {
    const baseTemplateDir = path.join(PKG_ROOT, 'template/base')

    if (fs.existsSync(projectDir)) {
        process.exit(1)
    }

    fs.copySync(baseTemplateDir, projectDir)
    fs.ensureDirSync(path.join(projectDir, 'packages'))
    fs.ensureDirSync(path.join(projectDir, 'apps'))
    fs.renameSync(path.join(projectDir, '_turbo.json'), path.join(projectDir, 'turbo.json'))
    if (packageManager === 'pnpm') {
        fs.writeFileSync(
            path.join(projectDir, 'pnpm-workspaces.yaml'),
            `packages:
        - 'apps/*'
        - 'packages/*'
    `
        )
    } else {
        const pkgJson = fs.readJsonSync(path.join(projectDir, 'package.json'))
        pkgJson.workspaces = ['apps/*', 'packages/*']
        const sortedPkgJson = sortPackageJson(pkgJson)
        fs.writeJsonSync(path.join(projectDir, 'package.json'), sortedPkgJson, {
            spaces: 4
        })
    }
    await execa(packageManager, ['install'], {
        cwd: projectDir
    })
}
