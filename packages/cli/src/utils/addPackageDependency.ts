import { PackageManager } from './getPkgManager'
import { execa } from 'execa'

interface AddPackageDependencyProps {
    dependencies: string[]
    dev: boolean
    dir: string
    packageManager: PackageManager
}

export async function addPackageDependency({
    dependencies,
    dev,
    dir,
    packageManager
}: AddPackageDependencyProps) {
    const { stdout } = await execa(packageManager, ['install', ...dependencies, dev ? '-D' : ''], {
        cwd: dir
    })
    console.log(stdout)
}
