import fs from 'fs-extra'
import path from 'node:path'

interface CreatePackageJsonProps {
    dest: string
    name: string
    other?: Record<string, string | Object | number>
    version?: string
}

export function createPackageJson({
    dest,
    name,
    other,
    version = '0.0.0'
}: CreatePackageJsonProps) {
    const file = path.join(dest, 'package.json')
    fs.writeJsonSync(
        file,
        {
            name,
            version,
            ...other
        },
        {
            spaces: 4
        }
    )
}
