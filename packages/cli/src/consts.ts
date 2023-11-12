import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const TITLE_TEXT = ` _____             _          _____ _____ __  _____    _____         
|     |___ ___ ___| |_ ___   |   | |   __|  ||_   _|  |  _  |___ ___ 
|   --|  _| -_| .'|  _| -_|  | | | |   __|  |__| |    |     | . | . |
|_____|_| |___|__,|_| |___|  |_|___|_____|_____|_|    |__|__|  _|  _|
                                                           |_| |_|  
`

export const LUCIA_TABLES = {
    user: 'user',
    key: 'key',
    session: 'session'
}

const __filename = fileURLToPath(import.meta.url)
const distPath = path.dirname(__filename)
export const PKG_ROOT = path.join(distPath, '../')
